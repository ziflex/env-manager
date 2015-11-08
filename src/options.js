import minimist from 'minimist';

const OPTIONS_NOT_FOUND_ERROR = 'Options are missed';
const ARGV_NOT_FOUND_ERROR = 'Arguments are missed';

const FILE_MATCH_PATTERN = 'environment.{env}.json';

export default function options(opts) {
    if (!opts) {
        throw new Error(OPTIONS_NOT_FOUND_ERROR);
    }

    if (!opts.argv || !opts.argv.length) {
        throw new Error(ARGV_NOT_FOUND_ERROR);
    }


    const pattern = opts.pattern || FILE_MATCH_PATTERN;
    const dir = opts.dir || __dirname;

    return {
        argv: minimist(opts.argv),
        dir,
        pattern
    };
}
