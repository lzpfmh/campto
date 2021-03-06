/**
 * Created by vt on 15/11/3.
 */

'use strict'

process.env['CAMPTO_ROOT_DIR'] = __dirname
delete require.cache[require.resolve('../../../lib')]

const campto = require('../../../lib')
const should = require('should')

describe('config auto load', function () {
  it('should get from current project root', function () {
    campto.camptoConfig['pidPath'].should.equal('pids')
  })
})

const monitor = new campto.Monitor(campto.camptoConfig)
describe('monitor with forever', function () {})
