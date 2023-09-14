import { SPRITES } from "../assets";
import constants from "../constants";
import VIEW from "../render";

class Pointer {
    constructor (index, isBot) {
        this.image = isBot ? SPRITES.tokenPointerBot : SPRITES.tokenPointerHuman;
        this.scaleDuration = constants.tokenPointerScaleDuration;
        this.maxSize = 148;
        this.minSize = 120;
        this.size = this.minSize + ((this.maxSize - this.minSize) / 4) * index;
        this.halfSize = this.size / 2;
        
        this.scaleRate = (this.maxSize - this.minSize) / this.scaleDuration;
        this.direction = 0;
        this.isScaleUp = true;
    }

    draw(point, dt) {
        if (this.isScaleUp) {
            this.size += this.scaleRate * dt;
            if (this.size >= this.maxSize) {
                this.isScaleUp = false;
                this.size = this.maxSize
            }
        } else  {
            this.size -= this.scaleRate * dt;
            if (this.size <= this.minSize) {
                this.isScaleUp = true;
                this.size = this.minSize
            }
        }
        this.halfSize = this.size / 2;

        VIEW.context.drawImage(this.image, point.x-this.halfSize, point.y-this.halfSize, this.size, this.size);
    }
}

export default Pointer;