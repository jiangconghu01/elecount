// vue.config.js
var path = require('path')
var webpack = require('webpack')

// 获取开发模式
var envMode = process.env.NODE_ENV
console.log(envMode)
// 执行的哪一条 npm scripts 命令
var npmScriptsName = process.env.npm_lifecycle_event
// console.log(npmScriptsName);

// 设置端口号和接口地址
// var configObj = require('./build/base.config') // 引入项目配置文件
// var portObj = configObj.port // 端口号配置对象
// var apiUrlObj = configObj.apiUrl // 接口地址配置对象
// console.log(portObj);
// console.log(apiUrlObj);
// var port = portObj[npmScriptsName] // 端口号
// var apiUrl = apiUrlObj[npmScriptsName] // 接口地址
// console.log(port)
// console.log(apiUrl)

module.exports = {
  // 开发环境的配置
  devServer: {
    port: 9000, // 端口号
    open: true, //配置自动启动浏
    hot:true,
    proxy: {
        '/api': {
          target: 'http://galv.test.thingcom.com',
          changeOrigin: true,
          secure: false
        }
      },
    // 在浏览器页面上全屏显示报错信息的配置
    overlay: {
      // warnings: true, // 警告
      // errors: true //
      // 为了导出功能，不让它报错，否则没法运行
      warnings: false, // 警告
      errors: false // 错误
    }
  },
  // 生产环境的 source map。如果你不需要生产环境的source map，将其设置为 false 以加速生产环境的构建
  productionSourceMap: false,
  /*
    问题：
      You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.、
    解决方法：
      runtimeCompiler: true
    解释：
      https://blog.csdn.net/haochangdi123/article/details/80874981
  */
  runtimeCompiler: true,
  // webpack的配置
  configureWebpack: {
    // 设置模块如何被解析
    resolve: {
      // 创建 import 或 require 的别名，来确保模块引入变得更简单
      alias: {
        vendor: path.resolve(__dirname, 'src/vendor')
      }
    }
  }
}
