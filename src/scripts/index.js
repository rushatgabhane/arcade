import css from '../index.css';
import CONST from './CONST';
import Boundary from './Boundary';
import Pacman from './Pacman';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const direction = {
    up: false,
    down: false,
    left: false,
    right: false,
};

const directions = ['up', 'left', 'down', 'right'];

let lastDirection;

const pacman = new Pacman({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
        x: 0,
        y: 0,
    }
});

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height)
    pacman.update();

    pacman.velocity.x = 0;
    pacman.velocity.y = 0;
    if (direction.up) {
        pacman.velocity.y = -5;
    }
    else if (direction.left) {
        pacman.velocity.x = -5;
    }
    else if (direction.down) {
        pacman.velocity.y = 5;
    }
    else if (direction.right) {
        pacman.velocity.x = 5;
    }
}
animate();

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === 'w' || e.key === 'ArrowUp') {
        direction.up = true;
        lastDirection = 'up';
    }
    else if (e.key === 'a' || e.key === 'ArrowLeft') {
        direction.left = true;   
        lastDirection = 'left';
    }
    else if (e.key === 's' || e.key === 'ArrowDown') {
        direction.down = true;  
        lastDirection = 'down'; 
    }
    else if (e.key === 'd' || e.key === 'ArrowRight') {
        direction.right = true; 
        lastDirection = 'right';  
    }
});


window.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.key === 'w' || e.key === 'ArrowUp') {
        direction.up = false;   
    }
    else if (e.key === 'a' || e.key === 'ArrowLeft') {
        direction.left = false;   
    }
    else if (e.key === 's' || e.key === 'ArrowDown') {
        direction.down = false;   
    }
    else if (e.key === 'd' || e.key === 'ArrowRight') {
        direction.right = false;   
    }
});
