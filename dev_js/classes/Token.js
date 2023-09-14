import VIEW from '../render';
import { game } from "../main";
import Pointer from './Pointer';
import { SOUNDS } from '../assets';
import Timer from './Timer';
import constants from '../constants';

function playStepSound() {
    SOUNDS['step' + Math.floor(Math.random() * 7)].play();
}

class Token {
    constructor(player) { // tokenImage, startPoint, isBot
        this.player = player;
        this.image = player.tokenImage;
        this.maxSize = 128;
        this.minSize = 96;
        this.size = this.minSize;
        this.halfSize = this.size / 2;

        this.startPoint = player.startPoint;
        this.reserve = game.board.reserves[player.startPoint];
        this.home = game.board.homes[player.startPoint];
        this.container = this.reserve;
        this.index = this.player.tokens.length;

        this.x = this.container[this.index].x;
        this.y = this.container[this.index].y;

        this.stepDuration = constants.tokenStepDuration;
        this.halfStepDuration = this.stepDuration / 2;
        this.sizeRate = (this.maxSize - this.minSize) / this.halfStepDuration;
        this.stepTimeout = this.stepDuration;
        this.speed = 0;
        this.steps = 0;
        this.direction = 0;
        this.target = null; // {container: null, index: 0, x: 0, y: 0}
        this.path = []; // [{container: null, index: 0, x: 0, y: 0}]
        this.isGoHome = false;
        this.isBot = player.isBot;

        this.pointer = new Pointer(this.index, this.isBot);
        this.isAvailable = false; // token available to click (activate)
        this.isActive = false; // activated by player (not pushed other token)
    }

    checkCeilAllTokens(container, index) {
        const playersLength = game.players.length
        for (let i = 0; i < playersLength; i++) {
            const token = this.checkCeilPlayerTokens(container, index, game.players[i])
            if (token) return token;
        }
        return false;
    }

    checkCeilPlayerTokens(container, index, player = this.player) {
        const playerTokensLength = player.tokens.length;
        for (let i = 0; i < playerTokensLength; i++) {
            const token =  player.tokens[i];
            if (token.container === container
            && token.index === index
            && token !== this) {
                return token;
            }
        }
        return false;
    }

    getPath(points) {
        this.path = [];

        // check current container
        switch(this.container) {
            case this.reserve : this.checkPathFromReserve(points); break;
            case game.board.toiletTop :
            case game.board.toiletRight :
            case game.board.toiletBottom :
            case game.board.toiletLeft : this.checkPathInToilet(points); break;
            case this.home: this.checkPathInHome(points); break;
            default : this.checkPathInMainBoard(points); break;
        }

        // check for activation
        if (this.path.length) this.isAvailable = true;
        else this.isAvailable = false;
    }

    checkPathFromReserve(points) {
        if (points !== 6) return;
        // check friendly token in start point 
        if (!this.checkCeilPlayerTokens(game.board.ceils, this.reserve[0].targetIndex)) {
            this.isGoHome = false; // clear this, if token move to reserve from board
            this.addPathPoint(game.board.ceils, this.reserve[0].targetIndex);
        }
    }

    checkPathInToilet(points) {
        if (points === this.container[this.index].move) {
            // if it is last toilet point
            if ('targetIndex' in this.container[this.index]) {
                this.addPathPoint(game.board.ceils, this.container[this.index].targetIndex);
            } else {
                this.addPathPoint(this.container, this.index + 1);
            }
        }
    }

    checkPathInHome(points, index = this.index) {
        console.log(points, index)
        const maxSteps = (this.home.length - 1) - index; // 3 - 0 -> 3; 3 - 1 -> 2; 3 - 2 -> 1; 3 - 3 -> 0
        if (maxSteps <= 0 || points > maxSteps) return this.path = [];
        const startIndex = index + 1;
        const lastIndex = index + points;
        for (let i = startIndex; i <= lastIndex; i++) {
            if (this.checkCeilPlayerTokens(this.home, i)) return this.path = [];
            // else (not need after return)   
            this.addPathPoint(this.home, i);
        }
        console.log('path after inrty home',[...this.path]);
    }

