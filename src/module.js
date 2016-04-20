export default function loadModule(path) {
    const result = require(path);

    if (result.default) {
        return result.default;
    }

    return result;
}
