const merge = require('webpack-merge');
const {
	browserConfigCommon,
	serverConfigCommon,
} = require('./webpack.common.js');

const browserConfig = merge.smart(browserConfigCommon, {
	mode: 'development',
	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',
});

const serverConfig = merge.smart(serverConfigCommon, {
	mode: 'development',
	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',
});

module.exports = [browserConfig, serverConfig];
