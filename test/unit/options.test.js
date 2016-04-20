/* eslint-disable no-unused-expressions  */
import chai from 'chai';
import path from 'path';
import options from '../../src/options.js';

const expect = chai.expect;

describe('options', () => {
    context('valid "options"', () => {
        it('should parse "options.argv"', () => {
            const opts = options({
                argv: ['--env', 'test', '--platform', 'linux']
            });

            expect(opts.argv).to.exist;
            expect(opts.argv.env).to.equal('test');
            expect(opts.argv.platform).to.equal('linux');
        });

        it('should use default pattern', () => {
            const opts = options({
                argv: ['--env', 'test', '--platform', 'linux']
            });

            expect(opts.pattern).to.equal('environment.{env}.json');
        });

        it('should use default folder', () => {
            const opts = options({
                argv: ['--env', 'test', '--platform', 'linux']
            });

            expect(opts.dir).to.equal(path.resolve(__dirname, '../../src'));
        });

        it('should use custom folder', () => {
            const dir = 'foo/bar';
            const opts = options({
                argv: ['--env', 'test', '--platform', 'linux'],
                dir: dir
            });

            expect(opts.dir).to.equal(dir);
        });

        it('should use custom pattern', () => {
            const pattern = 'environment.{env}.{platform}.json';
            const opts = options({
                argv: ['--env', 'test', '--platform', 'linux'],
                pattern: pattern
            });

            expect(opts.pattern).to.equal(pattern);
        });

        it('should use "base" file', () => {
            const opts = options({
                argv: ['--env', 'dev'],
                base: 'base.js'
            });

            expect(opts.base).to.equal('base.js');
        });

        it('should use "options.defaults" only', () => {
            const opts = options({
                argv: [],
                defaults: {
                    env: 'dev'
                }
            });

            expect(opts.argv).to.exist;
            expect(opts.argv.env).to.equal('dev');
        });

        it('should use "options.defaults" extended by "options.argv', () => {
            const opts = options({
                argv: ['--platform', 'linux'],
                defaults: {
                    env: 'dev'
                }
            });

            expect(opts.argv).to.exist;
            expect(opts.argv.env).to.equal('dev');
            expect(opts.argv.platform).to.equal('linux');
        });

        it('should override "options.defaults" by "options.argv"', () => {
            const opts = options({
                argv: ['--env', 'test', '--platform', 'linux'],
                defaults: {
                    env: 'dev',
                    platform: 'windows'
                }
            });

            expect(opts.argv).to.exist;
            expect(opts.argv.env).to.equal('test');
            expect(opts.argv.platform).to.equal('linux');
        });
    });

    context('invalid "options"', () => {
        it('should throw error when "options" are missed', () => {
            const shouldThrow = () => options();

            expect(shouldThrow).to.throw();
        });

        it('should throw error when "options" is not of "object" type', () => {
            const shouldThrow = () => options([]);

            expect(shouldThrow).to.throw();
        });

        it('should throw error when "options.argv" is missed', () => {
            const shouldThrow = () => options({});

            expect(shouldThrow).to.throw();
        });

        it('should throw error when "options.argv" is not of "array" type', () => {
            const shouldThrow = () => options({ argv: {} });

            expect(shouldThrow).to.throw();
        });

        it('should throw error when "options.defaults" is not of "object" type', () => {
            const shouldThrow = () => options({ argv: {} });

            expect(shouldThrow).to.throw();
        });

        it('should throw error when "options.pattern" is not of "string" type', () => {
            const shouldThrow = () => options({ argv: ['--env', 'dev'], pattern: 1 });

            expect(shouldThrow).to.throw();
        });

        it('should throw error when "options.dir" is not of "string" type', () => {
            const shouldThrow = () => options({ argv: ['--env', 'dev'], dir: 1 });

            expect(shouldThrow).to.throw();
        });
    });
});
