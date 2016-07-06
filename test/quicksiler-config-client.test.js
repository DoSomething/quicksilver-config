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

    // Check QS_CONFIG_PATH has a value.
    it('QS_CONFIG_PATH in .env should be set', () => {
      process.env.QS_CONFIG_PATH.should.be.not.empty();
    });

    // Test new instance.
    it('should create new instance configured correctly', () => {
      const client = getConfigClient();
      client.should.be.an.instanceof(QuicksilverConfigClient);
      client.should.have.property('qsConfigPath').which.is.not.empty();
    });

    // Check QS_CONFIG_PATH has valid value by confirming access to the path to the JSON file.
    it('QS_CONFIG_PATH in .env should point to valid JSON file', () => {
      const client = getConfigClient();
      const configFileFound = client.configFileFound();
      configFileFound.should.equal(true);
    });
  });
});
