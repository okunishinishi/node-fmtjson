/**
 * Test case for fmtjson.
 * Runs with mocha.
 */
'use strict'

const fmtjson = require('../lib/fmtjson.js')
const fs = require('fs')
const assert = require('assert')
const mkdirp = require('mkdirp')

describe('fmtjson', () => {
  let tmpDir = __dirname + '/../tmp'
  before(async () => {
    mkdirp.sync(tmpDir)
  })

  after(async () => {
  })

  it('Fmtjson', async () => {
    let filename = tmpDir + '/testing-json.json'
    fs.writeFileSync(filename, '{"foo":"bar"}')
    await fmtjson(tmpDir + '/*.json', {
      sort: true,
      indent: 2
    })
  })

  it('Fmt array', async () => {
    let filename = tmpDir + '/testing-array-json.json'
    fs.writeFileSync(filename, '[{"foo":"bar"}]')
    await fmtjson(tmpDir + '/*.json', {
      sort: true,
      indent: 2
    })
  })

  it('Fmt string array', async () => {
    let filename = tmpDir + '/testing-string-array-json.json'
    fs.writeFileSync(filename, '["fuge", "foge", "aaa"]')
    await fmtjson(tmpDir + '/*.json', {
      sort: true,
      indent: 2
    })
  })
})

/* global describe, before, after, it */
