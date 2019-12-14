const { join } = require('path');

const baseConfig = require('./base.config.js')(true);

baseConfig.output.filename = 'client.bundle.js';

module.exports = {
  ...baseConfig,
  entry: join(__dirname, '..', 'client', 'index.tsx'),
  target: 'web'
};
