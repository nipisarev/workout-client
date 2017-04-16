var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "/src"),
  devtool: debug ? "source-map" : false,
  entry: "./app.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.(jpe?g|png|gif|eot|woff|ttf|svg|woff2)$/,
        use: [
          {
            loader: "file-loader?name=[path]/[name].[ext]"
          },
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /(\.s?css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              import: true,
              sourceMap: debug,
              getLocalIdent: (context, localIdentName, localName, options) => {
                return localName
              },
              importLoaders: 1,
              localIdentName: '[hash:base64]-[name]-[local]'
            }
          },
          {
            loader: "sass-loader",
            options: {
              import: true,
              sourceMap: debug,
              getLocalIdent: (context, localIdentName, localName, options) => {
                return localName
              }
            }
          },
          {
            loader: 'postcss-loader'
          },
        ]

      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("/css/app.css")
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "",
    filename: "js/bundle.js"
  }
};