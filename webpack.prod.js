const merge = require('webpack-merge');
const {
	browserConfigCommon,
	serverConfigCommon,
} = require('./webpack.common.js');

const browserConfig = merge.smart(browserConfigCommon, {
	mode: 'production',
});

const serverConfig = merge.smart(browserConfigCommon, {
	mode: 'production',
});

module.exports = [browserConfig, serverConfig];