    checkPathInMainBoard(points) {
        // check start at home inter if token must go home
        if (this.isGoHome
        && game.board.ceils[this.index].type === 'home'
        && game.board.ceils[this.index].targetIndex === this.startPoint) {
            if (this.checkCeilPlayerTokens(this.home, 0)) return this.path = [];
            // else (not need after return)
            this.addPathPoint(this.home, 0);
            this.checkPathInHome(points - 1, 0); // redirect checking
            return;
        }

        // check ceils in loop
        let isGoHome = this.isGoHome; // local "ready go to home" checker
        let index = this.index;
        while (points > 0) {
            index++; // set next point index in index variable
            if (index >= game.board.ceils.length) index = 0;

            const ceilType = this.container[index].type;

            // check corner ceil
            if (ceilType === 'corner'
            && this.checkCeilAllTokens(game.board.ceils, index)) return this.path = [];

            if (ceilType === 'home'
            && isGoHome
            && game.board.ceils[index].targetIndex=== this.startPoint) {
                if (this.checkCeilAllTokens(game.board.ceils, index)
                || this.checkCeilPlayerTokens(this.home, 0)) return this.path = [];
                // else (not need after return)
                this.addPathPoint(game.board.ceils, index); // go home ceil
                if (points > 1) {
                    this.addPathPoint(this.home, 0);
                    if (points > 2)this.checkPathInHome(points - 2, 0); // redirect checking
                }
                return;
            }
            
            // check ceil is free, if it is not last step or corner ceil
            if (points > 1) {
                if(this.checkCeilAllTokens(game.board.ceils, index)) return this.path = [];
                // else (not need after return)
                this.addPathPoint(game.board.ceils, index);
            // if it is last step and not corner ceil
            } else {
                // check friendly token in ceil
                if (this.checkCeilPlayerTokens(game.board.ceils, index)) return this.path = [];
                // else (not need after return)
                switch(ceilType) {
                    case 'port' :
                        // check port exit
                        const portIndex = game.board.ceils[index].targetIndex;
                        const portTargetIndex = game.board.ports[portIndex].targetIndex;
                        if (this.checkCeilPlayerTokens(game.board.ceils, portTargetIndex)) return this.path = [];
                        // else (not need after return)
                        this.addPathPoint(game.board.ceils, index);
                        this.addPathPoint(game.board.ports, portIndex);
                        this.addPathPoint(game.board.ceils, portTargetIndex);
                        break;

                    case 'toilet' :
                        const toiletIndex = game.board.ceils[index].targetIndex;
                        this.addPathPoint(game.board.ceils, index);
                        this.addPathPoint(game.board.toilets[toiletIndex], 0);
                        break;

                    default : this.addPathPoint(game.board.ceils, index);
                }
            }
            points--;
        }
    }

    addPathPoint(container, index) {
        this.path.push({
            container: container,
            index: index,
            x: container[index].x,
            y: container[index].y
        })
    }

    pushPathInToilet() { console.log('pushPathInToilet');
        this.path = [];
        // if it is last toilet point
        if ('targetIndex' in this.container[this.index]) {
            this.addPathPoint(game.board.ceils, this.container[this.index].targetIndex);
        } else {
            this.addPathPoint(this.container, this.index + 1);
        }
        this.startStep(); console.log({...this});
    }

    pushPathToReserve() { console.log('pushPathToReserve');
        this.path = [];
        const reserveLength = this.reserve.length;
        const reserve = new Array(reserveLength);
        this.player.tokens.forEach(token => {
            if (token.container === this.reserve) reserve[token.index] = true;
        });
        for (let i = 0; i < reserveLength; i++) {
            if (!reserve[i]) {
                this.addPathPoint(this.reserve, i);
                break;
            }
        }
        this.startStep(); console.log({...this});
    }

