/* eslint-disable global-require, no-console */

const path = require('path');
const webpack = require('webpack');
const MemoryFileSystem = require('memory-fs');

const memFs = new MemoryFileSystem();

const distDir = path.resolve(__dirname, 'dist');
memFs.mkdirpSync(distDir);

it('works without other loaders', done => {
	const compiler = webpack(require('./fixtures/webpack.config.no-loaders.js'));

	compiler.outputFileSystem = memFs;
	compiler.run((err, stats) => {
		console.log(stats.toJson('normal'));
		if (err) console.log(err);
		const content = memFs.readFileSync(
			path.resolve(distDir, 'main.js'),
			'utf8'
		);
		expect(content).toMatchSnapshot();
		done();
	});
});

it('works with other loaders', done => {
	const compiler = webpack(require('./fixtures/webpack.config.loaders.js'));

	compiler.outputFileSystem = memFs;
	compiler.run(err => {
		if (err) console.log(err);
		const content = memFs.readFileSync(
			path.resolve(distDir, 'main.js'),
			'utf8'
		);
		expect(content).toMatchSnapshot();
		done();
	});
});
