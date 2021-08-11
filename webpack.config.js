const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: path.resolve(__dirname, './node_modules/'),
        use: ["style-loader", "css-loader", "sass-loader"],
      }
    ]
  },
  devServer: {
    port: 8080,
    publicPath: '/build',//'/build/',
    // contentBase: '/build/',
    proxy: {
      '/': 'http://localhost:3000',
      // '/build': 'http://localhost:3000',
      // '/': 'http://localhost:3000',
    },
    compress: true,
    hot: true,
  },
}