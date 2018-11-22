const CleanPlugin = require('clean-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname,'build'),
    library: 'react-notifiable',
  },
  resolve: {
    extensions: ['.ts','.tsx','.js','.jsx']
  },
  module: {
    rules: [
       {
         test: /\.(tsx|ts)?$/,
         use: 'awesome-typescript-loader',
         exclude: '/node_modules'
       }
    ]
  },
  plugins: [
    new CleanPlugin(['build']),
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    })
  ]
}
