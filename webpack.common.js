const CleanPlugin = require('clean-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    app: './src/index.tsx'
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname,'build'),
    library: 'react-awesome-notifications'
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
    new CleanPlugin(['dist']),
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
