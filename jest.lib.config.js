// jest.lib.config.js
const baseConfig = require('./jest.base.config');
module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects'],
  transform: {
    [`().+\\.js$`]: 'babel-jest',
    '^.+\\.(ts|js|html)$': 'jest-preset-angular/preprocessor.js',
  },
};
