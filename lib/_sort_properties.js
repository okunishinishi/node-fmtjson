/**
 * @function _sortProperties
 * @private
 */

"use strict";

/** @lends _sortProperties */
function _sortProperties(data) {
    if (Array.isArray(data)) {
        return data.map(_sortProperties).sort();
    }
    switch (typeof data) {
        case 'string':
        case 'number':
        case 'boolean':
            return data;
    }
    let sorted = {},
        keys = Object.keys(data).sort((a, b) => {
            return a.localeCompare(b);
        });
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let val = data[key];
        if (Array.isArray(val)) {
            sorted[key] = val;
        } else if (typeof(val) == 'object') {
            sorted[key] = _sortProperties(val);
        } else {
            sorted[key] = val;
        }
    }
    return sorted;
}

module.exports = _sortProperties;