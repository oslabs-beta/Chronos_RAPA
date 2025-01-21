const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './app/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          // JavaScript version to compile to
          target: 'es2015',
        },
        // test: /\.(ts|tsx)$/,
        // loader: 'ts-loader',
        // exclude: /node_modules/,
      },
      // {
      //   test: /\.js$|jsx/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         presets: ['@babel/preset-env', '@babel/preset-react'],
      //       },
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|png|ttf|svg|gif)$/,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true, // Enable minimization
    minimizer: [
      '...', // Include existing minimizers like Terser for JS
      new CssMinimizerPlugin(), // Add CSS minimizer
    ],
  },
  mode: 'development',
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    static: './app',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'node_modules/react-devtools'), // Path to the React DevTools directory in node_modules
          to: 'react-devtools', // Output directory in your webpack build
        },
      ],
    }),
  ],
  ignoreWarnings: [
    {
      module: /@emotion\/use-insertion-effect-with-fallbacks/,
    },
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.gif', '.png', '.svg'],
  },
};
