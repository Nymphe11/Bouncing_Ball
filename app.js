// app.js
import Ball from './Ball.js';

const $target = document.querySelector('#Score');

const ball = new Ball(400, 100, 80, 'red', $target);
ball.animate();
