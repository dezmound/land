const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { join } = require('path');
const { version } = require('../package.json');
const { DefinePlugin } = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

module.exports = (isClient = false) => ({
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : '',
  output: {
    path: join(__dirname, '..', 'build', version)
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.styl', '.css']
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
              hmr: isDev
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDev ? '[local]' : '[hash:base64]'
              }
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
    }),
    new DefinePlugin({
      __isClient__: String(isClient),
      __isServer__: String(!isClient)
    })
  ]
});
