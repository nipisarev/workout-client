var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "/src"),
  devtool: debug ? "source-map" : null,
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
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "file-loader?name=[path]/[name].[ext]"
      },
      {
        test: /(\.scss|\.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
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
                // localIdentName: '[hash:base64]-[name]-[local]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [
                    require('postcss-cssnext')
                  ];
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                import: true,
                sourceMap: debug,
                // data: '@import "' + path.resolve(__dirname, 'src/scss/main/theme.css') + '";',
                getLocalIdent: (context, localIdentName, localName, options) => {
                  return localName
                }
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("/css/app.css")
  ],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "/js/bundle.js"
  }
};
