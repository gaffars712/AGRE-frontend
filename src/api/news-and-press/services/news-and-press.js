'use strict';

/**
 * news-and-press service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-and-press.news-and-press');
