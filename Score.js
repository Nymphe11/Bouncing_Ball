// Score.js
class Score {
  constructor($target) {
    this.score = 0;
    this.$target = $target;

    this.initializeScore();
  }

  initializeScore() {
    this.scoreContainer = document.createElement('div');
    this.scoreContainer.id = 'score';
    this.$target.appendChild(this.scoreContainer);
    this.render();
  }

  setScore(newScore) {
    if (this.score !== newScore) {
      this.score = newScore;
      this.render();
    }
  }

  render() {
    this.scoreContainer.textContent = `Score: ${this.score}`;
  }
}

export default Score;
