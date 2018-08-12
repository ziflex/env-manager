import defaults from 'lodash.defaultsdeep';
import merge from 'lodash.merge';
import path from 'path';
import options from './options';
import match from './match';
import loadModule from './module';

/*
 * Matches a file with environment variables based on passed arguments.
 * @param params {object) - Parameters.
 * @param params.argv {Array<any>) - Process arguments.
 * @param params.dir {string) - Files lookup folder. Optional. Default __dirname.
 * @param params.base {string) - Base file with environment variables. Optional.
 * @param params.pattern {string) - File matching pattern. Optional.
 * @param params.defaults {object) - Default arguments. Optional.
 * @returns {object} - Environment variables.
 */
module.exports = function manager(params) {
    const opt = options(params);
    const filename = match(opt.pattern, opt.argv);

    if (!filename) {
        return null;
    }

    const matched = loadModule(path.join(opt.dir, filename));
    const base = opt.base ? loadModule(path.join(opt.dir, opt.base)) : null;

    return merge(defaults({}, matched, base), opt.argv);
};
