const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  watch: true,
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../views-src/login.html',
      template: path.resolve(__dirname, '../views/login.html'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: '../views-src/index.html',
      template: path.resolve(__dirname, '../views/index.html'),
      inject: false
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      files: ['../views-src/login.html'],
      append: true,
      assets: ['/login.js'],
      publicPath: '/',
      jsExtensions: ['.js']
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      files: ['../views-src/index.html'],
      append: true,
      assets: ['/main.js'],
      publicPath: '/',
      jsExtensions: ['.js']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
      // filename: devMode ? '[name].css' : '[name].[hash].css',
      // chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ]
}
