var webpack = require('webpack');
var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    open: true, // to open the local server in browser
    contentBase: __dirname + 'src/',
    hot: true
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
        test: [/\.scss$/, /\.sass$/],
        include : APP_DIR,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test : /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
              name: '[name].[ext]'
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {from: 'src/images/favicon.png', to: 'images'}
    ])
  ]
};

module.exports = config;
