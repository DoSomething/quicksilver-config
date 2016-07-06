'use strict';

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
      client.should.be.an.instanceof(QuicksilverConfigClient);
      client.should.have.property('qsConfigPath').which.is.not.empty();
    });
  });
});
