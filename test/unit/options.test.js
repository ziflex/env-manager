import chai from 'chai';
import path from 'path';
import options from '../../options.js';

const expect = chai.expect;

describe('options', () => {
    context('valid options', () => {
        it('should parse arguments', () => {
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

            expect(opts.dir).to.equal(path.resolve(__dirname, '../..'));
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
    });

    context('invalid options', () => {
        it('should throw error when options are missed', () => {
            const shouldThrow = () => options();

            expect(shouldThrow).to.throw();
        });

        it('should throw error when arguments are missed', () => {
            const shouldThrow = () => options({});

            expect(shouldThrow).to.throw();
        });
    });
});
