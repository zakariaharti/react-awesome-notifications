const CleanPlugin = require('clean-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  devtool: 'hidden-source-map',
  entry: {
    app: './src/index.tsx'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname,'build'),
    library: 'react-awesome-notifications',
    libraryTarget: 'commonjs'
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
       },
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
  },
  plugins: [
    new CleanPlugin(['build']),
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    })
  ]
}
