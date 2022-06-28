import CONST from './CONST';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Pacman {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 20;
        this.speed = 2;
        this.radians = 0.75;
        this.openRate = 0.05;
        this.rotation = 0;
    }

    draw() {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation);
        context.translate(-this.position.x, -this.position.y);

        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians);
        context.lineTo(this.position.x, this.position.y);
        context.fillStyle = CONST.colors.yellow;
        context.fill();

        context.closePath();
        context.restore();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.radians < 0 || this.radians > 0.75) {
            this.openRate = -this.openRate;
        }
        this.radians += this.openRate;
    }
}

export default Pacman;
