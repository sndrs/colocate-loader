# collocate-loader [![Build Status](https://travis-ci.org/sndrs/collocate-loader.svg?branch=master)](https://travis-ci.org/sndrs/collocate-loader) [![Coverage Status](https://coveralls.io/repos/github/sndrs/collocate-loader/badge.svg?branch=master)](https://coveralls.io/github/sndrs/collocate-loader?branch=master)

Experimental webpack loader for collocated modules.

## Example

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
console.log(style); // .red { color: red; border-color: red; }
console.log(template); // <p>hello!</p>
console.log(myCrazyBlockName); // something handy
</script>
```

Blocks can also be processed by webpack loaders as if they were individual files:

```js
// webpack.config.js

module.exports = {
	...
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'collocate-loader',
                    options: {
                        rules: [
                            {
                                test: /^style$/,
                                loader: 'css-loader',
                            },
                            {
                                test: /^script$/,
                                use: [{ loader: 'babel-loader' }],
                            },
                            {
                                test: 'my-crazy-block-name',
                                loader: 'my-crazy-block-name-loader'
                            }
                        ],
                    },
                },
            },
        ],
    },
}
```
