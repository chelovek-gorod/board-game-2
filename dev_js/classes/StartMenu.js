import { SOUNDS, SPRITES } from "../assets";
import constants from "../constants";
import { game } from "../main";
import VIEW from "../render";
import { playSound, setSoundState } from "../sound";
import Text from "./Text";

class StartMenu {
    constructor(startGameCallback, state) {
        this.startGameCallback = startGameCallback;
        this.state = state || {
            players: [
                /* if (tokenIndex === Infinity) random */
                { isUsed: true,  isBot: false, tokenIndex: 2},
                { isUsed: true,  isBot: true,  tokenIndex: 11},
                { isUsed: true,  isBot: true,  tokenIndex: 1},
                { isUsed: false, isBot: true,  tokenIndex: Infinity}
            ],

            tokens: game.tokens.map((img, index) => index),
        
            music: true,
            effects: true,

            start: true,
        };
        this.state.players.forEach(player => {
            this.state.tokens = this.state.tokens.filter(token => player.tokenIndex !== token);
        });

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = VIEW.width;
        this.canvas.height = VIEW.height;

        /* 1800 x 1800 */
        this.underlay  = {width: 720, height: 180};
        this.button    = {width: 180, height: 180};

        this.underlay1 = {x: 120,          y: VIEW.y - 270};
        this.underlay2 = {x: VIEW.x + 60, y: VIEW.y - 270};
        this.underlay3 = {x: 120,          y: VIEW.y + 90};
        this.underlay4 = {x: VIEW.x + 60, y: VIEW.y + 90};

        this.btnP1User = {x: this.underlay1.x + 90,  y: this.underlay1.y, width: this.button.width, height: this.button.height};
        this.btnP1Token= {x: this.underlay1.x + 450, y: this.underlay1.y, width: this.button.width, height: this.button.height};
        
        this.btnP2User = {x: this.underlay2.x + 90,  y: this.underlay2.y, width: this.button.width, height: this.button.height};
        this.btnP2Token= {x: this.underlay2.x + 450, y: this.underlay2.y, width: this.button.width, height: this.button.height};

        this.btnP3User = {x: this.underlay3.x + 90,  y: this.underlay3.y, width: this.button.width, height: this.button.height};
        this.btnP3Token= {x: this.underlay3.x + 450, y: this.underlay3.y, width: this.button.width, height: this.button.height};
        
        this.btnP4User = {x: this.underlay4.x + 90,  y: this.underlay4.y, width: this.button.width, height: this.button.height};
        this.btnP4Token= {x: this.underlay4.x + 450, y: this.underlay4.y, width: this.button.width, height: this.button.height};

        this.btnMusic  = {x: this.underlay3.x + 90,  y: this.underlay3.y + 360, width: this.button.width, height: this.button.height};
        this.btnEffects= {x: this.underlay4.x + 450, y: this.underlay4.y + 360, width: this.button.width, height: this.button.height};
        this.btnStart  = {x: VIEW.x - 360,           y: this.underlay4.y + 360, width: this.underlay.width, height: this.underlay.height};

        this.playerTextStyle = {
            size: 60,
            family: 'clip',
            weight: '600',
            color: '#ffffff',
            align: 'center'
        };

        this.playerLabels = [
            new Text('', this.underlay1.x + 360, this.underlay1.y + 200, this.playerTextStyle),
            new Text('', this.underlay2.x + 360, this.underlay2.y + 200, this.playerTextStyle),
            new Text('', this.underlay3.x + 360, this.underlay3.y + 200, this.playerTextStyle),
            new Text('', this.underlay4.x + 360, this.underlay4.y + 200, this.playerTextStyle),
        ];

        this.buttonText = new Text(
            'START', this.btnStart.x + 360, this.btnStart.y + 10, {
                size: 140,
                family: 'clip',
                weight: '600',
                color: '#ff00bc',
                align: 'center'
            }
        );

        this.labelText = new Text(
            'PARCHIS', VIEW.x, VIEW.y - 960, {
                size: 540,
                family: 'clip',
                weight: '600',
                color: '#00f66c',
                align: 'center'
            }
        );

        this.versionText = new Text(`VERSION: ${constants.version}`, 160, this.canvas.height - 70, {
            size: 68,
            family: 'clip',
            weight: '600',
            color: '#ffffff',
            align: 'left'
        });

        this.render();
    }

