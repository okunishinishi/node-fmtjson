/**
 * Test for index.js
 * Runs with nodeunit.
 */

"use strict";

var index = require('../lib/index.js');

exports['Eval properties.'] = function (test) {
    test.ok(index);
    test.done();
};
