// eslint-disable-next-line no-undef
const path = require('path')

// eslint-disable-next-line no-undef
module.exports = {
	mode: 'development',
	entry: {
		index: './scripts/pages/index.js', 
	},
	output: {
		// eslint-disable-next-line no-undef
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	watch: true,
}