var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path')

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  devServer: { inline: true },
  entry: "./js/client.js",
  output: {
    path: __dirname + "/src/",
    filename: "./js/client.min.js"
  },
  module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
      }
    }
  ]
},
  plugins: debug ? [] : [
    new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false }),
  ],
};
