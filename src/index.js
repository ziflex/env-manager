import merge from 'merge';
import path from 'path';
import options from './options';
import match from './match';

export default function manager(o) {
    const opt = options(o);
    const filename = match(opt.pattern, opt.argv);

    if (!filename) {
        return null;
    }

    const current = require(path.join(opt.dir, filename));
    const base = opt.base ? require(path.join(opt.dir, opt.base)) : null;

    if (!base) {
        return current;
    }

    return merge({}, base, current);
}
