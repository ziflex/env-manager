const PATTERN_NOT_FOUND_ERROR = 'Pattern is missed';
const ARGV_NOT_FOUND_ERROR = 'Pattern is missed';
const VALUE_NOT_FOUND_ERROR = 'Value not found for key';
const KEY_NOT_FOUND_ERROR = 'Pattern contains invalid key';

const MATCH_PATTERN = /\{(.*?)}/g;
const REPLACE_PATTERN = /\{|}/g;

export default function match(pattern, argv) {
    if (!pattern) {
        throw new Error(PATTERN_NOT_FOUND_ERROR);
    }

    if (!argv) {
        throw new Error(ARGV_NOT_FOUND_ERROR);
    }

    return pattern.replace(MATCH_PATTERN, (matched) => {
        const key = matched.replace(REPLACE_PATTERN, '');

        if (!key) {
            throw new Error(KEY_NOT_FOUND_ERROR);
        }

        const value = argv[key];

        if (!value) {
            throw new Error(`${VALUE_NOT_FOUND_ERROR}: ${key}`);
        }

        return value;
    });
}
