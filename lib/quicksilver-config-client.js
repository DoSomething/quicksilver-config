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

  constructor() {
    // Parse options.
    this.qsConfigPath = 'config/rabbitmq_config.json';

    // Confirm config file is found
    this.configFileFound()
      .catch((error) => {
        throw new TypeError('Configuration file missing, error: %s', error);
      });

    // Defaults.
    this.VERSION = VERSION;

    // Todo: cache getAllSettings in this.settings.
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
  getExchangeSettings(exchangeName) {
    return new Promise((resolve) => {
      this.getAllSettings().then((settings) => {
        // Check that exchange exists.
        if (!settings.rabbit.exchanges.hasOwnProperty(exchangeName)) {
          throw new Error('Settings for exchange %s not found.', exchangeName);
        }

        // Build the exchange setting.
        const exchangeSettings = settings.rabbit.exchanges[exchangeName];
        const exchange = {
          name: exchangeName,
          type: exchangeSettings.type,
          options: [
            // Todo: parse options.
          ],
        };
        resolve(exchange);
      });
    });
  }

  /**
   * Check that configuration path (qsConfigPath) value defined in .env as QS_CONFIG_PATH
   * is a valid path.
   */
  configFileFound() {
    return new Promise((resolve) => {
      fs.lstat(this.qsConfigPath, (err, stats) => {
        if (err) {
          throw new Error(err);
        }
        if (!stats.isFile()) {
          throw new Error('Configuration file not found at: %s', this.qsConfigPath);
        }
        resolve(true);
      });
    });
  }
}

module.exports = QuicksilverConfigClient;