    activation() {
        if (!this.isAvailable) return;

        // remove pointers from all tokens
        this.player.tokens.forEach(token => token.isAvailable = false);
        
        this.isActive = true;

        this.startStep();
    }

    startStep() {
        // move token to up in layer
        this.player.layer.moveUp(this);

        this.target = this.path.shift();

        // check pushing in toilet on end of step, for moving all tokens together
        if (this.target.container === game.board.toiletTop
        || this.target.container === game.board.toiletRight
        || this.target.container === game.board.toiletBottom
        || this.target.container === game.board.toiletLeft) {
            const otherToken = this.checkCeilAllTokens(this.target.container, this.target.index);
            if (otherToken) otherToken.pushPathInToilet();
        }

        this.setDirection();
        const distance = this.getDistance();
        this.speed = distance / this.stepDuration;

        switch (this.container) {
            case this.reserve : SOUNDS.startToken.play(); break;
        }
    }

    setDirection() {
        this.direction = Math.atan2(this.target.y-this.y, this.target.x-this.x);
    }

    getDistance() {
        let dx = this.target.x - this.x; 
        let dy = this.target.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    move(pathSize) {
        this.x += Math.cos(this.direction) * pathSize;
        this.y += Math.sin(this.direction) * pathSize;
    }

    endStep() {
        this.size = this.minSize;
        this.halfSize = this.size / 2;
        this.stepTimeout = this.stepDuration;
        this.container = this.target.container;
        this.index = this.target.index;
        this.x = this.target.x;
        this.y = this.target.y;
        this.target = null;

        // check eating enemy
        if (this.container === game.board.ceils) {
            const otherToken = this.checkCeilAllTokens(game.board.ceils, this.index);
            if (otherToken) otherToken.pushPathToReserve();
        }

        playStepSound();

        if (this.path.length) this.startStep();
        else this.endMove();
    }

    endMove() {
        // checking ready go home
        if (!this.isGoHome) {
            // if not on main board or not in start main board ceil
            if (this.container !== game.board.ceils // false
            || this.index !== this.reserve[0].targetIndex) {
                this.isGoHome = true;
            }
        }
        
        // check is all tokens at home win
        if (this.container === this.home) {
            let allAtHome = true
            this.player.tokens.forEach( token => {
                if (token.container !== this.home) allAtHome = false;
            });
            if (allAtHome) game.isEnd = true;
        }

        // check corners win
        if (this.container === game.board.ceils
        && this.container[this.index].type === 'corner') {
            let allOnCorners = true;
            this.player.tokens.forEach( token => {
                if (token.container !== game.board.ceils
                || token.container[token.index].type !== 'corner') allOnCorners = false;
            });
            if (allOnCorners) game.isEnd = true;
        }

        /*
        // check pushing in toilet
        if (this.container === game.board.toiletTop
        || this.container === game.board.toiletRight
        || this.container === game.board.toiletBottom
        || this.container === game.board.toiletLeft) { console.log('pushing in toilet')
            const otherToken = this.checkCeilAllTokens(this.container, this.index);
            if (otherToken) otherToken.pushPathInToilet();
        }
        */

        if (this.isActive) {
            this.isActive = false;
            new Timer(() => this.player.diceFinished(), 1000);
        }
    }

    update(dt) {
        if (this.isAvailable) this.pointer.draw({x:this.x, y:this.y}, dt);

        if (this.target) {
            this.stepTimeout -= dt;

            if (this.stepTimeout > this.halfStepDuration) this.size += this.sizeRate * dt;
            else this.size -= this.sizeRate * dt;
            this.halfSize = this.size / 2;

            if (this.stepTimeout > 0) this.move(dt * this.speed);
            else this.endStep();
        }

        VIEW.context.drawImage(this.image, this.x - this.halfSize, this.y - this.halfSize, this.size, this.size);
    }
}

export default Token;