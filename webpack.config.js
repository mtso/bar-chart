const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let index = new HtmlWebpackPlugin({
  template: 'src/index.html',
  inject: 'body'
})

module.exports = [
  {
    entry: [
      path.resolve(__dirname, 'src/index')
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
        }
      ]
    },
    plugins: [
      index
    ]
  }
]
