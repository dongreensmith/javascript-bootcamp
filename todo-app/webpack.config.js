const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: { 
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: ["transform-object-rest-spread"]
        }
      }
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/images/favicon.png'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map'
}