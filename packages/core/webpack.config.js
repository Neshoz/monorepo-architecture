const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src', 'index.tsx'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8000,
    hot: true,
    historyApiFallback: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, 
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/i,
        loader: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
};