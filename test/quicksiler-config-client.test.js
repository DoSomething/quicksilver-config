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
      client.should.have.property('qsConfigPath').which.is.equal('config.json');
    });

    // Check that config.json exists and is a file.
    it('config file should exist', () => {
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
    it('should return all settings in the config file', () => {
      // Check response to be an object.
      const client = getConfigClient();
      should(client).be.an.instanceOf(QuicksilverConfigClient);

      // Check response has rabbit property.
      const settings = client.getAllSettings();
      return settings.should.eventually.have.property('rabbit');
    });
  });
});
