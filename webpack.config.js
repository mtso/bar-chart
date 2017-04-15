const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let index = new HtmlWebpackPlugin({
  template: 'src/index.html',
  inject: 'body'
})

let transferCss = new ExtractTextPlugin({
  filename: 'style.css',
  disable: false,
  allChunks: true,
})

module.exports = [
  {
    entry: [
      path.resolve(__dirname, 'src/index'),
      path.resolve(__dirname, 'src/style.css')
    ],
    resolve: {
      extensions: ['.json', '.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.s?[ac]ss$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        }
      ]
    },
    plugins: [
      index,
      transferCss
    ]
  }
]
