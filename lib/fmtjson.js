/**
 * Format json files.
 * @function fmtjson
 * @param {string|string[]} filename - Filename patterns to format.
 * @param {object} [options] - Optional settings.
 * @param {number} [options.indent=2] - Number of indent.
 * @param {boolean} [options.sort=false] - Sort properties.
 * @param {string} [options.mode='644'] - File permission.
 * @returns {Promise}
 */
'use strict'

const argx = require('argx')
const expandglob = require('expandglob')
const fs = require('fs')
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
  options = args.pop('object')

  let indent = options.indent || 2
  let sort = !!options.sort
  let mode = options.mode || '644'

  return co(function * () {
    let filenames = yield expandglob(src)
    let results = []
    for (let filename of filenames) {
      let oldContent = yield new Promise((resolve, reject) =>
        fs.readFile(filename, (err, content) =>
          err ? reject(err) : resolve(content)
        )
      )
      let data = JSON.parse(oldContent)
      if (sort) {
        data = sortProperties(data)
      }
      let newContent = JSON.stringify(data, null, indent)
      let changed = String(oldContent) !== String(newContent)
      let result
      if (changed) {
        result = yield new Promise((resolve, reject) =>
          writeout(filename, newContent, {
            mode: mode,
            force: true
          }, (err) => {
            err ? reject(err) : resolve({
              filename,
              mode,
              changed: true
            })
          })
        )
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
