// Animated Git-style branch lines for background
const canvas = document.getElementById('branch-lines-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Simple branch line animation
const lines = Array.from({ length: 8 }, (_, i) => ({
  x: 100 + i * 120,
  y: Math.random() * canvas.height,
  speed: 0.3 + Math.random() * 0.4,
  color: i % 2 === 0 ? '#bfff00' : '#fff',
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach(line => {
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(line.x, 0);
    ctx.bezierCurveTo(
      line.x + 40, canvas.height * 0.3,
      line.x - 40, canvas.height * 0.7,
      line.x, canvas.height
    );
    ctx.stroke();
    // Animate
    line.x += Math.sin(Date.now() / 1000 + line.x) * 0.1;
    line.y += line.speed;
    if (line.y > canvas.height) line.y = 0;
  });
  requestAnimationFrame(draw);
}
draw();
