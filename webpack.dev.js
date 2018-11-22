const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common,{
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './buold'
  },
  module: {
    rules: [
      {
        test: /\.(ttf,woff)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
});
