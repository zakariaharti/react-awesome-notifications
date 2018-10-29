const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common,{
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /\.(ttf,woff)$/,
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
