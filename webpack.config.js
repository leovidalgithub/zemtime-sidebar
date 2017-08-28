const webpack = require('webpack')
const path = require('path')

const config = {
  context: path.join(__dirname, 'src'),
  devtool: 'inline-source-map',
  entry: './controller.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        loader: ['ngtemplate-loader', 'html-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: ['url-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    })
  ],
  resolve: {
    alias: {
      angular: path.resolve(path.join(__dirname, 'node_modules', 'angular'))
    }
  }
}

module.exports = config