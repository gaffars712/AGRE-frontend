'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::contact-us-form.contact-us-form', {
  config: {
    create: {
      policies: [],
      middlewares: [],
    },
  },
  routes: [
    {
      method: 'POST',
      path: '/contact-us-form/send-email',
      handler: 'contact-us-form.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
});
