// Clase Ball
class Ball {
    constructor(x, y, radius, speed, dx, dy) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speed = speed;
      this.dx = dx;
      this.dy = dy;
    }
  
    draw(context) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = 'red';
      context.fill();
      context.closePath();
    }
  
    update() {
      this.x += this.dx * this.speed;
      this.y += this.dy * this.speed;
    }
  }
  
  // Clase Paddle
  class Paddle {
    constructor(x, y, width, height, speed) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
    }
  
    draw(context) {
      context.fillStyle = 'white';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  
    update(leftPressed, rightPressed, canvasWidth) {
      if (leftPressed && this.x > 0) {
        this.x -= this.speed;
      } else if (rightPressed && this.x + this.width < canvasWidth) {
        this.x += this.speed;
      }
    }
  }
  
  // Clase Brick
  class Brick {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.visible = true;
    }
  
    draw(context) {
      if (this.visible) {
        context.fillStyle = 'yellow';
        context.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }
  
  // Clase Game
  class Game {
    constructor() {
      this.canvas = document.getElementById('game');
      this.context = this.canvas.getContext('2d');
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.ball = new Ball(this.width / 2, this.height - 30, 10, 2, 1, -1);
      this.paddle = new Paddle((this.width - 75) / 2, this.height - 10, 75, 10, 7);
      this.bricks = [];
      this.brickRowCount = 3;
      this.brickColumnCount = 8;
      this.brickWidth = 30;
      this.brickHeight = 20;
      this.score = 0;
      this.lives = 3;
      this.gameOver = false;
      this.rightPressed = false;
      this.leftPressed = false;
      this.setupBricks();
      this.registerEventListeners();
    }
  
    setupBricks() {
      for (let c = 0; c < this.brickColumnCount; c++) {
        for (let r = 0; r < this.brickRowCount; r++) {
          const brickX = c * (this.brickWidth + 10) + 30;
          const brickY = r * (this.brickHeight + 10) + 30;
          this.bricks.push(new Brick(brickX, brickY, this.brickWidth, this.brickHeight));
        }
      }
    }
  
    registerEventListeners() {
      document.addEventListener('keydown', this.keyDownHandler.bind(this));
      document.addEventListener('keyup', this.keyUpHandler.bind(this));
      document.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
    }
  
    keyDownHandler(event) {
      if (event.key === 'Right' || event.key === 'ArrowRight') {
        this.rightPressed = true;
      } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        this.leftPressed = true;
      }
    }
  
    keyUpHandler(event) {
      if (event.key === 'Right' || event.key === 'ArrowRight') {
        this.rightPressed = false;
      } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        this.leftPressed = false;
      }
    }
  
    mouseMoveHandler(event) {
      const relativeX = event.clientX - this.canvas.offsetLeft;
      if (relativeX > 0 && relativeX < this.width) {
        this.paddle.x = relativeX - this.paddle.width / 2;
      }
    }
  
    collisionDetection() {
      for (let i = 0; i < this.bricks.length; i++) {
        const brick = this.bricks[i];
        if (brick.visible) {
          if (
            this.ball.x > brick.x &&
            this.ball.x < brick.x + brick.width &&
            this.ball.y > brick.y &&
            this.ball.y < brick.y + brick.height
          ) {
            this.ball.dy = -this.ball.dy;
            brick.visible = false;
            this.score++;
            if (this.score === this.brickRowCount * this.brickColumnCount) {
              this.gameOver = true;
            }
          }
        }
      }
    }
  
    drawScore() {
      this.context.font = '16px Arial';
      this.context.fillStyle = 'black';
      this.context.fillText(`Score: ${this.score}`, 8, 20);
    }
  
    drawLives() {
      this.context.font = '16px Arial';
      this.context.fillStyle = 'black';
      this.context.fillText(`Lives: ${this.lives}`, this.width - 65, 20);
    }
  
    draw() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.ball.draw(this.context);
      this.paddle.draw(this.context);
      this.bricks.forEach((brick) => brick.draw(this.context));
      this.drawScore();
      this.drawLives();
    }
  
    update() {
      if (!this.gameOver) {
        this.ball.update();
        this.paddle.update(this.leftPressed, this.rightPressed, this.width);
        this.collisionDetection();
  
        if (
          this.ball.x + this.ball.dx * this.ball.speed > this.width - this.ball.radius ||
          this.ball.x + this.ball.dx * this.ball.speed < this.ball.radius
        ) {
          this.ball.dx = -this.ball.dx;
        }
  
        if (this.ball.y + this.ball.dy * this.ball.speed < this.ball.radius) {
          this.ball.dy = -this.ball.dy;
        } else if (this.ball.y + this.ball.dy * this.ball.speed > this.height - this.ball.radius) {
          if (
            this.ball.x > this.paddle.x &&
            this.ball.x < this.paddle.x + this.paddle.width
          ) {
            this.ball.dy = -this.ball.dy;
          } else {
            this.lives--;
            if (this.lives === 0) {
              this.gameOver = true;
            } else {
              this.ball.x = this.width / 2;
              this.ball.y = this.height - 30;
              this.ball.dx = 1;
              this.ball.dy = -1;
              this.paddle.x = (this.width - this.paddle.width) / 2;
            }
          }
        }
  
        this.draw();
        requestAnimationFrame(this.update.bind(this));
      } else {
        this.context.font = '24px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText('Game Over', this.width / 2 - 70, this.height / 2);
      }
    }
  }
  
  const game = new Game();
  game.update();
  