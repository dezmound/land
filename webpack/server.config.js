const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { join } = require('path');

const isDev = process.env.NODE_ENV === 'development';

const baseConfig = require('./base.config.js')(false);

baseConfig.module.rules[1].use.unshift({
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: isDev
  }
});
baseConfig.plugins.unshift(
  new MiniCssExtractPlugin({
    filename: isDev ? '[name].css' : '[name].css',
    chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
  })
);

baseConfig.output.filename = 'server.bundle.js';

module.exports = {
  ...baseConfig,
  entry: join(__dirname, '..', 'server', 'app.tsx'),
  target: 'node'
};
