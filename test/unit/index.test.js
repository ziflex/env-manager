import chai from 'chai';
import path from 'path';
import manager from '../../index.js';

const expect = chai.expect;

describe('manager', () => {
    context('file based pattern', () => {
        it('should load file', () => {
            const env = manager({
                dir: path.resolve(__dirname, '../fixtures/file-based'),
                argv: ['--env', 'dev']
            });

            expect(env).to.exist;
            expect(env.name).to.equal('dev');
        });

        it('should merge file', () => {
            const env = manager({
                dir: path.resolve(__dirname, '../fixtures/file-based'),
                argv: ['--env', 'dev'],
                base: 'environment.json'
            });

            expect(env).to.exist;
            expect(env.name).to.equal('dev');
            expect(env.paths).to.exist;
            expect(env.paths.input).to.equal('src');
            expect(env.paths.output).to.equal('dist');
        });
    });

    context('directory based pattern', () => {
        it('should load file', () => {
            const env = manager({
                pattern: '{platform}/{env}.json',
                dir: path.resolve(__dirname, '../fixtures/directory-based'),
                argv: ['--env', 'dev', '--platform', 'linux']
            });

            expect(env).to.exist;
            expect(env.name).to.equal('linux/dev');
        });

        it('should merge file', () => {
            const env = manager({
                pattern: '{platform}/{env}.json',
                dir: path.resolve(__dirname, '../fixtures/directory-based'),
                argv: ['--env', 'dev', '--platform', 'linux'],
                base: 'environment.json'
            });

            expect(env).to.exist;
            expect(env.name).to.equal('linux/dev');
            expect(env.paths).to.exist;
            expect(env.paths.input).to.equal('src');
            expect(env.paths.output).to.equal('dist/linux');
        });
    });
});