/**
 * 
 * @mdoule fmtjson
 * @version 1.0.2
 */

"use strict";

var fmtjson = require('./fmtjson'),
    pkg = require('../package.json');

var lib = fmtjson.bind(this);
lib.version = pkg.version;

module.exports = lib;