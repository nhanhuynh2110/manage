const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const prefix = path.resolve(__dirname, '../client')

module.exports = {
  entry: {
    // style: `${prefix}/style.js`,
    main: `${prefix}/main.js`,
    login: `${prefix}/login.js`
  },
  watch: true,
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    alias: {
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true,
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          // 'style-loader',
          'css-loader',
          'sass-loader' ]
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'image',
          publicPath: '../src/scss/lib/img'
        }
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ]
}