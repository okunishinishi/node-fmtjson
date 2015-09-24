/**
 * Format json files.
 * @function fmtjson
 * @param {string|string[]} filename - Filename patterns to format.
 * @param {object} [options] - Optional settings.
 * @param {number} [options.indent=2] - Number of indent.
 * @param {boolean} [options.sort=false] - Sort properties.
 * @param {string} [options.mode='644'] - File permission.
 * @param {function} callback - Callback when done.
 */
"use strict";

var argx = require('argx'),
    expandglob = require('expandglob'),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    _sortProperties = require('./_sort_properties'),
    writeout = require('writeout');


/** @lends fmtjson */
function fmtjson(filename, options, callback) {
    var args = argx(arguments);
    callback = args.pop('function');
    filename = args.shift('string|array');
    options = args.pop('object');

    var indent = options.indent || 2,
        sort = !!options.sort,
        mode = options.mode || '644';
    async.waterfall([
        function (callback) {
            expandglob(filename, callback);
        },
        function (filenames, callback) {
            async.mapSeries(filenames, function (filename, callback) {
                async.waterfall([
                    function (callback) {
                        fs.readFile(filename, callback);
                    },
                    function (oldContent, callback) {
                        var data = JSON.parse(oldContent);
                        if (sort) {
                            data = _sortProperties(data);
                        }
                        var newContent = JSON.stringify(data, null, indent);
                        var changed = String(oldContent) !== String(newContent);
                        if (changed) {
                            writeout(filename, newContent, {
                                mode: mode,
                                force: true
                            }, function (err) {
                                callback(err, {
                                    filename: filename,
                                    changed: true,
                                    mode: mode
                                });
                            });
                        } else {
                            callback(null, {
                                filename: filename,
                                changed: false
                            });
                        }

                    }
                ], callback);
            }, function (err, results) {
                callback(null, _mergeResults(results));
            });
        }
    ], callback);
}

function _mergeResults(results) {
    var changed = {};
    results.forEach(function (result) {
        if (result.changed) {
            var filename = path.relative(process.cwd(), result.filename);
            changed[filename] = result;
        }
    });
    return changed;
}

module.exports = fmtjson;
