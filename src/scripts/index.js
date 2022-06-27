import css from '../index.css';
import CONST from './CONST';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Boundary {
    constructor({position}) {
        this.position = position;
        this.width = 40;
        this.height = 40;
    }

    draw() {
        context.fillStyle = CONST.colors.darkBlue;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}