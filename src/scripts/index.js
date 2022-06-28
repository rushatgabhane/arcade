import css from '../index.css';
import CONST from './CONST';
import Boundary from './Boundary';
import Pacman from './Pacman';
import Ghost from './Ghost';
import { boundaries, pellets, powerUps } from './layout';

function importAll(r) {
    return r.keys().map(r);
}

importAll(require.context('../../images/', false, /\.(png|jpe?g|svg)$/));

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const endMessageElement = document.getElementById('endMessage');

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
            x: Boundary.width + 13 * Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2,
        },
        velocity: {
            x: Ghost.speed,
            y: 0,
        },
        color: 'pink',
    }),
    new Ghost({
        position: {
            x: Boundary.width + 5 * Boundary.width / 2,
            y: 5 * Boundary.height + Boundary.height / 2,
        },
        velocity: {
            x: Ghost.speed,
            y: 0,
        },
        color: 'green',
    }),
    new Ghost({
        position: {
            x: Boundary.width + 5 * Boundary.width / 2,
            y: 11 * Boundary.height + Boundary.height / 2,
        },
        velocity: {
            x: Ghost.speed,
            y: 0,
        },
        color: 'tangerine',
    }),
    new Ghost({
        position: {
            x: Boundary.width + 5 * Boundary.width / 2,
            y: 11 * Boundary.height + Boundary.height / 2,
        },
        velocity: {
            x: Ghost.speed,
            y: 0,
        },
        color: 'ice',
    }),
];

let score = 0;
let lastDirection;
let isPowerUpActive = false;

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

function isColliding(circle, boundary) {
    const padding = Boundary.width / 2 - circle.radius - 1;
    if (circle.position.y - circle.radius + circle.velocity.y <= boundary.position.y + boundary.height + padding
        && circle.position.x + circle.radius + circle.velocity.x >= boundary.position.x - padding
        && circle.position.y + circle.radius + circle.velocity.y >= boundary.position.y - padding
        && circle.position.x - circle.radius + circle.velocity.x <= boundary.position.x + boundary.height + padding
    ) {
        return true;
    }
    return false;
}

let animateID;