    updatePlayerLabels() {
        function getText(isUsed, isBot, text) {

            return `${(isUsed) ? (isBot) ? 'computer' : 'player' : 'no one'} ${text}`;
        }

        this.state.players.forEach((player, index) => {
            switch(index) {
                case 0 : this.playerLabels[index].render(getText(player.isUsed, player.isBot, 'on bottom side')); break;
                case 1 : this.playerLabels[index].render(getText(player.isUsed, player.isBot, 'on left side')); break;
                case 2 : this.playerLabels[index].render(getText(player.isUsed, player.isBot, 'on top side')); break;
                case 3 : this.playerLabels[index].render(getText(player.isUsed, player.isBot, 'on right side')); break;
            }
            this.playerLabels[index].draw(this.context);
        });
    }

    getPlayerImage(index) {
        if (!this.state.players[index].isUsed) return SPRITES.menuNoUser;
        else return (this.state.players[index].isBot) ? SPRITES.menuComputer : SPRITES.menuPlayer;
    }

    getTokenImage(index) {
        if (!this.state.players[index].isUsed
        || this.state.players[index].tokenIndex >= game.tokens.length) return SPRITES.menuRandom;

        const tokenIndex = this.state.players[index].tokenIndex;
        return game.tokens[tokenIndex];
    }

    render() {
        this.updateStateStart();

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.labelText.draw(this.context)

        this.context.drawImage( SPRITES.pointerPlayerH, 0, 0, 480, 120, this.underlay1.x, this.underlay1.y, this.underlay.width, this.underlay.height);
        this.context.drawImage( SPRITES.pointerPlayerH, 0, 0, 480, 120, this.underlay2.x, this.underlay2.y, this.underlay.width, this.underlay.height);
        this.context.drawImage( SPRITES.pointerPlayerH, 0, 0, 480, 120, this.underlay3.x, this.underlay3.y, this.underlay.width, this.underlay.height);
        this.context.drawImage( SPRITES.pointerPlayerH, 0, 0, 480, 120, this.underlay4.x, this.underlay4.y, this.underlay.width, this.underlay.height);
        
        this.updatePlayerLabels();

        this.context.drawImage( this.getPlayerImage(0),   this.btnP1User.x,  this.btnP1User.y,  this.button.width,   this.button.height);
        this.context.drawImage( this.getTokenImage(0),    this.btnP1Token.x, this.btnP1Token.y, this.button.width,   this.button.height);

        this.context.drawImage( this.getPlayerImage(1), this.btnP2User.x,  this.btnP2User.y,  this.button.width,   this.button.height);
        this.context.drawImage( this.getTokenImage(1),     this.btnP2Token.x, this.btnP2Token.y, this.button.width,   this.button.height);

        this.context.drawImage( this.getPlayerImage(2), this.btnP3User.x,  this.btnP3User.y,  this.button.width,   this.button.height);
        this.context.drawImage( this.getTokenImage(2),  this.btnP3Token.x, this.btnP3Token.y, this.button.width,   this.button.height);

        this.context.drawImage( this.getPlayerImage(3),   this.btnP4User.x,  this.btnP4User.y,  this.button.width,   this.button.height);
        this.context.drawImage( this.getTokenImage(3),   this.btnP4Token.x, this.btnP4Token.y, this.button.width,   this.button.height);

        this.context.drawImage( (this.state.music) ? SPRITES.menuMusicOn : SPRITES.menuMusicOff,  this.btnMusic.x,   this.btnMusic.y,   this.button.width,   this.button.height);
        this.context.drawImage( (this.state.start) ? SPRITES.menuButton : SPRITES.menuButtonLock, this.btnStart.x,   this.btnStart.y,   this.underlay.width, this.underlay.height);
        this.context.drawImage( (this.state.effects) ? SPRITES.menuEffectsOn : SPRITES.menuEffectsOff, this.btnEffects.x, this.btnEffects.y, this.button.width,   this.button.height);

        this.buttonText.draw(this.context);

        this.context.drawImage(
            SPRITES.menuLogo,
            VIEW.x + 240,
            this.canvas.height - 160
        );

        this.versionText.draw(this.context)
    }

