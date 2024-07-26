'use strict';

/**
 * whistleblowing service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::whistleblowing.whistleblowing');
