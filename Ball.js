// Ball.js
class Ball {
  constructor(x, y, radius, color, $target, score) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.gravity = 0.98;
    this.dy = 0; // Y 방향 속도 초기화
    this.dx = 0; // X 방향 속도 초기화
    this.$target = $target;

    this.score = null;

    // Canvas 설정을 constructor에서 한 번만 수행
    this.initializeCanvas();

    // 바운드된 이벤트 핸들러 생성
    this.boundAnimate = this.animate.bind(this);
    this.boundHandleClick = this.handleClick.bind(this);

    // 클릭 이벤트 리스너 등록
    this.canvas.addEventListener('mousedown', this.boundHandleClick);
  }

  initializeCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'myCanvas';
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext('2d');
    this.$target.appendChild(this.canvas);
  }

  setScoreInstance(score) {
    this.score = score; // App.js에서 전달받은 Score 객체 저장
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

      this.score.setScore(0);
    }
    // 벽에 튕기기
    if (this.x + this.radius > 800) {
      this.x = 800 - this.radius; // 위치 조정(이 코드 없으면 벽에 달라붙는 경우 생김)
      this.dx = -this.dx * 0.8; // 속도 반전
    } else if (this.x - this.radius < 0) {
      this.x = this.radius; // 위치 조정
      this.dx = -this.dx * 0.8; // 속도 반전
    }
  }

  handleClick(e) {
    // 클릭 위치 계산
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // 캔버스 내의 X 좌표
    const mouseY = e.clientY - rect.top; // 캔버스 내의 Y 좌표

    const dx = mouseX - this.x;
    const dy = mouseY - this.y;

    // 클릭한 좌표가 공 안에 있는지 확인
    if (dx * dx + dy * dy < this.radius * this.radius) {
      this.dx = (-40 * dx) / this.radius;

      this.dy = (-30 * (dy + 1.5 * this.radius)) / (this.radius * 2);

      this.score.setScore(this.score.score + 1);
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, 800, 800);
    this.update();
    this.draw(this.ctx);

    requestAnimationFrame(this.boundAnimate);
  }
}

export default Ball;
