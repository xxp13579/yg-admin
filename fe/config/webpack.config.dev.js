const path = require('path') // Node.js中的模块
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // 模式
  mode: 'development',
  // 入口
  entry: './src/app.js', // Node.js中路径如果没写./、../之类的话，他会直接去node_modules中去找，写./才会在当前文件夹中寻找
  // 出口
  output: {
    path: path.resolve(__dirname, '../dev'), // 路径必须是绝对路径
    filename: 'app.js'
  },
  // 做webpack-dev-server的配置
  devServer: {
    contentBase: path.resolve(__dirname, '../dev'), // 服务器启动的时候指向的根目录
    port: 8000,
    host: '10.60.15.15', // 修改域名
    // 代理
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  // loader
  module: {
    rules: [
      {
        test: /\.art$/,
        loader: "art-template-loader"
      },
      {
        test: /\.(scss|css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  // 插件
  plugins: [
    // 打包html+css+js
    new htmlWebpackPlugin({
      template: './index.html', // 模板
      filename: 'index.html', // 打包之后的目标文件夹中的目标文件
    }),
    // 拷贝 public source
    new copyWebpackPlugin([{ // 放在数组中
      from: './public',
      to: './public'
    }])
  ]
}