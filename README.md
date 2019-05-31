# webpack
## webpack原理
### webpack核心概念
- entry 一个可执行模块或库的入口文件。
- chunk 多个文件组成的一个代码块，例如把一个可执行模块和它所有依赖的模块组合和一个 chunk 这体现了webpack的打包机制。
- loader 文件转换器，例如把es6转换为es5，scss转换为css。
- plugin 插件，用于扩展webpack的功能，在webpack构建生命周期的节点上加入扩展hook为webpack加入功能。
### webpack构建流程
#### 初始化配置参数 -> 绑定事件钩子回调 -> 确定Entry逐一遍历 -> 使用loader编译文件 -> 输出文件
- 从启动webpack构建到输出结果经历了一系列过程，它们是：
- 解析webpack配置参数，合并从shell传入和webpack.config.js文件里配置的参数，生产最后的配置结果。
- 注册所有配置的插件，好让插件监听webpack构建生命周期的事件节点，以做出对应的反应。
- 从配置的entry入口文件开始解析文件构建AST语法树，找出每个文件所依赖的文件，递归下去。
- 在解析文件递归的过程中根据文件类型和loader配置找出合适的loader用来对文件进行转换。
- 递归完后得到每个文件的最终结果，根据entry配置生成代码块chunk。
- 输出所有chunk到文件系统。
- 在构建生命周期中有一系列插件在合适的时机做了合适的事情，比如UglifyJsPlugin会在loader转换递归完后对结果再使用UglifyJs转换递归完后对结果再使用UglifyJs压缩覆盖之前的结果。

## webpack-案例
## 安装--案例简单安装，
 ### 需要安装 webpack webpack-cli 
 - 项目文件夹 npm init -y; // 初始化npm项目配置
 - npm install webpack webpack-cli  -D; // -D会进入package.json中的devDependencies(开发配置),默认是dependencies(生产)
   #### 插件 plugins
 - npm install html-webpack-plugin -D; // webapck插件 自动产出html
 - npm install clean-webpack-plugin -D; // 清空目录 打包时清除先前的文件
 - npm install uglifyjs-webpack-plugin -D; // 打包时进行js文件压缩
   #### 解析器 loader根据需求进行安装 上loader文件夹有仿写简单的loader 说明后方
 - npm install css-loader  -D; // 处理css
 - npm install style-loader -D; // 生成style插入head 
 
## package.json
 - "scripts": {
     - "dev": "webpack-dev-server --mode development",//webpack-dev-server也需要安装
     - "build": "webpack --mode development" //--注入变量 
 - },
 
## webpack.config.js 配置
 ### entry(入口) 
   ### entry：'' || {} || [] 
 - entry:{
 -   index:'path',//多入口
 -   mian:'path',//多入口
 -   echart:'echarts',//公共包
 - }
 ### output(出口)
 - output:{
 -   filename:'[name].[hash:6].js',// 文件后接的6位hash值
 -   path:path.join(__dirname,'dist') // 只能是绝对路径 
 - }
 ### module(配置规则...)
 - module:{
 - // 解析文件规则
 -   rules:[
 -     {
 -       test:/\.css/,
 -       //css-loader 处理css中img路径... style-loader 生成style插入head
 -       loader:["style-loader","css-loader"],//顺序很重要，理由见下(loader仿写栏)
 -     },  
 -  ]
 - },
 ### plugins(weboack 插件)
 - plugins:[
 -   //注入全局Echart变量
 -   new webpack.ProvidePlugin({
 -     'Echart':'echarts'
 -   }),
    
 -   //自动产出html
 -   new HtmlWepackPlugin({
 -     title: 'Custom template one-1',//可以设定html title 在html中<title><%= htmlWebpackPlugin.options.title %></title>使用类似于ejs渲染模板
 -     template:'./index.html',//打包的对象模板HTML
 -    filename:'one-1.html',//打包后的html的名称
 -     hash:true,//会在引入的js文件插入hash值避免缓存
 -     chunks:['index','echart'],//默认是全部都引入 对应入口(entry)中的key值  
 -     minify:{
 -       removeAttributeQuotes:true
 -     }
 -   }),  
 -   //自动产出html
 -   new HtmlWepackPlugin({
 -     title: 'Custom template second-2',//可以设定html title 在html中<title><%= htmlWebpackPlugin.options.title %></title>使用类似于ejs渲染模板
 -      template:'./index.html',//打包的对象模板HTML
 -      filename:'second-2.html',//打包后的html的名称
 -     hash:true,//会在引入的js文件插入hash值避免缓存
 -     chunks:['mian','echart'],//对应入口(entry)中的key值
 -     minify:{
 -       removeAttributeQuotes:true
 -     }
 -   }),
    
 -  //清除目录 打包前先前的文件
 -   new cleanWebpackPlugin(),//默认配置是删除全部文件(非静态文件)
    
 -   //打包时进行js文件压缩
 -   new uglifyjsPlugin({
 -     // exclude: /.js$/,  //排除的文件，用正则表示
 -     cache: true,   //是否启用缓存
 -     sourceMap: false, //每块代码资源地图
 -     parallel: true, //多通道并行处理
 -     extractComments: false,
 -     uglifyOptions: {
 -       compress: {
 -         unused: true, //是否去掉未关联的函数和变量
 -         warnings: false,//在UglifyJs删除没有用到的代码时不输出警告
 -         drop_console: false, //是否屏蔽掉控制台输出
 -         reduce_vars: true,// 提取出出现多次但是没有定义成变量去引用的静态值
 -       },
 -       output: {
 -         beautify: false,// 最紧凑的输出
 -         comments: false,// 删除所有的注释
 -       }
 -     }
 -   }),
 - ], 
 ### devServer(开发环境配置)
 - //开发服务
 - devServer:{
 -   contentBase:'./dist',//读取文件地址
 -   host:"localhost",//域名
 -   port:"3000",//端口
 -   compress:true,//启用gzip压缩
 - }
 
 ## 仿写loader
   ### 说明 (代码拆分解析成需要的代码结构)
   - loader文件也是作为node一个模块，内容是个函数，必须返回Buffer || string，可以直接return 或者在模块内通过：this.async(null,source) || this.callback(null,source) 回调
   
  ### webpack.config.js
  - module.exports={
  - entry:{
    - index:"./src/main.js"
  - },
  - output:{
    - filename:'[name].[hash:4].js',
    - path:path.join(__dirname,'dist')
  - },
  - //配置查找loader的目录
  - resolveLoader:{
    - modules:[
      - 'node_modules',
      - path.resolve(__dirname,'loaders') //指定test-loader的文件夹
    - ]
  - },
  - module:{
    - rules:[
      - {
        - test:/\.less$/,
        - loader:["style-loader", "css-loader",'test-loader']//模块是先右至左传入loader，经每个loader解析，解析后的source代码传入下个loader
      - }
    - ]
  - }
- }

 ### test-loader.js
 - let less=require('less');
 - //source为上个loader解析后的代码，如此loader为第一个解析那source是项目的源码
- module.exports=function(source){
  - less.render(source,(e,res)=>{
  - console.log(e)
  - this.callback(e,res.css) //return res.css
  - })
  - }
