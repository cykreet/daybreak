'use strict';

/**
 * qotd router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::qotd.qotd');
