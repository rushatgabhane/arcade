import CONST from './CONST';
import Boundary from './Boundary';
import Pellet from './Pellet';

function importAll(r) {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../../images/', false, /\.(png|jpe?g|svg)$/));

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3'],
];

const boundaries = [];
const pellets = [];

function createImage(src) {
    const image = new Image();
    image.src = src;
    return image;
}

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
        case '-':
            boundaries.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('./images/pipeHorizontal.png'),
                }),
            );
            break;
        case '|':
            boundaries.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('./images/pipeVertical.png'),
                }),
            );
            break;
        case '1':
            boundaries.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('./images/pipeCorner1.png'),
                }),
            );
            break;
        case '2':
            boundaries.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('./images/pipeCorner2.png'),
                }),
            );
            break;
        case '3':
            boundaries.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('./images/pipeCorner3.png'),
                }),
            );
            break;
        case '4':
            boundaries.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('./images/pipeCorner4.png'),
                }),
            );
            break;
        case 'b':
            boundaries.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('./images/block.png'),
                }),
            );
            break;
        case '[':
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    image: createImage('./images/capLeft.png'),
                }),
            );
            break;
        case ']':
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    image: createImage('./images/capRight.png'),
                }),
            );
            break;
        case '_':
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    image: createImage('./images/capBottom.png'),
                }),
            );
            break;
        case '^':
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    image: createImage('./images/capTop.png'),
                }),
            );
            break;
        case '+':
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    image: createImage('./images/pipeCross.png'),
                }),
            );
            break;
        case '5':
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    color: CONST.colors.darkBlue,
                    image: createImage('./images/pipeConnectorTop.png'),
                }),
            );
            break;
        case '6':
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    color: CONST.colors.darkBlue,
                    image: createImage('./images/pipeConnectorRight.png'),
                }),
            );
            break;
        case '7':
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    color: CONST.colors.darkBlue,
                    image: createImage('./images/pipeConnectorBottom.png'),
                }),
            );
            break;
        case '8':
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                image: createImage('./images/pipeConnectorLeft.png'),
                }),
            );
            break;
        case '.':
            pellets.push(
                new Pellet({
                    position: {
                        x: j * Boundary.width + Boundary.width / 2,
                        y: i * Boundary.height + Boundary.height / 2,
                    },
                }),
            );
            break;
        }
    });
});

export {
    boundaries,
    pellets,
};
