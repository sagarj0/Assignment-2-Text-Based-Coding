const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let drawing = false;
let isEraser = false;
let color = document.getElementById("colorPicker").value;
let size = document.getElementById("sizePicker").value;
let eraserSize = document.getElementById("eraserSizePicker").value;

document.getElementById("colorPicker").addEventListener("change", (e) => {
  color = e.target.value;
  isEraser = false;
  updateButtonStates();
});

document.getElementById("sizePicker").addEventListener("input", (e) => {
  size = e.target.value;
  document.getElementById("brushSizeDisplay").textContent = size;
});

document.getElementById("eraserSizePicker").addEventListener("input", (e) => {
  eraserSize = e.target.value;
  document.getElementById("eraserSizeDisplay").textContent = eraserSize;
});

document.getElementById("eraserBtn").addEventListener("click", () => {
  isEraser = !isEraser;
  updateButtonStates();
});

document.getElementById("clearBtn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function updateButtonStates() {
  const eraserBtn = document.getElementById("eraserBtn");
  if (isEraser) {
    eraserBtn.classList.add("active");
  } else {
    eraserBtn.classList.remove("active");
  }
}

canvas.addEventListener("mousedown", () => {
  drawing = true;
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function draw(event) {
  if (!drawing) return;

  ctx.lineCap = "round";

  if (isEraser) {
    ctx.lineWidth = eraserSize;
    ctx.strokeStyle = "white";
  } else {
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
  }

  const x = event.offsetX;
  const y = event.offsetY;

  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x, y);
}
