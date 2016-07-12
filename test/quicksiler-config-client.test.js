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
    return new QuicksilverConfigClient({
      qsConfigPath: process.env.QS_CONFIG_PATH,
    });
  }


  // Constructor.
  describe('constructor', () => {
    // Test new instance.
    it('without options should throw a TypeError', () => {
      (() => new QuicksilverConfigClient()).should.throw(TypeError);
    });

    // Check API base URL.
    it('base URL option should be set', () => {
      process.env.QS_CONFIG_PATH.should.be.not.empty();
    });

    // Test new instance.
    it('should create new instance configured correctly', () => {
      const client = getConfigClient();
      should(client).be.an.instanceOf(QuicksilverConfigClient);
      client.should.have.property('qsConfigPath').which.is.not.empty();
    });
  });

  // getAllSettings().
  describe('getAllSettings', () => {
    // Check getSettings method.
    it('getAllSettings() should be exposed', () => {
      getConfigClient().getAllSettings.should.be.a.Function();
    });

    // Get all settings.
    it('should return all settings in mb_config.json', () => {
      // Check response to be an object.
      const client = getConfigClient();
      should(client).be.an.instanceOf(QuicksilverConfigClient);

      // Check response has rabbit property.
      client.getAllSettings()
        .then((response) => {
          response.should.be.a.Promise();
          response.should.have.property('rabbit');
        })
        .catch(() => {
          // @todo: Exception logic
        });
    });
  });
});
