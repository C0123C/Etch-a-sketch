const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'black';
const DEFAULT_MODE = 'normal';
let sizeValue = DEFAULT_SIZE;
let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;
const grid = document.querySelector('.grid');
const size = document.querySelector('.size');
const sizeSlider = document.querySelector('.sizeSlider');
const colorSelect = document.querySelector('.colorSelect');
const clearBtn = document.querySelector('.clearBtn');
const normalBtn = document.querySelector('.normalBtn');
const colorBtn = document.querySelector('.colorBtn');
const eraserBtn = document.querySelector('.eraserBtn');

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);
colorSelect.onchange = (e) => setCurrentColor(e.target.value);
clearBtn.onclick = () => clear();
normalBtn.onclick = () => changeMode('black');
colorBtn.onclick = () => changeMode('color');
eraserBtn.onclick = () => changeMode('eraser');

function buildGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.addEventListener('mouseover', changeColor);
    grid.appendChild(gridElement);
  }
}

function changeMode(currentMode) {
  mode = currentMode;
}

const btns = document.querySelectorAll('.btn > button');
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    btns.forEach(btn => {
      btn.classList.remove('active');
    })
    switch (mode) {
      case 'color':
        colorBtn.classList.add('active');
        break;
      case 'eraser':
        eraserBtn.classList.add('active');
        break;
      default:
        normalBtn.classList.add('active');
    }
  })
})

function setCurrentColor(newColor) {
  color = newColor;
}

function changeColor(e) {
  switch (mode) {
    case 'color': 
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
      break;
      case 'eraser':
        e.target.style.backgroundColor = '';
        break;
    default:
      e.target.style.backgroundColor = color;
  }
}

function updateSizeValue(e) {
    sizeValue = e;
    size.innerHTML = `${sizeValue} x ${sizeValue}`;
}

function changeSize(e) {
  grid.innerHTML = '';
  buildGrid(e);
}

function clear() {
  const divs = document.querySelectorAll('.grid > div');
  divs.forEach(div => div.style.backgroundColor = ''); 
}

buildGrid(DEFAULT_SIZE);
