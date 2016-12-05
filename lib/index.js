
/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');

/**
 * Expose `Gainsight`
 */

var Gainsight = module.exports = integration('Gainsight')
  .endpoint('https://event.gainsight.com')
  .channels(['server', 'mobile', 'client'])
  .ensure('settings.accessKey')
  .retries(3);

/**
 * Methods
 */

Gainsight.prototype.identify = request;
Gainsight.prototype.group = request;

/**
 * Track
 *
 * @param {Facade} Track
 */

Gainsight.prototype.track = function(track, fn) {
  // Gainsight wants us to have customers whitelist events
  // But to prevent breaking changes, if you have not whitelisted events,
  // we will default to sending all events through
  if (!this.settings.events.length) return request.call(this, track, fn);

  // This returns empty array if no matching event is found
  var event = this.map(this.settings.events, track.event());
  if (event.length) return request.call(this, track, fn);
  fn();
};

/**
 * Impl for all methods.
 *
 * @param {Facade} facade
 * @param {Function} fn
 * @api public
 */

function request(facade, fn){
  return this
    .post('/clickstream/segmentio/event')
    .set('accessKey', this.settings.accessKey)
    .type('json')
    .send(facade.json())
    .end(this.handle(fn));
};
