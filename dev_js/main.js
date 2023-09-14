import { loader } from './loader';
import { SPRITES } from './assets';
import Board from './classes/Board';
import Dice from './classes/Dice';
import Layer from './classes/Layer';
import Player from './classes/Player';
import VIEW from './render';
import constants from './constants';
import Timer from './classes/Timer';
import StartMenu from './classes/StartMenu';

loader(initGame);

// canvas layers
const timersLayer = new Layer('timers', 0);
const boardLayer = new Layer('board', 1);
const dicesLayer = new Layer('dices', 2);
const playersLayer = new Layer('players', 3);
const tokensLayer = new Layer('tokens', 4);
const menuLayer = new Layer('menu', 5);

export const game = { 
    tokens : [],
    menu: null,
    isStart: false,
    players: [],
    currentTurn: 0,
    board: null,
    dices: [],
    isEnd: false,

    nextTurn() {
        if (this.isEnd) return this.end();

        this.currentTurn++
        if (this.currentTurn === this.players.length) this.currentTurn = 0;

        this.players[this.currentTurn].startTurn();
    },

    end() {
        document.querySelector('second').innerHTML = `PLAYER ${this.currentTurn} WIN!`;
    }
};

function initGame() {
    game.tokens = [
        SPRITES.tokenBomb, SPRITES.tokenButton, SPRITES.tokenCap, SPRITES.tokenCoin, SPRITES.tokenCrystal,
        SPRITES.tokenDragon, SPRITES.tokenEye, SPRITES.tokenHelmet, SPRITES.tokenMask, SPRITES.tokenMolecule,
        SPRITES.tokenMoon, SPRITES.tokenNut, SPRITES.tokenPlane, SPRITES.tokenShark, SPRITES.tokenShield,
        SPRITES.tokenSkull, SPRITES.tokenStone, SPRITES.tokenToy, SPRITES.tokenUfo, SPRITES.tokenWheel,
    ],
    game.menu = new StartMenu(startGame);
    menuLayer.add(game.menu);
}

function startGame(options) {
    game.isStart = true;

    game.board = new Board();
    boardLayer.add(game.board);

    game.dices.push( new Dice(VIEW.x - 63, VIEW.y - 63) );
    game.dices.push( new Dice(VIEW.x + 63, VIEW.y + 63) );
    game.dices.forEach(dice => dicesLayer.add(dice));

    for (let i = 0; i < options.players.length; i++) {
        if(options.players[i].isUsed) {
            let tokenIndex = options.players[i].tokenIndex;
            if (tokenIndex >= game.tokens.length) tokenIndex = Math.floor(Math.random() * game.tokens.length)
            const startPoint = (i + 2) % options.players.length;
            game.players.push( new Player(game.tokens[tokenIndex], startPoint, options.players[i].isBot) );
        }
    }

    game.currentTurn = Math.floor(Math.random() * game.players.length);

    new Timer(() => game.nextTurn(), constants.gameStartDuration);
}

VIEW.canvas.onclick = function(event) {
    const cx = event.offsetX * VIEW.sizeRate;
    const cy = event.offsetY * VIEW.sizeRate;
    if (game.isStart) gameClick(cx, cy);
    else if (game.menu) game.menu.click(cx, cy);
}

function gameClick(x, y) {
    if (game.players[game.currentTurn].isBot) return;

    const availableTokens = [];
    let allAvailableTokensInReserve = true;
    game.players[game.currentTurn].tokens.forEach(token => {
        if(token.isAvailable) {
            availableTokens.push(token);
            if(token.container !== token.reserve) {
                allAvailableTokensInReserve = false;
            }
        }
    });

    if (availableTokens.length === 0) return;

    if (availableTokens.length === 1) {
        availableTokens[0].activation();
        return;
    }

    for(let i = 0; i < availableTokens.length; i++) {
        const dx = x - availableTokens[i].x;
        const dy = y - availableTokens[i].y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < constants.ceilSize / 2) {
            return availableTokens[i].activation();
        }
    }

    if (allAvailableTokensInReserve) {
        availableTokens[0].activation();
        return;
    }
}