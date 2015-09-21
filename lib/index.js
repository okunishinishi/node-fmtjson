/**
 * 
 * @mdoule fmtjson
 * @version 1.0.1
 */

"use strict";

var fmtjson = require('./fmtjson'),
    pkg = require('../package.json');

var lib = fmtjson.bind(this);
lib.version = pkg.version;

module.exports = lib;