const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = '../public';

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(outputPath),
    filename: 'main.js'
  },

  devServer: {
    historyApiFallback: true,
    proxy: {
      '/graphql': 'http://localhost:5000'
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
    new CleanWebpackPlugin([outputPath], { allowExternal: true })
  ]
};
