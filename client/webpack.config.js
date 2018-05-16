const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');

const outputPath = '../public';

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',

  entry: './src/index.js',

  output: {
    path: path.resolve(outputPath),
    filename: 'main.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },

      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/styles.css'),
    new CleanWebpackPlugin([outputPath], { allowExternal: true })
  ]
};

if (process.env.WEBPACK_SERVE) {
  module.exports.serve = {
    add: app => {
      app.use(convert(proxy('/graphql', { target: 'http://localhost:5000' })));
      app.use(convert(history()));
    }
  };
}
