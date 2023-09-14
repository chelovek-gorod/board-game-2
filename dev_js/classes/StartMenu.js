import { SPRITES } from "../assets";
import constants from "../constants";
import { game } from "../main";
import VIEW from "../render";
import Text from "./Text";

class StartMenu {
    constructor(startGameCallback, state) {
        this.startGameCallback = startGameCallback;
        this.state = state || {
            players: [
                /* if (tokenIndex >= tokens.length) random */
                { isUsed: true,  isBot: false, tokenIndex: 2},
                { isUsed: true,  isBot: true,  tokenIndex: 11},
                { isUsed: true,  isBot: true,  tokenIndex: 1},
                { isUsed: false, isBot: true,  tokenIndex: 0}
            ],
        
            music: true,
            effects: true,
        };
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
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.labelText.draw(this.context)

        this.context.drawImage( SPRITES.pointerPlayerH, 0, 0, 480, 120, this.underlay1.x, this.underlay1.y, this.underlay.width, this.underlay.height);
        this.context.drawImage( SPRITES.pointerPlayerH, 0, 0, 480, 120, this.underlay2.x, this.underlay2.y, this.underlay.width, this.underlay.height);
        this.context.drawImage( SPRITES.pointerPlayerH, 0, 0, 480, 120, this.underlay3.x, this.underlay3.y, this.underlay.width, this.underlay.height);
        this.context.drawImage( SPRITES.pointerPlayerH, 0, 0, 480, 120, this.underlay4.x, this.underlay4.y, this.underlay.width, this.underlay.height);
        
        this.context.drawImage( this.getPlayerImage(0),   this.btnP1User.x,  this.btnP1User.y,  this.button.width,   this.button.height);
        this.context.drawImage( this.getTokenImage(0),    this.btnP1Token.x, this.btnP1Token.y, this.button.width,   this.button.height);

        this.context.drawImage( this.getPlayerImage(1), this.btnP2User.x,  this.btnP2User.y,  this.button.width,   this.button.height);
        this.context.drawImage( this.getTokenImage(1),     this.btnP2Token.x, this.btnP2Token.y, this.button.width,   this.button.height);

        this.context.drawImage( this.getPlayerImage(2), this.btnP3User.x,  this.btnP3User.y,  this.button.width,   this.button.height);
        this.context.drawImage( this.getTokenImage(2),  this.btnP3Token.x, this.btnP3Token.y, this.button.width,   this.button.height);

        this.context.drawImage( this.getPlayerImage(3),   this.btnP4User.x,  this.btnP4User.y,  this.button.width,   this.button.height);
        this.context.drawImage( this.getTokenImage(3),   this.btnP4Token.x, this.btnP4Token.y, this.button.width,   this.button.height);

        this.context.drawImage( (this.state.music) ? SPRITES.menuMusicOn : SPRITES.menuMusicOff,  this.btnMusic.x,   this.btnMusic.y,   this.button.width,   this.button.height);
        this.context.drawImage( SPRITES.menuButton,   this.btnStart.x,   this.btnStart.y,   this.underlay.width, this.underlay.height);
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
        if (this.checkClickButton(x, y, this.btnStart)) this.startGame();

        // music
        if (this.checkClickButton(x, y, this.btnMusic)) {
            this.state.music = !this.state.music;
            this.render();
        }

        // effects
        if (this.checkClickButton(x, y, this.btnEffects)) {
            this.state.effects = !this.state.effects;
            this.render();
        }

        // player 1 { isUsed: true,  isBot: false, tokenIndex: 2}
        if (this.checkClickButton(x, y, this.btnP1User)) {
            if(this.state.players[0].isUsed) {
                if(this.state.players[0].isBot) {
                    this.state.players[0].isUsed = false;
                    this.state.players[0].isBot = false;
                } else {
                    this.state.players[0].isBot = true;
                }
            } else {
                this.state.players[0].isUsed = true;
            }
            this.render();
        }

        if (this.checkClickButton(x, y, this.btnP1Token)) {
            this.state.players[0].tokenIndex++;
            if (this.state.players[0].tokenIndex > game.tokens.length) {
                this.state.players[0].tokenIndex = 0;
            }
            this.render();
        }

        // player 2 { isUsed: true,  isBot: false, tokenIndex: 2}
        if (this.checkClickButton(x, y, this.btnP2User)) {
            if(this.state.players[1].isUsed) {
                if(this.state.players[1].isBot) {
                    this.state.players[1].isUsed = false;
                    this.state.players[1].isBot = false;
                } else {
                    this.state.players[1].isBot = true;
                }
            } else {
                this.state.players[1].isUsed = true;
            }
            this.render();
        }

        if (this.checkClickButton(x, y, this.btnP2Token)) {
            this.state.players[1].tokenIndex++;
            if (this.state.players[1].tokenIndex > game.tokens.length) {
                this.state.players[1].tokenIndex = 0;
            }
            this.render();
        }

        // player 3 { isUsed: true,  isBot: false, tokenIndex: 2}
        if (this.checkClickButton(x, y, this.btnP3User)) {
            if(this.state.players[2].isUsed) {
                if(this.state.players[2].isBot) {
                    this.state.players[2].isUsed = false;
                    this.state.players[2].isBot = false;
                } else {
                    this.state.players[2].isBot = true;
                }
            } else {
                this.state.players[2].isUsed = true;
            }
            this.render();
        }

        if (this.checkClickButton(x, y, this.btnP3Token)) {
            this.state.players[2].tokenIndex++;
            if (this.state.players[2].tokenIndex > game.tokens.length) {
                this.state.players[2].tokenIndex = 0;
            }
            this.render();
        }

        // player 4 { isUsed: true,  isBot: false, tokenIndex: 2}
        if (this.checkClickButton(x, y, this.btnP4User)) {
            if(this.state.players[3].isUsed) {
                if(this.state.players[3].isBot) {
                    this.state.players[3].isUsed = false;
                    this.state.players[3].isBot = false;
                } else {
                    this.state.players[3].isBot = true;
                }
            } else {
                this.state.players[3].isUsed = true;
            }
            this.render();
        }

        if (this.checkClickButton(x, y, this.btnP4Token)) {
            this.state.players[3].tokenIndex++;
            if (this.state.players[3].tokenIndex > game.tokens.length) {
                this.state.players[3].tokenIndex = 0;
            }
            this.render();
        }

    }

    startGame() {
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