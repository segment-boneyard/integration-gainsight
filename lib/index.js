
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
Gainsight.prototype.track = request;
Gainsight.prototype.alias = request;
Gainsight.prototype.group = request;
Gainsight.prototype.screen = request;
Gainsight.prototype.page = request;

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
