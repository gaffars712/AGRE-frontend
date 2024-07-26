'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact-us-form.contact-us-form', ({ strapi }) => ({
    async create(ctx) {
        console.log('Request body:', ctx.request.body.data);

        const { name, email, interest, number } = ctx.request.body.data;
        console.log(name, email, interest);

        // Save the form submission
        const entry = await strapi.entityService.create('api::contact-us-form.contact-us-form', {
            data: {
                name,
                email,
                interest,
            },
        });

        try {
            // Log SMTP credentials
            console.log('SMTP_USER:', process.env.SMTP_USER);
            console.log('SMTP_PASS:', process.env.SMTP_PASS);

            // Send email to the user
            let data = await strapi.plugins['email'].services.email.send({
                to: email,
                from: 'shaikhgaffar@sdlccorp.com',
                subject: 'Thank you for contacting us',
                text: `Hi ${name},\n\nThank you for reaching out to us. We have received your request regarding: "${interest}". Our team will review it and get back to you shortly. If you have any further questions, feel free to contact us.\n\nBest regards,\nYour Company`,
                html: `<p>Hi ${name},</p><p>Thank you for reaching out to us. We have received your request regarding: "${interest}". Our team will review it and get back to you shortly. If you have any further questions, feel free to contact us.</p><p>Best regards,<br>Al Ghandi Properties</br></p>`,
            });

            // Send email to the admin
            await strapi.plugins['email'].services.email.send({
                to: process.env.ADMIN_EMAIL,
                from: 'shaikhgaffar@sdlccorp.com',
                subject: 'New Contact Form Submission',
                text: `Dear Admin,\n\nYou have received a new contact form submission. Here are the details:\n\nName: ${name}\nEmail: ${email}\nInterest: ${interest}\nPhone: ${number}\n\nPlease follow up with the user at your earliest convenience.\n\nBest regards,\nYour Website Team`,
                html: `<p>Dear Admin,</p><p>You have received a new contact form submission. Here are the details:</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Interest:</strong> ${interest}</p><p><strong>Phone:</strong> ${number}</p><p>Please follow up with the user at your earliest convenience.</p><p>Best regards,<br>Al Ghandi Properties</p>`,
              });
              
            ctx.send({ message: 'Form submitted successfully' });
        } catch (err) {
            console.error('Error sending email:', err);
            ctx.throw(500, 'Failed to send email');
        }
    },
}));
