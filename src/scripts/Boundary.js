import CONST from './CONST';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Boundary {
    static width = 50;
    static height = 50;

    constructor({ position, image }) {
        this.position = position;
        this.image = image;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        // context.fillStyle = CONST.colors.darkBlue;
        // context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}

export default Boundary;
