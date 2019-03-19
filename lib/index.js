/**
 * 
 * @mdoule fmtjson
 * @version 4.0.6
 */

'use strict'

const fmtjson = require('./fmtjson')

let lib = fmtjson.bind(this)
lib.sortProperties = fmtjson.sortProperties

module.exports = lib