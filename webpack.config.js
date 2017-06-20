const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'dist/bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.cmp\.html$/,
				use: {
					loader: 'component-loader',
					options: {
						rules: [
							{
								test: /^style$/,
								loader: 'styletron-loader',
							},
							{
								test: /^script$/,
								use: [{ loader: 'babel-loader' }],
							},
						],
					},
				},
			},
		],
	},
	resolveLoader: {
		modules: [path.resolve(__dirname, 'loader'), 'node_modules'],
	},
	resolve: {
		extensions: ['*', '.js', '.json', '.cmp.html'],
	},
};
