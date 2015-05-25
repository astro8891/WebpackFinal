var path = require('path');
var merge = require('./lib/merge');
var webpack = require('webpack');
var _ = require('lodash');

var TARGET = process.env.TARGET;

var ROOT_PATH = path.resolve(__dirname);

var common = {
	entry: [path.join(ROOT_PATH, 'app/main.jsx')],
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	output: {
		path: path.resolve(ROOT_PATH, 'build'),
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
			},
      {
      // test for both js and jsx
      test: /\.jsx?$/,
      // use babel loader
      loader: 'babel',
      // operate only on our app directory
      include: path.join(ROOT_PATH, 'app'),
    }
		]
	}
	};


var mergeConfig = merge.bind(null, common);

if(TARGET === 'build') {
  module.exports = mergeConfig({
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          include: path.join(ROOT_PATH, 'app'),
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // This has effect on the react lib size
          'NODE_ENV': JSON.stringify('production'),
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
      }),
    ],
  });
}

if (TARGET === 'dev') {
	module.exports = mergeConfig({
		entry: ['webpack/hot/dev-server'],
		module: {
			loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel'],
          include: path.join(ROOT_PATH, 'app'),
        }
      ]
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ],
  });
}