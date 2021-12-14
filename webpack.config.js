const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugn = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: 'https://comunidad-de-programadores.github.io/team-react-53-comfeco/',
    chunkFilename: 'js/[id].[chunkhash].js',
  },
  optimization: {
    minimizer: [new TerserJSPlugn(), new OptimizeCSSAssetsPlugin()],
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.jpg|jpeg|png|svg|gif|woff|woff2|ttf|eot|mp4|webp$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: '[hash].[ext]',
            outputPath: 'assets',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./modules-manifest.json'),
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, 'dist/js/*.dll.js'),
      outputPath: 'js',
      publicPath: 'https://comunidad-de-programadores.github.io/team-react-53-comfeco/js',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/app.**'],
    }),
  ],
};
