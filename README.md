# webpack-案例
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
        - loader:["test-loader", "css-loader",'less-loader']//模块是先右至左传入loader，经每个loader解析，解析后的source代码传入下个loader
      - }
    - ]
  - }
- }

 ### test-loader.js
  - module.exports=function(source){
  - // sourcer webpack运行时传入的源代码
  -   console.log(source)
  - //创建一个style标签并且内容innerText=${JSON.stringify(source)} 之后添加到head中，最后在retrun出来，这个也是style-loader的原理：注有关css的文件build都需要相对的loader外，style-loader && css-loader是必须的
  -   let script=(`
       - let style=document.createElement("style");
       - style.innerText=${JSON.stringify(source)}
       - document.head.appendChild(style)
  - `);
  -   return script //this.callback(script)
  - }
