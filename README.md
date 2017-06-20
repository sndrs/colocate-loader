# collocation-loader [![Build Status](https://travis-ci.org/sndrs/collocation-loader.svg?branch=master)](https://travis-ci.org/sndrs/collocation-loader) [![Coverage Status](https://coveralls.io/repos/github/sndrs/collocation-loader/badge.svg?branch=master)](https://coveralls.io/github/sndrs/collocation-loader?branch=master)

Experimental webpack loader for collocated modules. Very much inspired by [`.vue`](https://vuejs.org/v2/guide/single-file-components.html) and [svelte](https://svelte.technology/guide#understanding-svelte-components) components, but (almost) completely unopinionated about your blocks and their behaviour.

## Example

By default, the content of all non-`script` blocks is available as strings to the `script` block, via camel-cased globals:

```js
// webpack.config.js

module.exports = {
	...
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'collocation-loader',
                },
            },
        ],
    },
}
```

```html
<!-- myModule.html -->

<style>
    .red {
        color: red;
        border-color: red;
    }
</style>

<template><p>hello!</p></template>

<my-crazy-block-name>something handy</my-crazy-block-name>

<script>
console.log(style); // '.red { color: red; border-color: red; }'
console.log(template); // '<p>hello!</p>'
console.log(myCrazyBlockName); // 'something handy'
</script>
```

However, blocks can also be processed by webpack loaders, as if they were individual files:

```js
// webpack.config.js

module.exports = {
	...
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'collocation-loader',
                    options: {
                        rules: [
                            {
                                test: /^style$/,
                                loader: 'css-loader', // `style` is now a css-loader object
                            },
                            {
                                test: /^script$/,
                                use: [{ loader: 'babel-loader' }], // the script block is now es5 etc.
                            },
                            {
                                test: 'my-crazy-block-name',
                                loader: 'my-crazy-block-name-loader' // who knows...
                            }
                        ],
                    },
                },
            },
        ],
    },
}
```
