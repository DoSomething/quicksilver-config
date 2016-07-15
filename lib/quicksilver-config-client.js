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
        // Todo: define class.
        const exchangeSettings = settings.rabbit.exchanges[exchangeName];
        const exchange = {
          name: exchangeName,
          // Todo: check expected types.
          type: exchangeSettings.type,
          options: {
            // If true, the exchange will survive broker restarts.
            // Defaults to true.
            durable: !(exchangeSettings.durable === false),
            // If true, messages cannot be published directly to the exchange
            // (i.e., it can only be the target of bindings, or possibly create
            // messages ex-nihilo).
            // Defaults to false.
            // Todo: match to config.
            internal: false,
            // If true, the exchange will be destroyed once the number of
            // bindings for which it is the source drop to zero.
            // Defaults to false.
            autoDelete: !(exchangeSettings.auto_delete === false),
            // Todo: figure out.
            alternateExchange: '',
            // Todo: figure out.
            arguments: {},
          },
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
