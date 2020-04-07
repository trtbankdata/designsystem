const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  const config = {
    mode: 'production',
    entry: {
      'resize-observer-polyfill': './libs/angular/src/lib/polyfills/resize-observer-polyfill.js',
      'resize-observer-polyfill-loader': './libs/angular/src/lib/polyfills/resize-observer-polyfill-loader',
      'intersection-observer-polyfill': './libs/angular/src/lib/polyfills/intersection-observer-polyfill.js',
      'intersection-observer-polyfill-loader': './libs/angular/src/lib/polyfills/intersection-observer-polyfill-loader',
    },
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'libs/angular/src/lib/polyfills/'),
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: './libs/angular/src/lib/polyfills/resize-observer-polyfill-loader.js' },
        { from: './libs/angular/src/lib/polyfills/intersection-observer-polyfill-loader.js' }
      ]),
    ],
  };

  return config;
};
