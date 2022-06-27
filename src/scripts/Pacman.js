import CONST from './CONST';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Pacman {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 20;
    }

    draw() {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);

        context.fillStyle = CONST.colors.yellow;
        context.fill();

        context.font = 'bold 24px Helvetica';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('E', this.position.x, this.position.y + 24 / 3);

        context.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        if (this.velocity.y != 0) {
            console.log(this.velocity);
            console.log(this.position.y);
        }
        this.position.y += this.velocity.y;
    }
}

export default Pacman;
