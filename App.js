// app.js
import Ball from './Ball.js';

class App {
  constructor($target) {
    this.ball = new Ball(400, 100, 80, 'red', $target);
    this.ball.animate();
  }
}

export default App;
