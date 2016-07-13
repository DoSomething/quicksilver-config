'use strict';

const fs = require('fs');
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

    // Confirm config file is found
    this.configFileFound()
      .catch((error) => {
        throw new TypeError('Configuration file missing, error: :error', error);
      });


    // Defaults.
    this.VERSION = VERSION;
  }

  /**
   * Get all configuration settings.
   */
  getAllSettings() {
    return new Promise((resolve) => {
      jsonfile.readFile(this.qsConfigPath, (err, obj) => {
        if (err) {
          throw new Error(err);
        }
        resolve(obj);
      });
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

  /**
   * Check that configuration path (qsConfigPath) value defined in .env as QS_CONFIG_PATH
   * is a valid path.
   */
  configFileFound() {
    return new Promise((resolve) => {
      fs.lstat(this.qsConfigPath, (err, res) => {
        if (err) {
          throw new Error(err);
        }
        if (!res.isFile()) {
          throw new Error(err);
        }
        resolve(true);
      });
    });
  }
}

module.exports = QuicksilverConfigClient;
