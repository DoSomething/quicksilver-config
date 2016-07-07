'use strict';

const jsonfile = require('jsonfile');

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
  getAllSettings() {
    jsonfile.readFile(this.qsConfigPath, (err, obj) => {
      if (err) {
        return false;
      }
      return obj;
    });
  }

  /**
   * Get configuration settings by exchange name. Will include all queue settings
   * associated to the exchange.
   *
   * @param string exchangeName
   */
  getExchangeSettings() {
    return true;
  }
}

module.exports = QuicksilverConfigClient;