function animate() {
    animateID = requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (direction.up && lastDirection === 'up') {
        for (let i = 0; i < boundaries.length; i++) {
            const pacmanWithPredictedVelocity = {
                ...pacman,
                velocity: {
                    x: 0,
                    y: -pacman.speed,
                },
            };
            if (isColliding(pacmanWithPredictedVelocity, boundaries[i])) {
                pacman.velocity.y = 0;
                break;
            } else {
                pacman.velocity.y = -pacman.speed;
            }
        }
    }
    if (direction.left && lastDirection === 'left') {
        for (let i = 0; i < boundaries.length; i++) {
            const pacmanWithPredictedVelocity = {
                ...pacman,
                velocity: {
                    x: -pacman.speed,
                    y: 0,
                },
            };
            if (isColliding(pacmanWithPredictedVelocity, boundaries[i])) {
                pacman.velocity.x = 0;
                break;
            } else {
                pacman.velocity.x = -pacman.speed;
            }
        }
    }
    if (direction.down && lastDirection === 'down') {
        for (let i = 0; i < boundaries.length; i++) {
            const pacmanWithPredictedVelocity = {
                ...pacman,
                velocity: {
                    x: 0,
                    y: pacman.speed,
                },
            };
            if (isColliding(pacmanWithPredictedVelocity, boundaries[i])) {
                pacman.velocity.y = 0;
                break;
            } else {
                pacman.velocity.y = pacman.speed;
            }
        }
    }
    if (direction.right && lastDirection === 'right') {
        for (let i = 0; i < boundaries.length; i++) {
            const pacmanWithPredictedVelocity = {
                ...pacman,
                velocity: {
                    x: pacman.speed,
                    y: 0,
                },
            };
            if (isColliding(pacmanWithPredictedVelocity, boundaries[i])) {
                pacman.velocity.x = 0;
                break;
            } else {
                pacman.velocity.x = pacman.speed;
            }
        }
    }

    if (pellets.length === 0) {
        endGame('You WIN!!!');
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

    powerUps.forEach((powerUp, i) => {
        powerUp.draw();

        if (Math.hypot(powerUp.position.x - pacman.position.x, powerUp.position.y - pacman.position.y)
            < powerUp.radius + pacman.radius
        ) {
            powerUps.splice(i, 1);
            isPowerUpActive = true;
            setTimeout(() => {
                isPowerUpActive = false;
            }, CONST.powerUpTime);
        }
    });

    boundaries.forEach((boundary) => {
        boundary.draw();

        if (isColliding(pacman, boundary)) {
            pacman.velocity.x = 0;
            pacman.velocity.y = 0;
        }
    });

    pacman.update();

    ghosts.forEach((ghost, i) => {
        ghost.update();
        if (isPowerUpActive) {
            ghost.isScared = true;
            setTimeout(() => {
                ghost.isScared = false;
                console.log('ghost no scrae')
            }, CONST.powerUpTime);
        }

        if (Math.hypot(ghost.position.x - pacman.position.x, ghost.position.y - pacman.position.y)
            < ghost.radius + pacman.radius
        ) {
            if (isPowerUpActive) {
                ghosts.splice(i, 1);
                score += 100;
                scoreElement.innerHTML = score;
            } else {
                endGame('Game over!');
            }
        }

        const collisions = [];
        boundaries.forEach((boundary) => {
            const ghostWithPredictedVelocityRight = {
                ...ghost,
                velocity: {
                    x: ghost.speed,
                    y: 0,
                },
            };
            if (isColliding(ghostWithPredictedVelocityRight, boundary) && !collisions.includes('right')) {
                collisions.push('right');
            }

            const ghostWithPredictedVelocityLeft = {
                ...ghost,
                velocity: {
                    x: -ghost.speed,
                    y: 0,
                },
            };
            if (isColliding(ghostWithPredictedVelocityLeft, boundary) && !collisions.includes('left')) {
                collisions.push('left');
            }

            const ghostWithPredictedVelocityUp = {
                ...ghost,
                velocity: {
                    x: 0,
                    y: -ghost.speed,
                },
            };
            if (isColliding(ghostWithPredictedVelocityUp, boundary) && !collisions.includes('up')) {
                collisions.push('up');
            }

            const ghostWithPredictedVelocityDown = {
                ...ghost,
                velocity: {
                    x: 0,
                    y: ghost.speed,
                },
            };
            if (isColliding(ghostWithPredictedVelocityDown, boundary) && !collisions.includes('down')) {
                collisions.push('down');
            }
        });

        if (collisions.length > ghost.previousCollisions.length) {
            ghost.previousCollisions = collisions;
        }

        if (JSON.stringify(collisions) !== JSON.stringify(ghost.previousCollisions)) {
            if (ghost.velocity.x > 0) {
                ghost.previousCollisions.push('right');
            }
            else if (ghost.velocity.x < 0) {
                ghost.previousCollisions.push('left');
            }
            else if (ghost.velocity.y > 0) {
                ghost.previousCollisions.push('down');
            }
            else if (ghost.velocity.y < 0) {
                ghost.previousCollisions.push('up');
            }
            const possibleDirections = ghost.previousCollisions.filter((collision) => !collisions.includes(collision));
            const selectedDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
            switch(selectedDirection) {
            case 'up':
                ghost.velocity.x = 0;
                ghost.velocity.y = -ghost.speed;
                break;
            case 'down':
                ghost.velocity.x = 0;
                ghost.velocity.y = ghost.speed;
                break;
            case 'left':
                ghost.velocity.x = -ghost.speed;
                ghost.velocity.y = 0;
                break;
            case 'right':
                ghost.velocity.x = ghost.speed;
                ghost.velocity.y = 0;
                break;
            }
            ghost.previousCollisions = [];
        }
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

function endGame(message) {
    cancelAnimationFrame(animateID);
    endMessageElement.innerHTML = message;
}
