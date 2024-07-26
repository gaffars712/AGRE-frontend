'use strict';

/**
 * all-news service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::all-news.all-news');
