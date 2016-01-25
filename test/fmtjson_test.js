/**
 * Test case for fmtjson.
 * Runs with mocha.
 */
"use strict";

const fmtjson = require('../lib/fmtjson.js'),
    fs = require('fs'),
    assert = require('assert'),
    mkdirp = require('mkdirp');


describe('fmtjson', () => {
    let tmpDir = __dirname + '/../tmp';
    before((done) => {
        mkdirp.sync(tmpDir);
        done();
    });

    after((done) => {
        done();
    });

    it('Fmtjson', (done) => {
        let filename = tmpDir + '/testing-json.json';
        fs.writeFileSync(filename, '{"foo":"bar"}');
        fmtjson(tmpDir + '/*.json', {
            sort: true,
            indent: 2
        }, (err) => {
            assert.ifError(err);
            done();
        });
    });

    it('Fmt array', (done) => {
        let filename = tmpDir + '/testing-array-json.json';
        fs.writeFileSync(filename, '[{"foo":"bar"}]');
        fmtjson(tmpDir + '/*.json', {
            sort: true,
            indent: 2
        }, (err) => {
            assert.ifError(err);
            done();
        });
    });
});

