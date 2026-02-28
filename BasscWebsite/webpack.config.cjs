const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, { mode = 'development' }) => ({
  mode,
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: mode === 'production' ? 'assets/[name].[contenthash:8].js' : 'assets/[name].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-react', { runtime: 'automatic' }]],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL || ''),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: 'body',
    }),
    ...(mode === 'production'
      ? [new CopyWebpackPlugin({ patterns: [{ from: 'public', to: '.', noErrorOnMissing: true }] })]
      : []),
  ],
  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    port: 5173,
    hot: true,
    historyApiFallback: true,
  },
  devtool: mode === 'development' ? 'eval-cheap-module-source-map' : undefined,
});
