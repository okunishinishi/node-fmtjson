/**
 * 
 * @mdoule fmtjson
 * @version 3.0.4
 */

'use strict'

const fmtjson = require('./fmtjson')

let lib = fmtjson.bind(this)
lib.sortProperties = fmtjson.sortProperties

module.exports = lib