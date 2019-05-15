import Chry from './js/second';
import './css/index.css';
let sb=new Chry();

let ele=document.querySelector('.second');
ele.addEventListener('click',function(e){
  sb.action(e.type);
},true)