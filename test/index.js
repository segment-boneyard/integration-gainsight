
var Test = require('segmentio-integration-tester');
var helpers = require('./helpers');
var facade = require('segmentio-facade');
var should = require('should');
var assert = require('assert');
var Gainsight = require('..');
var Track = facade.Track;

describe('Gainsight', function(){
  var gainsight;
  var settings;
  var test;

  beforeEach(function(){
    settings = { accessKey: '70a82725-e9ff-4aa3-99d3-00284d2df7cf' };
    gainsight = new Gainsight(settings);
    test = Test(gainsight, __dirname);
  });

  it('should have correct settings', function(){
    test
      .name('Gainsight')
      .endpoint('https://event.gainsight.com')
      .channels(['server', 'mobile', 'client'])
      .ensure('settings.accessKey');
  });

  describe('.validate()', function(){
    it('should be invalid when .accessKey is missing', function(){
      delete settings.accessKey;
      test.invalid({}, settings);
    });

    it('should be valid when settings are complete', function(){
      test.valid({}, settings);
    });
  });

  describe('.track()', function(){
    it('success', function(done){
      var json = test.fixture('track-basic');
      test
        .set(settings)
        .track(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid access key', function(done){
      var json = test.fixture('track-basic');
      test
        .set({ accessKey: '1234' })
        .track(json.input)
        .error(done);
    });
  });

  describe('.identify()', function(){
    it('success', function(done){
      var json = test.fixture('identify-basic');
      test
        .set(settings)
        .identify(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid access key', function(done){
      var json = test.fixture('identify-basic');
      test
        .set({ accessKey: '1234' })
        .identify(json.input)
        .error(done);
    });
  });

  describe('.alias()', function(){
    it('success', function(done){
      var json = test.fixture('alias-basic');
      test
        .set(settings)
        .alias(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid access key', function(done){
      var json = test.fixture('alias-basic');
      test
        .set({ accessKey: '1234' })
        .alias(json.input)
        .error(done);
    });
  });

  describe('.group()', function(){
    it('success', function(done){
      var json = test.fixture('group-basic');
      test
        .set(settings)
        .group(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid access key', function(done){
      var json = test.fixture('group-basic');
      test
        .set({ accessKey: '1234' })
        .group(json.input)
        .error(done);
    });
  });

  describe('.page()', function(){
    it('success', function(done){
      var json = test.fixture('page-basic');
      test
        .set(settings)
        .page(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid access key', function(done){
      var json = test.fixture('page-basic');
      test
        .set({ accessKey: '1234' })
        .page(json.input)
        .error(done);
    });
  });

  describe('.screen()', function(){
    it('success', function(done){
      var json = test.fixture('screen-basic');
      test
        .set(settings)
        .screen(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid access key', function(done){
      var json = test.fixture('screen-basic');
      test
        .set({ accessKey: '1234' })
        .screen(json.input)
        .error(done);
    });
  });
});
