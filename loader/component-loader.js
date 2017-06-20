const loaderUtils = require('loader-utils');
const { normalizeUse, normalizeCondition } = require('webpack/lib/RuleSet');
const cheerio = require('cheerio');

const getBlockRequest = (block, path) =>
	`component-loader?block=${block}!${path}`;

const getBlockContent = (block, content) =>
	cheerio
		.load(content, {
			ignoreWhitespace: true,
			xmlMode: true,
		})(block)
		.map((i, _) => cheerio(_).html())
		.get()
		.join('\n');

const getLoadersForBlock = (block = '', rules = []) => {
	const rule = rules.find(_ => normalizeCondition(_.test)(block));
	if (!rule) return '';
	return (
		rule.loader ||
		normalizeUse(rule.use)
			.reverse()
			.map(_ => `${_.loader}${_.options ? `?${_.options}` : ''}`)
			.join('!')
	);
};

// const formatLoaderAsRequest = ;

module.exports = function loadComponent(content) {
	const callback = this.async();

	const options = loaderUtils.getOptions(this);

	if (options.block) {
		const blockContent = getBlockContent(options.block, content);
		callback(null, blockContent);
	} else {
		const rules = loaderUtils.getOptions(this).rules;

		const injectedDeps = cheerio
			.load(content, {
				ignoreWhitespace: true,
				xmlMode: true,
			})(`:root`)
			.map((i, block) => block.name)
			.get()
			.filter(block => block !== 'script')
			.map(
				block =>
					`var ${block} = require('!!${getLoadersForBlock(block, rules) ||
						'raw-loader'}!${getBlockRequest(block, this.resourcePath)}')`
			);

		// callback(
		// 	null,
		// 	`
		// 		${injectedDeps.join(';\n')};
		// 		${getBlockRequest('script', this.resourcePath)}
		// 	`
		// );

		this.loadModule(
			`!!${getLoadersForBlock('script', rules)}!${getBlockRequest(
				'script',
				this.resourcePath
			)}`,
			(err, source, sourceMap) => {
				const exportSrc = `
					${injectedDeps.join(';\n')};
					${source}
				`;
				callback(err, exportSrc, sourceMap);
			}
		);
	}
};

module.exports.pitch = function loadScript(
	remainingRequest,
	precedingRequest,
	data
) {
	const { block } = loaderUtils.getOptions(this);
	if (!block) {
		this.loaders.push(getLoadersForBlock('script', rules))
	}
};
