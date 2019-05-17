/**
 * 必须要有返回值或者使用this.callback(null,...) ...为返回值
 * @return string || Buffer 必须要有返回值
 * @param source 源资源代码
 *  */ 
const path =require('path');
module.exports=function(source){
  // console.log(source)
  // let callback=this.async();
  // setTimeout(() => {
  //   callback(null,source)
  // }, 1000);//异步写法 每个模块需要等待1s
  this.callback(null,source)
  // return source
}