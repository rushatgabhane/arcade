import CONST from './CONST';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Ghost {
    static speed = 1;
    constructor({ position, velocity, color }) {
        this.position = position;
        this.velocity = velocity;
        this.speed = 1;
        this.radius = 20;
        this.size = 40;
        this.image = new Image();
        this.image.src = `./images/bill-${color}.png`;
        this.previousCollisions = [];
    }

    draw() {
        context.drawImage(this.image, this.position.x - 20, this.position.y - 20, this.size, this.size);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

export default Ghost;
