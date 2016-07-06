'use strict';

/**
 * QuicksilverConfigClient
 *
 * Utility module to access common Quicksilver configuration settings.
 */

// Package version
const VERSION = require('../package.json').version;

class QuicksilverConfigClient {

  constructor(options) {
    const opts = options || {};

    // Ensure API base URI is provided.
    if (!opts.mbConfigPath) {
      throw new TypeError('Option mbConfigPath is required.');
    }

    // Parse options.
    this.mbConfigPath = opts.mbConfigPath;

    // Defaults.
    this.VERSION = VERSION;
  }

  /**
   * Get all configuration settings.
   */
  getSettings() {
    return true;
  }

  /**
   * Get configuration settings by exchange name. Will include all queue settings
   * associated to the exchange.
   *
   * @param string exchangeName
   */
  getSettingsByExchange() {
    return true;
  }
}

module.exports = QuicksilverConfigClient;
