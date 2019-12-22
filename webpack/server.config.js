const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { join } = require('path');

const baseConfig = require('./base.config.js')(false);

baseConfig.output.filename = 'server.bundle.js';

module.exports = {
  ...baseConfig,
  entry: join(__dirname, '..', 'server', 'app.tsx'),
  target: 'node'
};
