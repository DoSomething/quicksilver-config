'use strict';

const fs = require('fs');

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
    if (!opts.qsConfigPath) {
      throw new TypeError('Option qsConfigPath is required.');
    }

    // Parse options.
    this.qsConfigPath = opts.qsConfigPath;

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

  /**
   * Check that configuration file define in .env as QS_CONFIG_PATH is accessable.
   */
  configFileFound() {
    fs.access(this.qsConfigPath, fs.F_OK, (err) => {
      let status = false;
      if (!err) {
        status = true;
      }
      return status;
    });
  }
}

module.exports = QuicksilverConfigClient;
