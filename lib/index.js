/**
 * 
 * @mdoule fmtjson
 * @version 2.0.1
 */

"use strict";

const fmtjson = require('./fmtjson'),
    pkg = require('../package.json');

let lib = fmtjson.bind(this);
lib.version = pkg.version;

module.exports = lib;