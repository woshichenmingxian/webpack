import Mix from './js/index';
import './css/index.css';

let test=new Mix();
let ele=document.querySelector('.app');
ele.addEventListener('click',function(e){
  test.eat(e);
},true)