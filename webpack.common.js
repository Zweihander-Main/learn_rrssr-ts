const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

var browserConfigCommon = {
	entry: './src/browser/index.tsx',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		chunkFilename: '[name].chunk.js',
		publicPath: '/',
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			__isBrowser__: true,
		}),
		new CleanWebpackPlugin(),
	],
};

var serverConfigCommon = {
	entry: './src/server/index.tsx',
	target: 'node',
	externals: [nodeExternals()],
	output: {
		path: __dirname,
		filename: 'server.js',
		publicPath: '/',
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			__isBrowser__: false,
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['server.js', 'server.js.map'],
		}),
	],
};

module.exports.browserConfigCommon = browserConfigCommon;
module.exports.serverConfigCommon = serverConfigCommon;
