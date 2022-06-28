import CONST from './CONST';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Pellet {
    constructor({ position, velocity }) {
        this.position = position;
        this.radius = 4;
    }

    draw() {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);

        context.fillStyle = CONST.colors.ivory;
        context.fill();

        context.closePath();
    }
}

export default Pellet;