    checkClickButton(clickX, clickY, button) {
        if (clickX > button.x
        && clickX < button.x + button.width
        && clickY > button.y
        && clickY < button.y + button.height) return true;
        return false;
    }

    click(x, y) {
        // start game
        if (this.checkClickButton(x, y, this.btnStart)
        && this.state.start) this.startGame();

        // music
        if (this.checkClickButton(x, y, this.btnMusic)) {
            this.state.music = !this.state.music;
            setSoundState(this.state);
            playSound(SOUNDS.menuMusic);
            this.render();
        }

        // effects
        if (this.checkClickButton(x, y, this.btnEffects)) {
            this.state.effects = !this.state.effects;
            setSoundState(this.state);
            playSound(SOUNDS.menuEffects);
            this.render();
        }

        if (this.checkClickButton(x, y, this.btnP1User)) this.clickPlayer(0);
        if (this.checkClickButton(x, y, this.btnP1Token)) this.clickToken(0);

        if (this.checkClickButton(x, y, this.btnP2User)) this.clickPlayer(1);
        if (this.checkClickButton(x, y, this.btnP2Token)) this.clickToken(1);

        if (this.checkClickButton(x, y, this.btnP3User)) this.clickPlayer(2);
        if (this.checkClickButton(x, y, this.btnP3Token)) this.clickToken(2);
        
        if (this.checkClickButton(x, y, this.btnP4User)) this.clickPlayer(3);
        if (this.checkClickButton(x, y, this.btnP4Token)) this.clickToken(3);
    }

    updateStateStart() {
        let players = 0;
        this.state.players.forEach(player => {
            if (player.isUsed) players++;
        });
        this.state.start = players > 1;
    }

    clickPlayer(index) {
        playSound(SOUNDS.menuClick);

        if(this.state.players[index].isUsed) {
            if(this.state.players[index].isBot) {
                this.state.players[index].isUsed = false;
                this.state.players[index].isBot = false;
                if (isFinite(this.state.players[index].tokenIndex)) {
                    this.state.tokens.push(this.state.players[index].tokenIndex);
                    this.state.players[index].tokenIndex = Infinity;
                }
            } else {
                this.state.players[index].isBot = true;
            }
        } else {
            this.state.players[index].isUsed = true;
        }
        this.render();
    }

    clickToken(index) {
        playSound(SOUNDS.menuToken);

        if (!this.state.players[index].isUsed) {
            this.state.players[index].isUsed = true;
            return this.render();
        }
        if (isFinite(this.state.players[index].tokenIndex)) {
            this.state.tokens.push(this.state.players[index].tokenIndex);
        }
        this.state.players[index].tokenIndex = this.state.tokens.shift();
        this.render();
    }

    startGame() {
        playSound(SOUNDS.menuStart);
        this.state.players.forEach(player=> {
            if(!isFinite(player.tokenIndex)) {
                this.state.tokens.sort(() => Math.random() - 0.5);
                player.tokenIndex = this.state.tokens.pop();
            }
        });
        VIEW.canvas.style.opacity = 0;
        setTimeout(() => {
            VIEW.getLayer('menu').clear();
            this.startGameCallback(this.state);
            setTimeout(() => VIEW.canvas.style.opacity = 1, 500);
        }, 1000);
    }

    update() {
        VIEW.context.drawImage(this.canvas, 0, 0);
    }
}

export default StartMenu;