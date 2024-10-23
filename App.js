// App.js
import Ball from './Ball.js';
import Score from './Score.js';

class App {
  constructor($target) {
    this.ball = new Ball(400, 100, 80, 'red', $target);
    this.score = new Score($target);

    this.ball.setScoreInstance(this.score);
    this.ball.animate();
  }
}

export default App;
