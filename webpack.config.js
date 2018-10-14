var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    open: true, // to open the local server in browser
    contentBase: __dirname + '/src/client',
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
        test : /\.css?/,
        loader : 'style-loader!css-loader'
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
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
