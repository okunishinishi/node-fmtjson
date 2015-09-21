/**
 * 
 * @mdoule fmtjson
 * @version 1.0.0
 */

"use strict";

var fmtjson = require('./fmtjson'),
    pkg = require('../package.json');

lib = fmtjson.bind(this);
lib.version = pkg.version;

module.exports = lib;