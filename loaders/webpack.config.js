let path=require('path')

module.exports={
  entry:{
    index:"./src/main.js"
  },
  output:{
    filename:'[name].[hash:4].js',
    path:path.join(__dirname,'dist')
  },
  //配置查找loader的目录
  resolveLoader:{
    modules:[
      'node_modules',
      path.resolve(__dirname,'loaders')
    ]
  },
  module:{
    rules:[
      // {
      //   test:/\.css$/,
      //   loader: ["style-loader", "css-loader"],
      // },
      // {
      //   test:/\.js$/,
      //   loader:"babel-loader",
      //   options:{
      //     presets:[["@babel/preset-env",{
      //       targets: {
      //         browsers: ['> 1%', 'last 2 versions']
      //       }
      //     }]]
      //   }
      // }
      {
        test:/\.js$/,
        loader:'log-loader'
      },
      {
        test:/\.less$/,
        loader:["style-loader", "css-loader",'scss-loader']
      }
    ]
  }
}