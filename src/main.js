import Mix from './js/index';
import './css/index.css';
import './css/index.scss'
let src = require('./image/test.jpeg')


let test = new Mix();

let img = new Image();
img.src = src;

let ele = document.querySelector('.app');
ele.addEventListener('click', function (e) {
  test.eat(e);

  // ele.style.backgroundImage=src
  document.body.appendChild(img)
}, true)