const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/index.js'),
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-bundle.js',
    publicPath: '/',
    chunkFilename: 'js/[id].[chunckhash].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    port: 9000,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jpg|jpeg|png|svg|gif|woff|ttf|eot|mp4|webp$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugins({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
};
