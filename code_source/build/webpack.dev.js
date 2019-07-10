const webpack = require('webpack')
const path = require('path')

const baseConfig = require('./webpack.base')

const merge = require('webpack-merge')


// 获取本机的ip地址

const interfaces = require('os').networkInterfaces() // 在开发环境中获取局域网中的本机iP地址
let IPAdress = ''
for(var devName in interfaces){  
  var iface = interfaces[devName];  
  for (var i=0; i < iface.length; i++) {  
    var alias = iface[i];  
    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {  
      IPAdress = alias.address;  
    }  
  }  
}

module.exports = merge.smart(baseConfig, {
  mode: "development",
  devtool:"cheap-module-eval-source-map",
  devServer: {
    open: true,
    host: IPAdress,
    hot: true,
    port: 8086
  }
})
