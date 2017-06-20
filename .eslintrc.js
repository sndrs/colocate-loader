module.exports = {
	extends: ['airbnb-base', 'prettier'],
	plugins: ['import', 'prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				trailingComma: 'es5',
				bracketSpacing: true,
				useTabs: true,
			},
		],
	},
};
