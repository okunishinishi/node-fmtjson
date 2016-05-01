/**
 * Test case for fmtjson.
 * Runs with mocha.
 */
'use strict'

const fmtjson = require('../lib/fmtjson.js')
const fs = require('fs')
const assert = require('assert')
const mkdirp = require('mkdirp')
const co = require('co')

describe('fmtjson', () => {
  let tmpDir = __dirname + '/../tmp'
  before(() => co(function * () {
    mkdirp.sync(tmpDir)
  }))

  after(() => co(function * () {
  }))

  it('Fmtjson', () => co(function * () {
    let filename = tmpDir + '/testing-json.json'
    fs.writeFileSync(filename, '{"foo":"bar"}')
    yield fmtjson(tmpDir + '/*.json', {
      sort: true,
      indent: 2
    })
  }))

  it('Fmt array', () => co(function * () {
    let filename = tmpDir + '/testing-array-json.json'
    fs.writeFileSync(filename, '[{"foo":"bar"}]')
    yield fmtjson(tmpDir + '/*.json', {
      sort: true,
      indent: 2
    })
  }))

  it('Fmt string array', () => co(function * () {
    let filename = tmpDir + '/testing-string-array-json.json'
    fs.writeFileSync(filename, '["fuge", "foge", "aaa"]')
    yield fmtjson(tmpDir + '/*.json', {
      sort: true,
      indent: 2
    })
  }))
})

/* global describe, before, after, it */
