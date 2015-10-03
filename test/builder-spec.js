/**
 * Created by vt on 15/10/1.
 */

'use strict';

var async = require('async');
var fs = require('fs');
var should = require('should');

var CaptchaBuilder = require('../lib/captcha');

describe('test without error', function () {

    it('should callback with result and create file when use toFile', function (done) {
        var tempFileName = './temp.png';
        CaptchaBuilder.toFile(tempFileName, function (err, result) {
            should(err).be.exactly(null);
            (typeof result).toLocaleLowerCase().should.equal('number');
            should(this._done_for_debug).be.exactly(true);
            fs.stat(tempFileName, function (err) {
                should(err == null).be.exactly(true);
                fs.unlinkSync(tempFileName);
                done();
            });
        });
    });

    it('should callback with result buffer when use toBuffer', function (done) {
        CaptchaBuilder.toBuffer(function (err, buffer, result) {
            should(err).be.exactly(null);
            should(this._done_for_debug).be.exactly(true);
            (typeof result).toLocaleLowerCase().should.equal('number');
            should(buffer.length > 0).be.exactly(true);
            done();
        });
    });
});

describe('test with all known type error', function () {
    var KNOWN_ERRORS = ['DRAW_TO_BUFFER_ERROR',
        'DRAW_TEMP_FILE_CREATE_ERROR',
        'DRAW_TEMP_FILE_WRITE_ERROR',
        'WORD_TO_BUFFER_ERROR',
        'WORD_TEMP_FILE_CREATE_ERROR',
        'WORD_TEMP_FILE_WRITE_ERROR',
        'TO_BUFFER_WRITE_ERROR',
        'TO_FILE_WRITE_ERROR'
    ];

    it('should always done whatever error happened when use toFile', function (done) {
        var tempFileName = './temp.png';
        async.map(KNOWN_ERRORS, function (error, callback) {
            CaptchaBuilder.toFile(tempFileName, function (err) {
                if (err == null) {
                    return callback('UnKnown error', null);
                }
                should(this._done_for_debug).be.exactly(true);
                callback(null, err)
            }, error);
        }, function (err, result) {
            should(err == null).be.exactly(true);
            result.should.eql(KNOWN_ERRORS);
            done();
        });
    });

    it('should always done whatever error happened when use toBuffer', function (done) {
        async.map(KNOWN_ERRORS, function (error, callback) {
            CaptchaBuilder.toBuffer(function (err) {
                if (err == null) {
                    return callback('UnKnown error', null);
                }
                should(this._done_for_debug).be.exactly(true);
                callback(null, err)
            }, error);
        }, function (err, result) {
            should(err == null).be.exactly(true);
            result.should.eql(KNOWN_ERRORS);
            done();
        });
    });
});