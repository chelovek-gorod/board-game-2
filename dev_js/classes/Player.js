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
        // one token available
        if (availableTokens.length === 1) {
            availableTokens[0].activation();
            return;
        }

        // first [0] index -> is activated
        const goodArray = []; 
        const normalArray = []; 
        const badArray = [];

        availableTokens.sort(() => Math.random() - 0.5);

        console.log('available tokens:', availableTokens.length)

        for (let i = 0; i < availableTokens.length; i++) {
            const token = availableTokens[i];
            const target = token.path[token.path.length - 1];

            
            console.log(i, 'current:',
                (token.container.length === 4) ? (token.container === token.home) ? 'home' : 'base' :
                (target.container.length === 3) ? 'toilet' : 'main', token.index,
                'target:', 
                (target.container.length === 4) ? (target.container === token.home) ? 'home' : 'base' :
                (target.container.length === 3) ? 'toilet' : 'main', target.index);

            // (4)
            // check entry in start ceil
            if (token.container === token.reserve
            // check go to corner
            || (target.container === game.board.ceils && target.container[target.index].type === 'corner')
            // check entry in home or move in home
            || (target.container === token.home)
            // go to port forward
            || (target.container === game.board.ceils && target.container[target.index].type === 'port'
            && target.container[target.index].targetIndex % 2 === 0 /* 1 - back; 0 - forward */)) {
                goodArray.push(token);
            } else
            // (0)
            // check entry in toilet
            if (game.board.toilets.includes(target.container) && target.index === 0) {
                badArray.push(token);
            } else
            // (1)
            // go to any start ceil
            if ((target.container === game.board.ceils && target.container[target.index].type === 'home')
            // go to port back
            || (target.container === game.board.ceils && target.container[target.index].type === 'port'
            && target.container[target.index].targetIndex % 2 === 1 /* 1 - back; 0 - forward */)
            // now on corner
            || (this.container === game.board.ceils && this.container[this.index].type === 'corner')) {
                badArray.unshift(token);
            } else
            // (2)
            // check ceil under toilet exit
            if (target.container === game.board.ceils && target.container[target.index].type === 'exit') {
                normalArray.push(token);
            }
            // (3)
            else {
                normalArray.unshift(token);
            }
        }

        if (goodArray.length) goodArray[0].activation();
        else if (normalArray.length) normalArray[0].activation();
        else badArray[0].activation();
    }

    diceFinished() {
        console.log('#######')
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