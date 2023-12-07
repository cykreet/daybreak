'use strict';

/**
 * qotd service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::qotd.qotd');
