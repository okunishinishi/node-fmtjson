/**
 * 
 * @mdoule fmtjson
 * @version 5.0.1
 */

'use strict'

const fmtjson = require('./fmtjson')

let lib = fmtjson.bind(this)
lib.sortProperties = fmtjson.sortProperties

module.exports = lib