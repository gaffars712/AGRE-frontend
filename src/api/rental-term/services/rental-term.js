'use strict';

/**
 * rental-term service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::rental-term.rental-term');
