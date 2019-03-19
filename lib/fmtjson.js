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
const { readFileAsync } = require('asfs')
const path = require('path')
const { EOL } = require('os')
const sortProperties = require('./sort_properties')
const writeout = require('writeout')

/** @lends fmtjson */
async function fmtjson(src, options) {
  const args = argx(arguments)
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

  const filenames = await aglob(src, { cwd, ignore })
  const results = []
  for (const filename of filenames) {
    const oldContent = await readFileAsync(filename)
    let data = JSON.parse(oldContent)
    if (sort) {
      data = sortProperties(data)
    }
    const newContent = JSON.stringify(data, null, indent) + EOL
    const changed = String(oldContent) !== String(newContent)
    let result
    if (changed) {
      await writeout(filename, newContent, {
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
}

function _mergeResults(results) {
  const changed = {}
  results.forEach((result) => {
    if (result.changed) {
      const filename = path.relative(process.cwd(), result.filename)
      changed[filename] = result
    }
  })
  return changed
}

fmtjson.sortProperties = sortProperties

module.exports = fmtjson
