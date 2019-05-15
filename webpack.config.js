let path = require('path'); //node模块 解析路径
let HtmlWepackPlugin = require('html-webpack-plugin'); //webapck插件 自动产出html
let cleanWebpackPlugin = require('clean-webpack-plugin'); //清除目录 打包前先前的文件
let webpack = require('webpack');
let uglifyjsPlugin = require('uglifyjs-webpack-plugin'); //打包时进行js文件压缩
let utils = require('util');

module.exports = {
  //多入口 会生成chunk，最后进入系统中Asserts
  entry: {
    index: './src/main.js',
    mian: './src/second-main.js',
    echart: 'echarts'
  },
  //一个出口
  output: {
    filename: '[name].[hash:6].js', //文件后接的6位hash值
    path: path.join(__dirname, 'dist') //只能是绝对路径
  },
  module: {
    rules: [{
        test: /\.css/,
        //css-loader 处理路径 style-loader 生成style插入head
        loader: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss/,
        //css-loader 处理路径 style-loader 生成style插入head
        loader: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        //file-loader解析图片地址，吧图片从源位置拷贝到目标位置并且修改原引用地址
        //可以出来任何二进制文件 
        test: /\.(png|jpg|jpeg|svg|git|bmp)/,
        // loader:'file-loader'
        // use可以设定配置
        // use: {
        // loader:'file-loader',
        loader: 'url-loader', //图片较小的时候，直接打包成base64字符串内嵌网页中
        //参数
        options: {
          // limit: 100000, //9K url-loader搭配
          // name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          //指定拷贝文件的输出目录
          outputPath: '/images'
        }

        // }
      },
      {
        //解析html中的src HtmlWebpackPlugin 中配置的 title 不能成功替换 template html 中的
        test: /\.html/,
        loader: 'html-loader'
        // loader:'html-withimg-loader'
      }
    ]
  },

  plugins: [
    //注入全局Echart变量
    new webpack.ProvidePlugin({
      'Echart': 'echarts'
    }),

    //自动产出html
    new HtmlWepackPlugin({
      title: 'Custom template one-1', //可以设定html title 在html中<title><%= htmlWebpackPlugin.options.title %></title>使用类似于ejs渲染模板
      template: './index.html', //打包的对象模板HTML
      filename: 'one-1.html', //打包后的html的名称
      hash: true, //会在引入的js文件插入hash值避免缓存
      chunks: ['index', 'echart'], //默认是全部都引入 对应入口(entry)中的key值  
      minify: {
        removeAttributeQuotes: true
      }
    }),

    //自动产出html
    new HtmlWepackPlugin({
      title: 'Custom template second-2', //可以设定html title 在html中<title><%= htmlWebpackPlugin.options.title %></title>使用类似于ejs渲染模板
      template: './index.html', //打包的对象模板HTML
      filename: 'second-2.html', //打包后的html的名称
      hash: true, //会在引入的js文件插入hash值避免缓存
      chunks: ['mian', 'echart'], //对应入口(entry)中的key值
      minify: {
        removeAttributeQuotes: true
      }
    }),

    //清除目录 打包前先前的文件
    new cleanWebpackPlugin(), //默认配置是删除全部文件(非静态文件)

    //打包时进行js文件压缩
    new uglifyjsPlugin({
      // exclude: /.js$/,  //排除的文件，用正则表示
      cache: true, //是否启用缓存
      sourceMap: false, //每块代码资源地图
      parallel: true, //多通道并行处理
      extractComments: false,
      uglifyOptions: {
        compress: {
          unused: true, //是否去掉未关联的函数和变量
          warnings: false, //在UglifyJs删除没有用到的代码时不输出警告
          drop_console: false, //是否屏蔽掉控制台输出
          reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
        },
        output: {
          beautify: false, // 最紧凑的输出
          comments: false, // 删除所有的注释
        }
      }
    }),
  ],
  //开发服务
  devServer: {
    contentBase: './dist',
    host: "localhost",
    port: "3000",
    compress: true, //启用gzip压缩
  }
}