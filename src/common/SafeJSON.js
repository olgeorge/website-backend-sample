const _ = require('lodash');

const MAX_ARRAY_LENGTH = 3;
const MAX_STRING_LENGTH = 100;
const HIDDEN_STRING = '********';

const sensitiveFieldNameRegexes = [
    /.*password.*/i,
    /.*token.*/i,
];

const cutLongString = str => str.length > MAX_STRING_LENGTH
    ? str.substring(0, MAX_STRING_LENGTH) + '...'
    : str;

const keyIsSafe = key => {
    if (!key) {
        return true;
    }
    return !sensitiveFieldNameRegexes.find(regex => regex.test(key));
};

/**
 * The class provides functionality similar to JSON.stringify,
 * except that it hides object fields that contain "password" or "token" in them,
 * as well as shortens long string and long arrays (for convenience of viewing logs)
 * Does not work on objects with circular references
 */
class SafeJSON {

    static _makeSafeCopy(objectOrPrimitive, maybeKey) {
        if (_.isString(objectOrPrimitive)) {
            if (!keyIsSafe(maybeKey)) {
                return HIDDEN_STRING;
            }
            return cutLongString(objectOrPrimitive);
        }
        if (_.isArray(objectOrPrimitive)) {
            const shortenedArray = objectOrPrimitive.slice(0, MAX_ARRAY_LENGTH);
            const removedElementCount = objectOrPrimitive.length - MAX_ARRAY_LENGTH;
            if (removedElementCount > 0) {
                shortenedArray.push(`...Omitted ${removedElementCount} array elements...`);
            }
            return _.map(shortenedArray, (value) => SafeJSON._makeSafeCopy(value, maybeKey));
        }
        if (_.isObject(objectOrPrimitive)) {
            return _.mapValues(objectOrPrimitive, (value, key) => SafeJSON._makeSafeCopy(value, key));
        }
        return objectOrPrimitive;
    }

    static stringify(object) {
        return JSON.stringify(SafeJSON._makeSafeCopy(object));
    }
}

module.exports = SafeJSON;
