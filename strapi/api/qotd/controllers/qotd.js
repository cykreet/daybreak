'use strict';

/**
 * qotd controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::qotd.qotd');
