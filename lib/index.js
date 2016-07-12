/**
 * 
 * @mdoule fmtjson
 * @version 3.0.2
 */

'use strict'

const fmtjson = require('./fmtjson')
const pkg = require('../package.json')

let lib = fmtjson.bind(this)
lib.version = pkg.version
lib.sortProperties = fmtjson.sortProperties

module.exports = lib