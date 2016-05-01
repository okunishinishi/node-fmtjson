/**
 * Test case for sortProperties.
 * Runs with mocha.
 */
'use strict'

const sortProperties = require('../lib/sort_properties.js')
const assert = require('assert')

describe('sort-properties', () => {
  before((done) => {
    done()
  })

  after((done) => {
    done()
  })

  it('Sort properties', (done) => {
    let sorted = sortProperties({
      foo: {
        quz: 'quz',
        bar: 'baz'
      },
      hoge: 2
    })
    assert.ok(sorted)
    done()
  })
})

/* global describe, before, after, it */
