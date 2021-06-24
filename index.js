const inputEl = document.getElementById('input');
const submitEl = document.getElementById('submit');
const container = document.getElementById('container');

let maxX = 0;
let maxY = 0;
let tempMaxX = 0;
let tempMaxY = 0;
let tracking = [];
let resultTable;
let tableSize;

const createTable = (rows, columns, tracking, origin, tableSize) => {
  let array = new Array(rows);
  console.log('tracking.slice(-1)[0]', tracking.slice(-1)[0][0]);
  console.log('tracking.slice(-1)[1]', tracking.slice(-1)[0][1]);

  for (let i = 0; i < rows; i++) {
    array[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      array[i][j] =
        i === origin && j === origin
          ? 'start'
          : i === tracking.slice(-1)[0][1] && j === tracking.slice(-1)[0][0]
          ? 'end'
          : tracking.find((step) => step[1] === i && step[0] === j)
          ? 'x'
          : 'y';
    }
  }
  return array;
};

const drawTable = (table, tableSize) => {
  table.forEach((row) => {
    row.forEach((column) => {
      container.innerHTML += `<div style='background-color:${
        column === 'end'
          ? 'red'
          : column === 'start'
          ? 'green'
          : column === 'x'
          ? 'grey'
          : 'white'
      }; width: ${Math.floor(100 / tableSize)}%; height: ${
        100 / tableSize
      }%' class='box'></div>`;
    });
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  container.innerHTML = '';
  maxX = 0;
  maxY = 0;
  tempMaxX = 0;
  tempMaxY = 0;
  tracking = [];
  resultTable = '';
  tableSize = 0;

  const inputArray = inputEl.value.split('');

  inputArray.forEach((ch) => {
    switch (ch.toLowerCase()) {
      case 'u':
        maxX++;
        if (maxX > tempMaxX) {
          tempMaxX = maxX;
        }
        break;
      case 'd':
        maxX--;
        if (Math.abs(maxX) > tempMaxX) {
          tempMaxX = Math.abs(maxX);
        }
        break;
      case 'r':
        maxY++;
        if (maxY > tempMaxY) {
          tempMaxY = maxY;
        }
        break;
      case 'l':
        maxY--;
        if (Math.abs(maxY) > tempMaxY) {
          tempMaxY = Math.abs(maxY);
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

  const table = createTable(tableSize, tableSize, tracking, origin);
  drawTable(table, tableSize);
};

submitEl.addEventListener('click', handleSubmit);
