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
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { 
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }, {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: ['url-loader', 'image-webpack-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/images/favicon.png',
      title: 'Hangman App'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map'
}