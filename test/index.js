
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
    settings = {
      accessKey: '70a82725-e9ff-4aa3-99d3-00284d2df7cf',
      events: [
        {
          key: 'mapped event',
          value: {
            segmentEvent: 'mapped event'
          }
        }
      ]
    };
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
    it('should error with invalid access key', function(done){
      var json = test.fixture('track-basic');
      json.input.event = 'mapped event';
      test
        .set({ accessKey: '1234' })
        .track(json.input)
        .error(done);
    });

    it('should let any track events through if no events are mapped', function(done){
      settings.events = [];
      var json = test.fixture('track-basic');
      test
        .set(settings)
        .track(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('if events are pre-mapped, should send mapped events', function(done){
      var json = test.fixture('track-basic');
      json.input.event = 'mapped event';
      json.output.event = 'mapped event';
      test
        .set(settings)
        .track(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('if events are pre-mapped, should not send unmapped events', function(done){
      var json = test.fixture('track-basic');
      test
        .set(settings)
        .track(json.input)
        .requests(0);

      test
        .end(done);
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
});
