'use strict';

/**
 * register-label service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::register-label.register-label');
