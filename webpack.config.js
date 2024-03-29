const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkgInfo = require('./package.json')

module.exports = {
  entry: './index.tsx',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'gadget.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    libraryExport: 'default',
    library: `${pkgInfo.name}-[name]`,
    chunkLoadingGlobal: '',
  },
  devServer: {},
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: pkgInfo.name,
      meta: {
        id: pkgInfo.id,
        name: pkgInfo.nickname,
        icon: pkgInfo.icon,
        version: pkgInfo.version,
        description: pkgInfo.description,
        homepage: pkgInfo.homepage,
        author: pkgInfo.author,
        keywords: pkgInfo.keywords,
        email: pkgInfo.bugs.email,
        bugReport: pkgInfo.bugs.url
      },
      filename: 'index.html',
      template: 'index.html',
    })
  ]
}
