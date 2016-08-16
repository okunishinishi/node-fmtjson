/**
 * Format json files.
 * @function fmtjson
 * @param {string|string[]} filename - Filename patterns to format.
 * @param {object} [options] - Optional settings.
 * @param {number} [options.indent=2] - Number of indent.
 * @param {boolean} [options.sort=false] - Sort properties.
 * @param {string} [options.mode='644'] - File permission.
 * @param {string} [options.cwd=process.cwd()] - Current working path
 * @returns {Promise}
 */
'use strict'

const argx = require('argx')
const aglob = require('aglob')
const fs = require('fs')
const { readFileAsync } = require('asfs')
const path = require('path')
const sortProperties = require('./sort_properties')
const writeout = require('writeout')
const co = require('co')

/** @lends fmtjson */
function fmtjson (src, options) {
  let args = argx(arguments)
  if (args.pop('function')) {
    throw new Error('Callback is not supported now. Use promise interface instead.')
  }
  src = args.shift('string|array')
  options = args.pop('object') || {}

  let {
    indent = 2,
    sort = false,
    mode = '644',
    cwd = process.cwd(),
    ignore = []
  } = options

  return co(function * () {
    let filenames = yield aglob(src, { cwd, ignore })
    let results = []
    for (let filename of filenames) {
      let oldContent = yield readFileAsync(filename)
      let data = JSON.parse(oldContent)
      if (sort) {
        data = sortProperties(data)
      }
      let newContent = JSON.stringify(data, null, indent)
      let changed = String(oldContent) !== String(newContent)
      let result
      if (changed) {
        yield writeout(filename, newContent, {
          mode: mode,
          force: true
        })
        result = {
          filename,
          mode,
          changed: true
        }
      } else {
        result = {
          filename,
          changed: false
        }
      }
      results.push(result)
    }
    return _mergeResults(results)
  })
}

function _mergeResults (results) {
  let changed = {}
  results.forEach((result) => {
    if (result.changed) {
      let filename = path.relative(process.cwd(), result.filename)
      changed[ filename ] = result
    }
  })
  return changed
}

fmtjson.sortProperties = sortProperties

module.exports = fmtjson
