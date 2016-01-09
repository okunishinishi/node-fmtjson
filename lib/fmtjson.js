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

const argx = require('argx'),
    expandglob = require('expandglob'),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    _sortProperties = require('./_sort_properties'),
    writeout = require('writeout');


/** @lends fmtjson */
function fmtjson(filename, options, callback) {
    let args = argx(arguments);
    callback = args.pop('function');
    filename = args.shift('string|array');
    options = args.pop('object');

    let indent = options.indent || 2,
        sort = !!options.sort,
        mode = options.mode || '644';
    async.waterfall([
        function (callback) {
            expandglob(filename, callback);
        },
        function (filenames, callback) {
            async.mapSeries(filenames, (filename, callback) => {
                async.waterfall([
                    (callback) => {
                        fs.readFile(filename, callback);
                    },
                    (oldContent, callback) => {
                        let data = JSON.parse(oldContent);
                        if (sort) {
                            data = _sortProperties(data);
                        }
                        let newContent = JSON.stringify(data, null, indent);
                        let changed = String(oldContent) !== String(newContent);
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
    let changed = {};
    results.forEach((result) => {
        if (result.changed) {
            let filename = path.relative(process.cwd(), result.filename);
            changed[filename] = result;
        }
    });
    return changed;
}

module.exports = fmtjson;
