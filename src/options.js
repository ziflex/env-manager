import minimist from 'minimist';
import merge from 'lodash.defaultsdeep';
import is from 'is';

const OPTIONS_NOT_FOUND_ERROR = 'Options are missed';
const INVALID_OPTIONS_ERROR = 'Options must be of "object" type';
const ARGV_NOT_FOUND_ERROR = '"options.argv" are missed';
const INVALID_ARGV_ERROR = '"options.argv" must be of "array" type';
const INVALID_DEFAULTS_ERROR = '"options.defaults" must be of "object" type';
const INVALID_PATTERN_ERROR = '"options.pattern" must be of "string" type';
const INVALID_DIR_ERROR = '"options.dir" must be of "string" type';

const FILE_MATCH_PATTERN = 'environment.{env}.json';

/*
 * Validates and builds options.
 * @param params {object} - Passed options.
 * @returns {object} - Normalized options.
 */
export default function options(params) {
    if (!params) {
        throw new Error(OPTIONS_NOT_FOUND_ERROR);
    }

    if (!is.object(params)) {
        throw new Error(INVALID_OPTIONS_ERROR);
    }

    if (!params.argv) {
        throw new Error(ARGV_NOT_FOUND_ERROR);
    }

    if (!is.array(params.argv)) {
        throw new Error(INVALID_ARGV_ERROR);
    }

    if (params.defaults && !is.object(params.defaults)) {
        throw new Error(INVALID_DEFAULTS_ERROR);
    }

    if (params.pattern && !is.string(params.pattern)) {
        throw new Error(INVALID_PATTERN_ERROR);
    }

    if (params.dir && !is.string(params.dir)) {
        throw new Error(INVALID_DIR_ERROR);
    }

    const pattern = params.pattern || FILE_MATCH_PATTERN;
    const dir = params.dir || __dirname;
    const defaults = params.defaults || {};
    const base = params.base || null;

    return {
        argv: merge({}, minimist(params.argv), defaults),
        dir,
        pattern,
        base
    };
}
