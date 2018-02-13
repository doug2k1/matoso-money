const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = '../public';

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(outputPath),
    filename: 'main.js'
  },

  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/graphql': 'http://localhost:5000'
    }
  },
  resolve: {
    alias: {
      Styles: path.resolve('src/styles')
    }
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
    new HtmlPlugin({ template: 'index.html' }),
    new CleanWebpackPlugin([outputPath], { allowExternal: true })
  ]
};
