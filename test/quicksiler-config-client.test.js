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
      mbConfigPath: process.env.MB_CONFIG_PATH,
    });
  }
});
