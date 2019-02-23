/**
 * 
 * @mdoule fmtjson
 * @version 4.0.2
 */

'use strict'

const fmtjson = require('./fmtjson')

let lib = fmtjson.bind(this)
lib.sortProperties = fmtjson.sortProperties

module.exports = lib