const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  ignoreWarnings: [
    /Deprecation/  // This will filter warnings containing 'Deprecation'
  ],
  entry: './app/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        // This single rule replaces both ts-loader and babel-loader
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',  // Handles both TSX and JSX
          target: 'es2015',
          tsconfigRaw: require('./tsconfig.json')
        },
        exclude: /node_modules/,
      },
      // Your existing SCSS rule
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', "sass-loader",
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            },
          }
        ],
        exclude: /node_modules/,
      },
      // Your existing assets rule
      {
        test: /\.(jpg|jpeg|png|ttf|svg|gif)$/,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
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
          from: path.resolve(__dirname, 'node_modules/react-devtools'),
          to: 'react-devtools',
          noErrorOnMissing: true
        },
      ],
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.gif', '.png', '.svg'],
  },
};

