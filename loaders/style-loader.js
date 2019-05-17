//创建style插入head
//返回脚本直接运行
module.exports=function(source){
  console.log(source)
  let script=(`
  let style=document.createElement("style");
  style.innerText=${JSON.stringify(source)}
  document.head.appendChild(style)
  `);
  
  return script
}