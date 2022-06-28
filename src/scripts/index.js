import css from '../index.css';
import CONST from './CONST';
import Boundary from './Boundary';
import Pacman from './Pacman';
import Ghost from './Ghost';
import { boundaries, pellets } from './layout';

function importAll(r) {
    return r.keys().map(r);
}

importAll(require.context('../../images/', false, /\.(png|jpe?g|svg)$/));

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

canvas.width = 600;
canvas.height = 700;

const direction = {
    up: false,
    down: false,
    left: false,
    right: false,
};

const ghosts = [
    new Ghost({
        position: {
            x: Boundary.width + 6 * Boundary.width,
            y: Boundary.height,
        },
        velocity: {
            x: 0,
            y: 0,
        },
        color: 'pink',
    }),
];

let score = 0;
let lastDirection;

const pacman = new Pacman({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
        x: 0,
        y: 0,
    },
});

function isColliding(pacman, boundary) {
    if (pacman.position.y - pacman.radius + pacman.velocity.y <= boundary.position.y + boundary.height
        && pacman.position.x + pacman.radius + pacman.velocity.x >= boundary.position.x
        && pacman.position.y + pacman.radius + pacman.velocity.y >= boundary.position.y
        && pacman.position.x - pacman.radius + pacman.velocity.x <= boundary.position.x + boundary.height
    ) {
        return true;
    }
    return false;
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (direction.up && lastDirection === 'up') {
        for (let i = 0; i < boundaries.length; i++) {
            const pacmanWithPredictedVelocity = {
                ...pacman,
                velocity: {
                    x: 0,
                    y: -5,
                },
            };
            if (isColliding(pacmanWithPredictedVelocity, boundaries[i])) {
                pacman.velocity.y = 0;
                break;
            } else {
                pacman.velocity.y = -5;
            }
        }
    }
    if (direction.left && lastDirection === 'left') {
        for (let i = 0; i < boundaries.length; i++) {
            const pacmanWithPredictedVelocity = {
                ...pacman,
                velocity: {
                    x: -5,
                    y: 0,
                },
            };
            if (isColliding(pacmanWithPredictedVelocity, boundaries[i])) {
                pacman.velocity.x = 0;
                break;
            } else {
                pacman.velocity.x = -5;
            }
        }
    }
    if (direction.down && lastDirection === 'down') {
        for (let i = 0; i < boundaries.length; i++) {
            const pacmanWithPredictedVelocity = {
                ...pacman,
                velocity: {
                    x: 0,
                    y: 5,
                },
            };
            if (isColliding(pacmanWithPredictedVelocity, boundaries[i])) {
                pacman.velocity.y = 0;
                break;
            } else {
                pacman.velocity.y = 5;
            }
        }
    }
    if (direction.right && lastDirection === 'right') {
        for (let i = 0; i < boundaries.length; i++) {
            const pacmanWithPredictedVelocity = {
                ...pacman,
                velocity: {
                    x: 5,
                    y: 0,
                },
            };
            if (isColliding(pacmanWithPredictedVelocity, boundaries[i])) {
                pacman.velocity.x = 0;
                break;
            } else {
                pacman.velocity.x = 5;
            }
        }
    }

    for (let i = pellets.length - 1; i >= 0; i--) {
        const pellet = pellets[i];
        pellet.draw();
        if (Math.hypot(pellet.position.x - pacman.position.x, pellet.position.y - pacman.position.y)
            < pellet.radius + pacman.radius
        ) {
            pellets.splice(i, 1);
            score += 10;
            scoreElement.innerHTML = score;
        }
    }

    boundaries.forEach((boundary) => {
        boundary.draw();

        if (isColliding(pacman, boundary)) {
            pacman.velocity.x = 0;
            pacman.velocity.y = 0;
        }
    });

    pacman.update();

    ghosts.forEach((ghost) => {
        ghost.update();
        const collisions = [];
        boundaries.forEach((boundary) => {
            const ghostWithPredictedVelocity = {
                ...ghost,
                velocity: {
                    x: 0,
                    y: 5,
                },
            };
            if (isColliding(ghostWithPredictedVelocity, boundary)) {

            }
        });
    });
}
animate();

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === 'w' || e.key === 'ArrowUp') {
        direction.up = true;
        lastDirection = 'up';
    } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        direction.left = true;
        lastDirection = 'left';
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        direction.down = true;
        lastDirection = 'down';
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        direction.right = true;
        lastDirection = 'right';
    }
});

window.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.key === 'w' || e.key === 'ArrowUp') {
        direction.up = false;
    } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        direction.left = false;
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        direction.down = false;
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        direction.right = false;
    }
});
