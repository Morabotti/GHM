const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const directory = fs.realpathSync(process.cwd())
const resolve = (relativePath) => path.resolve(directory, relativePath)

module.exports = {
  mode: 'development',
  entry: {
    'js': [
      require.resolve('react-hot-loader/patch'),
      resolve('src/index.tsx')
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  output: {
    pathinfo: true,
    filename: '[name]/bundle.js',
    path: resolve('build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'import-glob'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve('./public/index.html'),
      chunks: ['js']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'public'),
      to: path.resolve(__dirname, 'build')
    }])
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      },
      '/static': {
        target: 'http://localhost:8080'
      }
    },
    port: 8082,
    contentBase: resolve('./build'),
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true
  }
}
