var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// var entries = utils.getEntries('./src/module/**/*.js')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'rec.html',
      template: './src/module/rec/rec.html',
      inject: true,
      chunks: ['rec']
    }),
    new HtmlWebpackPlugin({
      filename: 'stats.html',
      template: './src/module/stats/stats.html',
      inject: true,
      chunks: ['stats']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/module/login/login.html',
      inject: true,
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      filename: 'stu.html',
      template: './src/module/stu/stu.html',
      inject: true,
      chunks: ['stu']
    }),
    new HtmlWebpackPlugin({
      filename: 'act.html',
      template: './src/module/act/act.html',
      inject: true,
      chunks: ['act']
    }),
    new HtmlWebpackPlugin({
      filename: 'company.html',
      template: './src/module/company/company.html',
      inject: true,
      chunks: ['company']
    }),
    new HtmlWebpackPlugin({
      filename: 'ad.html',
      template: './src/module/ad/ad.html',
      inject: true,
      chunks: ['ad']
    }),
  ]
})

// var entries = utils.getEntries('./src/module/**/*.js')
// Object.keys(entries).forEach((name) => {
//   var plugin = new HtmlWebpackPlugin({
//     filename: name + '.html',
//     template: './src/module/' + name + '' + name + '.html',
//     inject: true,
//     chunks: [name]
//   })
//   webpackConfig.plugins.push(plugin);
// })
