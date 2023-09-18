import { SOUNDS, SPRITES } from "../assets";
import VIEW from "../render";
import { playSound } from "../sound";
import Text from "./Text";

class EndMenu {
    constructor(endGameCallback, data) {
        this.endGameCallback = endGameCallback;
        
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = VIEW.width;
        this.canvas.height = VIEW.height;

        /* 1800 x 1800 */
        this.button = {x: VIEW.x - 360, y: VIEW.y + 180, width: 720, height: 180};

        this.TextStyle = {
            size: 120,
            family: 'clip',
            weight: '600',
            color: '#000000',
            align: 'center'
        };

        const text = (data.isBot) ? 'COMPUTER WIN!': 'PLAYER WIN!';

        this.context.drawImage(SPRITES.pointerPlayerH, 0, 0, 480, 120, VIEW.x - 360, VIEW.y - 360, 720, 180);
        this.playerLabel = new Text(text, VIEW.x, VIEW.x - 340, this.TextStyle);
        this.playerLabel.draw(this.context);

        this.context.drawImage(data.image, VIEW.x - 90, VIEW.y - 90, 180, 180);

        this.context.drawImage(SPRITES.menuButton, this.button.x, this.button.y, this.button.width, this.button.height);
        this.buttonText = new Text(
            'CONTINUE', this.button.x + 360, this.button.y + 10, {
                size: 140,
                family: 'clip',
                weight: '600',
                color: '#ff00bc',
                align: 'center'
            }
        );
        this.buttonText.draw(this.context);

        playSound((data.isBo) ? SOUNDS.lose : SOUNDS.win);
    }

    click(x, y) {
        if (x > this.button.x
        && x < this.button.x + this.button.width
        && y > this.button.y
        && y < this.button.y + this.button.height) {
            playSound(SOUNDS.menuClick);
            VIEW.canvas.style.opacity = 0;
            setTimeout(() => {
                this.endGameCallback();
                VIEW.canvas.style.opacity = 1;
            }, 1000);
        }
    }

    update() {
        VIEW.context.drawImage(this.canvas, 0, 0);
    }
}

export default EndMenu;