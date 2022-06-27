import CONST from './CONST';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Boundary {
    static width = 40;
    static height = 40;

    constructor({ position }) {
        this.position = position;
        this.width = 40;
        this.height = 40;
    }

    draw() {
        context.fillStyle = CONST.colors.darkBlue;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export default Boundary;
