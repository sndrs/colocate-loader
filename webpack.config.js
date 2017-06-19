const path = require('path');
var multi = require('multi-loader');

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
                        loaders: {
                            style: ['styletron-loader'],
                            script: ['babel-loader'],
                        },
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
