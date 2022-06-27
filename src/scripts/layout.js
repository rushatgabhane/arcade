import CONST from './CONST';
import Boundary from './Boundary';

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

const layout = [];
const pellets = [];

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
        case '-':
            layout.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('../images/pipeHorizontal.png'),
                }),
            );
            break;
        case '|':
            layout.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('../images/pipeVertical.png'),
                }),
            );
            break;
        case '1':
            layout.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('../images/pipeCorner1.png'),
                }),
            );
            break;
        case '2':
            layout.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('../images/pipeCorner2.png'),
                }),
            );
            break;
        case '3':
            layout.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('../images/pipeCorner3.png'),
                }),
            );
            break;
        case '4':
            layout.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('../images/pipeCorner4.png'),
                }),
            );
            break;
        case 'b':
            layout.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i,
                    },
                    image: createImage('../images/block.png'),
                }),
            );
            break;
        case '[':
            layout.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    image: createImage('../images/capLeft.png'),
                }),
            );
            break;
        case ']':
            layout.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    image: createImage('../images/capRight.png'),
                }),
            );
            break;
        case '_':
            layout.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    image: createImage('../images/capBottom.png'),
                }),
            );
            break;
        case '^':
            layout.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    image: createImage('../images/capTop.png'),
                }),
            );
            break;
        case '+':
            layout.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    image: createImage('../images/pipeCross.png'),
                }),
            );
            break;
        case '5':
            layout.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    color: CONST.COLORS.darkBlue,
                    image: createImage('../images/pipeConnectorTop.png'),
                }),
            );
            break;
        case '6':
            layout.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    color: CONST.COLORS.darkBlue,
                    image: createImage('../images/pipeConnectorRight.png'),
                }),
            );
            break;
        case '7':
            layout.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    color: CONST.COLORS.darkBlue,
                    image: createImage('../images/pipeConnectorBottom.png'),
                }),
            );
            break;
        case '8':
            layout.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height,
                    },
                    image: createImage('../images/pipeConnectorLeft.png'),
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
    layout,
    pellets,
};
