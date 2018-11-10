const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common,{
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[hash].[ext]'
            }
          }
        ]
      }
    ]
  }
});
