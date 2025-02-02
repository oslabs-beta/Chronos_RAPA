const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif|mov|ico)$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',
    }),
    new CopyPlugin({  
      patterns: [  
          { from: './client/assets/favicon.ico', to: 'favicon.ico' }  
      ],  
  }),  
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};
