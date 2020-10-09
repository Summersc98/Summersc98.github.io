const { arrayBufferToBlob } = require("cypress/types/blob-util");

const myHeading = document.querySelector('h1');
myHeading.textContent = 'the js loaded properly';

const btn = document.querySelector('button');
function random(number) {
  return Math.floor(Math.random() * (number + 1));
}
btn.onclick = function() {
  const rndCol = `rgb(${random(255)},${random(255)},${random(255)})`;
  document.body.style.backgroundColor = rndCol;
};

// let button = document.querySelector('button');
// button.style.marginRight = '10px';

//make a list from an arry \/
array.from(document.querySelectorAll('h2'))