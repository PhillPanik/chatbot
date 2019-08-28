// Import Dependencies
const path = require('path')

module.exports = {
  target: 'web',
  entry: {
    chatbot: path.join(__dirname, 'views', 'webpack', 'src', 'chatbot.jsx')
  },
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader', // creates style nodes from JS strings
        'css-loader', // translates CSS into CommonJS
        'sass-loader' // compiles Sass to CSS
      ]
    }, {
      test: /\.css$/i,
      use: [
        'style-loader', // creates style nodes from JS strings
        'css-loader' // translates CSS into CommonJS
      ]
    }]
  },
  optimization: {
    minimize: true
  },
  /* watch: true, */
  mode: 'development',
  devtool: 'source-map' // Remove after development
}