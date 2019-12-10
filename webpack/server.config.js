const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { join } = require('path');
const { version } = require('../package.json');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : '',
  entry: join(__dirname, '..', 'server', 'app.tsx'),
  target: 'node',
  output: {
    filename: 'server.bundle.js',
    path: join(__dirname, '..', 'build', version)
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.styl']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(styl|css)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
    })
  ]
};
