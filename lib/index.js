/**
 * 
 * @mdoule fmtjson
 * @version 2.0.4
 */

"use strict";

const fmtjson = require('./fmtjson'),
    pkg = require('../package.json');

let lib = fmtjson.bind(this);
lib.version = pkg.version;
lib.sortProperties = fmtjson.sortProperties;

module.exports = lib;