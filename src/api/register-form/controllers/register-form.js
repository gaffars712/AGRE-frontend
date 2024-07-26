'use strict';

/**
 * register-form controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::register-form.register-form', ({ strapi }) => ({
    async create(ctx) {
        console.log('Request body:', ctx.request.body.data);

        const { fullName, email, projectName, comment, nationality, unitType, number, formType } = ctx.request.body.data;
        console.log(fullName, email, projectName, comment, nationality, unitType, number, formType);

        // Save the form submission
        const entry = await strapi.entityService.create('api::register-form.register-form', {
            data: {
                fullName,
                email,
                projectName,
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
                text: `Hi ${fullName},
            
            Thank you for reaching out to us. We have received your request regarding: "${projectName}". Our team will review it and get back to you shortly. If you have any further questions, feel free to contact us.
            
            Best regards,
            Al Ghandi Properties`,
                html: `<p>Hi ${fullName},</p>
            <p>Thank you for reaching out to us. We have received your request regarding: "${projectName}". Our team will review it and get back to you shortly. If you have any further questions, feel free to contact us.</p>
            <p>Best regards,<br>Al Ghandi Properties</p>`,
            });
            

            // Send email to the admin
            await strapi.plugins['email'].services.email.send({
                to: process.env.ADMIN_EMAIL,
                from: 'shaikhgaffar@sdlccorp.com',
                subject: 'New Contact Form Submission',
                text: `Dear Admin,
            
            You have received a new contact form submission. Here are the details:
            
            Name: ${fullName}
            Email: ${email}
            Project Name: ${projectName}
            Details: ${comment}, ${nationality}, ${unitType}, ${number}, ${formType}
            
            Please follow up with the user at your earliest convenience.
            
            Best regards,
            Your Website Team`,
                html: `<p>Dear Admin,</p>
            <p>You have received a new contact form submission. Here are the details:</p>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project Name:</strong> ${projectName}</p>
            <p><strong>Details:</strong> ${comment}, ${nationality}, ${unitType}, ${number}, ${formType}</p>
            <p>Please follow up with the user at your earliest convenience.</p>
            <p>Best regards,<br>Your Website Team</p>`,
            });
            ctx.send({ message: 'Form submitted successfully' });
        } catch (err) {
            console.error('Error sending email:', err);
            ctx.throw(500, 'Failed to send email');
        }
    },
}));
