class Ball {
  constructor(x, y, radius, color, $target) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.gravity = 0.98;
    this.dy = 0; // Y 방향 속도 초기화
    this.dx = 0; // X 방향 속도 초기화
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.$target = $target;

    this.score = 0;

    // 클릭 이벤트 리스너 등록
    this.canvas.addEventListener('mousedown', (e) => this.handleClick(e));
  }

  setState(nextScore) {
    this.score = nextScore;
    this.render();
  }

  render() {
    this.$target.innerHTML = `Score : ${this.score}`;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  update() {
    this.dy += this.gravity;
    this.x += this.dx;
    this.y += this.dy;

    // 바닥에 닿았을 때 다시 튀어오르도록 처리
    if (this.y + this.radius > 800) {
      this.y = 800 - this.radius;
      this.dy = -this.dy * 0.9; // 튀는 속도 감소
      this.dx = 0.95 * this.dx;

      this.setState(0);
    }
    // 벽에 튕기기
    if (this.x + this.radius > 800) {
      this.x = 800 - this.radius; // 위치 조정(이 코드 없으면 벽에 달라붙는 경우 생김)
      this.dx = -this.dx * 0.8; // 속도 반전
    } else if (this.x - this.radius < 0) {
      this.x = this.radius; // 위치 조정
      this.dx = -this.dx * 0.8; // 속도 반전
    }

    this.render();
  }

  handleClick(e) {
    // 클릭 위치 계산
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // 캔버스 내의 X 좌표
    const mouseY = e.clientY - rect.top; // 캔버스 내의 Y 좌표

    // 클릭한 좌표가 공 안에 있는지 확인
    if ((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2 < this.radius ** 2) {
      this.dx = (-40 * (mouseX - this.x)) / this.radius;

      this.dy =
        (-30 * (mouseY - this.y + 1.5 * this.radius)) / (this.radius * 2);

      this.setState(this.score + 1);
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, 800, 800);
    this.update();
    this.draw(this.ctx);

    requestAnimationFrame(() => this.animate());
  }
}

export default Ball;
