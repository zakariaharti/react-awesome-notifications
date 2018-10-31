const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname,'dist'),
    library: 'ReactAwesomeNotification'
  },
  publicPath: '/',
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
    new CleanPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'src/index.html')
    }),
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    })
  ],
  externals: {
     react: {
       commonjs: 'react',
       commonjs2: 'react',
       amd: 'react',
       root: '_'
     },
     'react-dom': {
       commonjs: 'react-dom',
       commonjs2: 'react-dom',
       amd: 'react',
       root: '_'
     }
   }
}
