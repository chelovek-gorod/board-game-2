import constants from "../constants";
import { game } from "../main";

class View {

    static instance;

    constructor() {
        if (View.instance) return View.instance;

        this.canvas = document.getElementById('canvas');
        this.width = this.canvas.width = constants.ceilSize * 15 + constants.boardOffset * 2;
        this.height = this.canvas.height = constants.ceilSize * 15 + constants.boardOffset * 2;
        this.sizeRate = 1;
        this.x = Math.round(this.width / 2);
        this.y = Math.round(this.height / 2);
        this.context = this.canvas.getContext('2d');
        this.layers = [];
        
        View.instance = this;

        this.resize();
    }

    resize() {
        const size = (innerWidth > innerHeight) ? innerHeight : innerWidth;
        this.sizeRate = this.width / size;
    }
    
    getLayer(name) {
        return this.layers.find(layer => layer.name === name);
    }
}

export default View;