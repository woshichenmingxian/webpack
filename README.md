# webpack
## 安装
 ### 需要安装 webpack webpack-cli 
 - 项目文件夹 npm init -y; // 初始化npm项目配置
 - npm install webpack webpack-cli  -D; // -D会进入package.json中的devDependencies(开发配置),默认是dependencies(生成)
   #### 插件plugins
 - npm install html-webpack-plugin -D; // webapck插件 自动产出html
 - npm install clean-webpack-plugin -D; // 清空目录 打包时清除先前的文件
 - npm install uglifyjs-webpack-plugin -D; // 打包时进行js文件压缩
   #### loader
 - npm install css-loader  -D; // 处理css中的img路径...
 - npm install style-loader -D; // 生成style插入head 
 
