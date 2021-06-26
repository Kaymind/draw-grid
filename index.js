const inputEl = document.getElementById('input');
const submitEl = document.getElementById('submit');
const container = document.getElementById('container');

const createTable = (rows, columns, tracking, origin, tableSize) => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (
        y === tracking.slice(-1)[0][1] &&
        origin === tracking.slice(-1)[0][1] &&
        x === tracking.slice(-1)[0][0] &&
        origin === tracking.slice(-1)[0][0]
      ) {
        container.innerHTML += `<div style='background-color:orange; width: ${
          100 / tableSize
        }%; height: ${100 / tableSize}%' class='box'></div>`;
      } else if (
        y === tracking.slice(-1)[0][1] &&
        x === tracking.slice(-1)[0][0]
      ) {
        container.innerHTML += `<div style='background-color:red; width: ${
          100 / tableSize
        }%; height: ${100 / tableSize}%' class='box'></div>`;
      } else if (y === origin && x === origin) {
        container.innerHTML += `<div style='background-color:green; width: ${
          100 / tableSize
        }%; height: ${100 / tableSize}%' class='box'></div>`;
      } else if (tracking.find((step) => step[1] === y && step[0] === x)) {
        container.innerHTML += `<div style='background-color:grey; width: ${
          100 / tableSize
        }%; height: ${100 / tableSize}%' class='box'></div>`;
      } else {
        container.innerHTML += `<div style='background-color:white; width: ${
          100 / tableSize
        }%; height: ${100 / tableSize}%' class='box'></div>`;
      }
    }
  }
};

const handleSubmit = () => {
  container.innerHTML = '';
  let maxX = 0;
  let maxY = 0;
  let tempMaxX = 0;
  let tempMaxY = 0;
  let tracking = [];
  let tableSize;

  const inputArray = inputEl.value.split('');

  inputArray.forEach((ch) => {
    switch (ch.toLowerCase()) {
      case 'u':
        maxY++;
        if (maxY > tempMaxY) {
          tempMaxY = maxY;
        }
        break;
      case 'd':
        maxY--;
        if (Math.abs(maxY) > tempMaxY) {
          tempMaxY = Math.abs(maxY);
        }
        break;
      case 'r':
        maxX++;
        if (maxX > tempMaxX) {
          tempMaxX = maxX;
        }
        break;
      case 'l':
        maxX--;
        if (Math.abs(maxX) > tempMaxX) {
          tempMaxX = Math.abs(maxX);
        }
        break;
    }
  });

  tableSize = Math.max(tempMaxX, tempMaxY) * 2 + 1;
  const origin = Math.max(tempMaxX, tempMaxY);
  let currentStepX = origin;
  let currentStepY = origin;

  inputArray.forEach((ch) => {
    switch (ch.toLowerCase()) {
      case 'u':
        tracking.push([currentStepX, --currentStepY]);
        break;
      case 'd':
        tracking.push([currentStepX, ++currentStepY]);
        break;
      case 'r':
        tracking.push([++currentStepX, currentStepY]);
        break;
      case 'l':
        tracking.push([--currentStepX, currentStepY]);
        break;
    }
  });

  createTable(tableSize, tableSize, tracking, origin, tableSize);
};

submitEl.addEventListener('click', handleSubmit);
