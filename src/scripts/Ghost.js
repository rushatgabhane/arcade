import CONST from './CONST';
import bill from '../../images/bill.png';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Ghost {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.size = 40;
        this.image = new Image();
        this.image.src = './images/bill.png';
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

export default Ghost;
