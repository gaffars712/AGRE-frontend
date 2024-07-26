'use strict';

/**
 * information-security service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::information-security.information-security');
