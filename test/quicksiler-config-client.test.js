'use strict';

const should = require('should');

/**
 * QuicksilverConfig.test
 */
require('dotenv').config({ silent: true });
const QuicksilverConfigClient = require('../lib/quicksilver-config-client');

/**
 * Test Quicksilver Nodejs config.
 */
describe('QuicksilverConfigClient', () => {
  /**
   * Helper: get default config client.
   */
  function getConfigClient() {
    return new QuicksilverConfigClient();
  }


  // Constructor.
  describe('constructor', () => {
    // Test new instance.
    it('should create new instance configured correctly', () => {
      const client = getConfigClient();
      should(client).be.an.instanceOf(QuicksilverConfigClient);

      client
        .should.have.property('qsConfigPath')
        .which.is.equal('config/rabbitmq_config.json');
    });

    // Check that config.json exists and is a file.
    it('RabbitMQ config file should be readable', () => {
      const client = getConfigClient();
      const configFileFound = client.configFileFound();
      return configFileFound.should.eventually.equal(true);
    });
  });

  // getAllSettings().
  describe('getAllSettings()', () => {
    // Check getSettings method.
    it('should be exposed', () => {
      getConfigClient().getAllSettings.should.be.a.Function();
    });

    // Get all settings.
    it('should return all settings in RabbitMQ config file', () => {
      // Check response to be an object.
      const client = getConfigClient();
      should(client).be.an.instanceOf(QuicksilverConfigClient);

      // Check response has rabbit property.
      const settings = client.getAllSettings();
      return settings.should.eventually.have.property('rabbit');
    });
  });

  // getExchangeSettings().
  describe.skip('getExchangeSettings()', () => {
    // Check getSettings method.
    it('should be exposed', () => {
      getConfigClient().getExchangeSettings.should.be.a.Function();
    });

    // Get all settings.
    it('should return RabbitMQ exchange settings', () => {
      const client = getConfigClient();
      const result = client.getExchangeSettings('transactionalExchange');

      // http://www.squaremobius.net/amqp.node/channel_api.html#channel_assertExchange
      const expectedKeys = [
        'name',
        'type',
        'options',
      ];

      // https://www.rabbitmq.com/tutorials/amqp-concepts.html#exchanges
      const expectedTypes = [
        'direct',
        'fanout',
        'topic',
        'match',
        'headers',
      ];

      return result.should.eventually.match((exchange) => {
        exchange.should.have.keys(expectedKeys);
        exchange.name.should.be.a.String();
        exchange.type.should.be.equalOneOf(expectedTypes);
        // @todo: check options.
        // See http://www.squaremobius.net/amqp.node/channel_api.html#channel_assertExchange
        // 'durable',
        // 'internal',
        // 'autoDelete',
        // 'alternateExchange',
        // 'arguments'
      });
    });
  });
});
