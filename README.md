# webpack
## 安装
 ### 需要安装 webpack webpack-cli 
 - 项目文件夹 npm init -y; // 初始化npm项目配置
 - npm install webpack webpack-cli  -D; // -D会进入package.json中的devDependencies(开发配置),默认是dependencies(生产)
   #### 插件 plugins
 - npm install html-webpack-plugin -D; // webapck插件 自动产出html
 - npm install clean-webpack-plugin -D; // 清空目录 打包时清除先前的文件
 - npm install uglifyjs-webpack-plugin -D; // 打包时进行js文件压缩
   #### 解析器 loader
 - npm install css-loader  -D; // 处理css中的img路径...
 - npm install style-loader -D; // 生成style插入head 
## webpack.config.js 配置
 ### entry(入口) 
   ### entry：'path' || {} || [] 
 - entry:{
 -   index:'path',//多入口
 -   mian:'path',//多入口
 -
 -}
 ### ouput(出口)
 ### module(配置规则...)
 ### plugins(weboack 插件)
 ### devServer(开发环境配置)
