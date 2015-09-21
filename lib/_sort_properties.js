/**
 * @function _sortProperties
 * @private
 */

"use strict";

/** @lends _sortProperties */
function _sortProperties(data) {
    var sorted = {},
        keys = Object.keys(data).sort(function (a, b) {
            return a.localeCompare(b);
        });
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var val = data[key];
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