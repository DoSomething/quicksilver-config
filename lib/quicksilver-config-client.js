'use strict';

const request = require('superagent');

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
        if (!opts.baseURI) {
            throw new TypeError('Option baseURI is required.');
        }

        // Parse options.
        this.baseURI = opts.baseURI;

        // Defaults.
        this.VERSION = VERSION;
    }

}

module.exports = QuicksilverConfigClient;
