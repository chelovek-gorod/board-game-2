import { SOUNDS, SPRITES } from "../assets";
import constants from "../constants";
import { game } from "../main";
import VIEW from "../render";
import { playSound } from "../sound";
import Timer from "./Timer";
import Token from "./Token";

class Player {
    constructor(tokenImage, startPoint, isBot) {
        this.getPointerPosition(startPoint);
        this.image = (startPoint % 2 === 0) ? SPRITES.pointerPlayerH : SPRITES.pointerPlayerV;
        this.tokenImage = tokenImage;
        this.frameWidth = (startPoint % 2 === 0) ? 480 : 120;
        this.frameHeight = (startPoint % 2 === 0) ? 120 : 480;
        this.frame = 0;
        this.fps = 30;
        this.frameDuration = Math.floor(1000 / this.fps);
        this.frameTimeout = this.frameDuration;
        this.frames = this.getFrames();

        this.dices = [];
        this.dice = null;
        this.isGetDouble = false;
        this.startPoint = startPoint;
        this.tokens = [];

        this.isBot = isBot;

        this.layer = VIEW.getLayer('players');

        this.generateTokens();
    }

    getPointerPosition(startPoint) {
        if (startPoint % 2 === 0) {
            this.x = constants.boardOffset + constants.ceilSize * 5.5;
            if (startPoint === 0) this.y = constants.boardOffset;
            else this.y = constants.boardOffset + constants.ceilSize * 14;
        } else {
            this.y = constants.boardOffset + constants.ceilSize * 5.5;
            if (startPoint === 3) this.x = constants.boardOffset;
            else this.x = constants.boardOffset + constants.ceilSize * 14;
        }
    }

    getFrames() {
        const frames = [];
        for(let y = 0; y < this.image.height; y += this.frameHeight) {
            for(let x = 0; x < this.image.width; x += this.frameWidth) {
                frames.push({x, y});
            }
        }
        return frames;
    }

    generateTokens() {
        const tokensLayer = VIEW.getLayer('tokens');
        for(let i = 0; i < 4; i++) {
            const token = new Token(this);
            this.tokens.push(token);
            tokensLayer.add(token);
        }
    }

    startTurn() {
        this.layer.add(this);
        this.throwDices();
    }

    throwDices() {
        playSound(SOUNDS.dice2);
        game.dices.forEach(dice => dice.throw());
        this.isGetDouble = game.dices[0].value === game.dices[1].value;
        if (game.dices[0].value >= game.dices[1].value) this.dices = [1, 0];
        else this.dices = [0, 1];

        //setTimeout();
        new Timer(() => this.useDice(), constants.diceThrowDuration);
    }

    useDice() {
        this.dice = game.dices[ this.dices.pop() ];
        this.dice.isActive = true;

        const availableTokens = [];
        /*
        1) проверить каждый токен, способен ли он использовать данный дайс
          - если да - пометить токен зеленым маркером
        */
        this.tokens.forEach(token => {
            token.getPath(this.dice.value);
            if (token.isAvailable) availableTokens.push(token);
        });

        if (!availableTokens.length) {
            new Timer(() => this.diceFinished(), constants.diceActiveDuration);
        } else if (this.isBot) new Timer(() => this.botActivation(availableTokens), constants.diceActiveDuration);
    }

    botActivation(availableTokens) {
        const availableTokensLength = availableTokens.length;
        if (availableTokensLength === 1) availableTokens[0].activation();
        else {
            availableTokens.sort(() => Math.random() - 0.5);
            const priorityArray = [];
            const normalArray = [];
            const badArray = [];
            for (let i = 0; i < availableTokensLength; i++) {
                const token = availableTokens.pop();
                const tokenLastStep = token.path[token.path.length - 1];

                // if reserve or home or toilet
                if (tokenLastStep.container === token.reserve) priorityArray.push(token);
                else if (tokenLastStep.container === token.home) priorityArray.push(token);
                else if (tokenLastStep.container !== game.board.ceils) normalArray.push(token);
                // if on main board -> check ceil type
                else {
                    switch (game.board.ceils[tokenLastStep.index].type) {
                        case 'corner' : priorityArray.push(token); break;
                        case 'toilet' : badArray.push(token); break;
                        case 'exit' : normalArray.push(token); break;
                        case 'empty': normalArray.push(token); break;
                        case 'home': badArray.push(token); break;
                        default: /* port */
                        const portTargetIndex = game.board.ceils[tokenLastStep.index].targetIndex;
                        if(portTargetIndex > token.index && token.index < 44) priorityArray.push(token);
                        else badArray.push(token); break;
                    }
                }
            }
            if (priorityArray.length) priorityArray[0].activation();
            else if (normalArray.length) normalArray[0].activation();
            else badArray[0].activation();
        }
    }

    diceFinished() {
        this.dice.isActive = false;
        this.dice.pointer.setMinSize();
        if (this.dices.length && !game.isEnd) this.useDice();
        else if (this.isGetDouble && !game.isEnd) this.throwDices();
        else this.endTurn();
    }

    endTurn() { /*console.log('end turn');*/
        this.layer.remove(this);
        game.nextTurn();
    }

    update(dt) {
        this.frameTimeout -= dt;
        if (this.frameTimeout <= 0) {
            this.frameTimeout += this.frameDuration;
            this.frame++;
            if (this.frame === this.frames.length) this.frame = 0;
        }
        VIEW.context.drawImage(
            this.image,
            this.frames[this.frame].x, this.frames[this.frame].y, this.frameWidth, this.frameHeight,
            this.x, this.y, this.frameWidth, this.frameHeight
        );
    }
}

export default Player;