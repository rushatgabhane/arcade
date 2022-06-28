import CONST from './CONST';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class PowerUp {
    constructor({ position }) {
        this.position = position;
        this.radius = 16;
    }

    draw() {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);

        context.fillStyle = CONST.colors.ivory;
        context.fill();

        context.font = 'bold 22px Helvetica';
        context.fillStyle = CONST.colors.darkBlue;
        context.textAlign = 'center';
        context.fillText('E', this.position.x, this.position.y + 24 / 3);

        context.closePath();
    }
}

export default PowerUp;
