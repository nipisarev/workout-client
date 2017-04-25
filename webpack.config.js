let path = require('path');
let webpack = require('webpack');
let production = process.env.NODE_ENV === 'production';
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env = {}) {
  const isProd = !!env.prod;
  const buildType = env.type;
  const devServer = !!env.devServer;

  console.log(isProd ? 'Production build' : 'Development build');
  console.log('Build type: ', buildType);

  const plugins = [
    new CleanWebpackPlugin(['dist/' + buildType], {
      root: path.resolve(__dirname, './'),
      verbose: true,
      dry: false
    })
  ];

  if (isProd && buildType !== 'server') {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: false,
        compress: {
          warnings: false, // Suppress uglification warnings
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true
        }
      }));
  }

  let entry, target, rules = [];

  if (buildType === 'server') {
    entry = {server: ['./server/index.js']};
    target = 'node';

    rules = rules.concat([{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
      }
    }]);
  } else {
    entry = {client: ['babel-polyfill', './client/index.js']};
    target = 'web';

    rules = rules.concat([{
      test: /\.jsx?$/,
      exclude: /(pages|node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.jsx?$/,
      include: /pages/,
      exclude: /node_modules/,
      use: [
        {loader: 'bundle-loader', options: {lazy: true}},
        {loader: 'babel-loader'}
      ]
    }]);
  }

  rules = rules.concat([{
    test: /.(png|jpe?g|woff(2)?|eot|ttf|svg|gif)$/,
    use: {loader: 'url-loader?limit=100000'}
  }, {
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
          sourceMap: !isProd,
          getLocalIdent: (context, localIndentName, localName) => {
            return localName;
          },
          importLoaders: 1,
          localIdentName: '[hash:base64]-[name]-[local]'
        }
      },
      {
        loader: 'sass-loader',
        options: {
          import: true,
          sourceMap: !isProd,
          getLocalIdent: (context, localIndentName, localName) => {
            return localName;
          }
        }
      },
      {
        loader: 'postcss-loader'
      },
    ]
  }]);

  let config = {
    context: path.join(__dirname, '/src'),
    entry,
    output: {
      path: path.join(__dirname, '/dist/' + buildType),
      filename: 'index.js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: devServer ? 'http://localhost:8080/static/' : '/static/',
    },
    devServer: {
      contentBase: path.resolve(__dirname, '/dist/' + buildType),
      inline: !isProd
    },
    stats: {
      colors: true,
      reasons: true,
      hash: false,
      modulesSort: 'name'
    },
    cache: true,
    module: {
      rules
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
      new ExtractTextPlugin('/css/app.css')
    ],
    target
  };

  if (!isProd) {
    config.devtool = 'source-map';
  }

  return config;
};
