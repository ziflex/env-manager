import chai from 'chai';
import options from '../../options.js';
import match from '../../match.js';

const expect = chai.expect;

describe('match', () => {
    context('valid options', () => {
        it('should match by default pattern', () => {
            const opts = options({
                argv: ['--env', 'dev']
            });
            const filename = match(opts.pattern, opts.argv);
            const expected = 'environment.dev.json';

            expect(filename).to.equal(expected);
        });

        it('should match by file based custom pattern', () => {
            const pattern = 'environment.{env}.{platform}.json';
            const expected = 'environment.dev.linux.json';
            const filename = match(pattern, {
                env: 'dev',
                platform: 'linux'
            });

            expect(filename).to.equal(expected);
        });

        it('should match by directory based custom pattern', () => {
            const pattern = '{platform}/{env}.json';
            const expected = 'linux/dev.json';
            const filename = match(pattern, {
                env: 'dev',
                platform: 'linux'
            });

            expect(filename).to.equal(expected);
        });
    });

    context('invalid options', () => {
        it('should throw exception when pattern is missed', () => {
            const shouldThrow = () => {
                return match(null, {
                    env: 'dev'
                });
            };

            expect(shouldThrow).to.throw();
        });

        it('should throw exception when argv is missed', () => {
            const pattern = 'environment.{env}.{platform}.json';
            const shouldThrow = () => {
                return match(pattern, null);
            };

            expect(shouldThrow).to.throw();
        });

        it('should throw exception when value is missed', () => {
            const pattern = 'environment.{env}.{platform}.json';
            const shouldThrow = () => {
                return match(pattern, {
                    env: 'dev'
                });
            };

            expect(shouldThrow).to.throw();
        });

        it('should throw exception when invalid pattern', () => {
            const pattern = 'environment.{}.json';
            const shouldThrow = () => {
                return match(pattern, {
                    env: 'dev'
                });
            };

            expect(shouldThrow).to.throw();
        });
    });
});
