// Modal.js

export class Modal {
  constructor($target) {
    this.$target = $target;
    this.modal = document.createElement('div');
    this.modal.id = 'scoreModal';
    this.modal.style.display = 'none';
    this.modal.innerHTML = `
      <div id="scoreModal">
        <h2>Game Over</h2>
        <p id="finalScore"></p>
        <button id="restartButton">Replay</button>
      </div>
    `;
    this.$target.appendChild(this.modal);

    this.restartButton = this.modal.querySelector('#restartButton');
    this.restartButton.addEventListener('click', () => this.hide());
  }

  show(score) {
    this.modal.querySelector('#finalScore').textContent = `Score: ${score}`;
    this.modal.style.display = 'flex'; // 모달 표시
  }

  hide() {
    this.modal.style.display = 'none'; // 모달 숨김
  }
}
