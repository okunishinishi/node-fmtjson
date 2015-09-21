/**
 * Test case for fmtjson.
 * Runs with nodeunit.
 */

var fmtjson = require('../lib/fmtjson.js'),
    fs = require('fs'),
    mkdirp = require('mkdirp');

var tmpDir = __dirname + '/../tmp';

exports.setUp = function (done) {
    mkdirp.sync(tmpDir);
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['Fmtjson'] = function (test) {
    var filename = tmpDir + '/testing-json.json';
    fs.writeFileSync(filename, '{"foo":"bar"}');
    fmtjson(tmpDir + '/*.json', {
        sort: true,
        indent: 4
    }, function (err) {
        test.ifError(err);
        test.done();
    });
};

