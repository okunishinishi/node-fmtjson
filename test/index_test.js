/**
 * Test for index.js
 * Runs with mocha.
 */

"use strict";

const index = require('../lib/index.js'),
    assert = require('assert');

describe('index', () => {
    it('Eval properties.', (done) => {
        assert.ok(index);
        done();
    });
});
