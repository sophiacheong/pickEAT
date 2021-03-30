const path = require('path');

const DIST_DIR = path.join(__dirname, '/client/src');
const SRC_DIR = path.join(__dirname, '/client');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  watch: true,
};
