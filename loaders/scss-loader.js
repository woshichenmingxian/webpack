let less=require('less');
module.exports=function(source){
  less.render(source,(e,res)=>{
    console.log(e)
  this.callback(e,res.css)
  })
  
  // return `source`
}