const loaderUtils = require('loader-utils');

const elementRegex = element =>
    new RegExp(`<${element}>([\\s\\S]*)<\\/${element}>`, 'i');

module.exports = function(content) {
    const options = Object.assign(
        {},
        { el: 'script' },
        loaderUtils.getOptions(this)
    );

    const regex = elementRegex(options.el);

    const styleLoaders =
        (options.loaders &&
            options.loaders.style &&
            options.loaders.style.join('!')) ||
        '';
    const templateLoaders =
        (options.loaders &&
            options.loaders.template &&
            options.loaders.template.join('!')) ||
        '';

    const [, elSrc] = content.match(regex) || [];

    if (elSrc) {
        const injectedDeps = `
const style = require('!!${styleLoaders}!component-loader?el=style!${this
            .resourcePath}');
const template = require('!!${templateLoaders}!component-loader?el=template!${this
            .resourcePath}');
`;
        return `
            ${options.el === 'script' ? injectedDeps : ''}
            ${elSrc}`;
    }

    return `module.exports = undefined`;
};
