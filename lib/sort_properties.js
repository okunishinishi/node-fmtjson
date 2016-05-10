/**
 * @function sortProperties
 * @private
 */

'use strict'

/** @lends sortProperties */
function sortProperties (data) {
  if (Array.isArray(data)) {
    return data.map(sortProperties).sort()
  }
  switch (typeof data) {
    case 'string':
    case 'number':
    case 'boolean':
      return data
    default:
      break
  }
  let sorted = {}
  let keys = Object.keys(data).sort((a, b) => a.localeCompare(b))
  for (let i = 0; i < keys.length; i++) {
    let key = keys[ i ]
    let val = data[ key ]
    if (Array.isArray(val)) {
      sorted[ key ] = val
    } else if (typeof val === 'object') {
      sorted[ key ] = sortProperties(val)
    } else {
      sorted[ key ] = val
    }
  }
  return sorted
}

module.exports = sortProperties
