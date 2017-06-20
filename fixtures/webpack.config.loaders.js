const path = require('path');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
	entry: './collocated',
	context: __dirname,
	output: {
		path: `${rootDir}/dist`,
	},
	module: {
		rules: [
			{
				test: /.html$/,
				use: {
					loader: 'collocation-loader',
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
		modules: [rootDir, 'node_modules'],
	},
	resolve: {
		extensions: ['.js', '.html'],
	},
};
