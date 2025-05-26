import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, EMAIL_TO } from '$env/static/private';

export async function POST({ request }) {
  try {
    const data = await request.json();

    // Create transporter with your SpaceMail SMTP settings
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      debug: process.env.DEBUG_LOGS === 'true', // Only enable debug in development when explicitly requested
      logger: process.env.DEBUG_LOGS === 'true' // Only log when debugging
    });

    // Only log authentication info when debugging
    if (process.env.DEBUG_LOGS === 'true') {
      console.log(`Attempting to connect to SMTP server with user: ${SMTP_USER}`);
    }

    // Configure email options
    const mailOptions = {
      from: `"Contact Form" <${SMTP_USER}>`,
      to: data.to_email || EMAIL_TO,
      replyTo: data.from_email, // Add reply-to field with the submitter's email
      // Use custom subject if provided, otherwise use default
      subject: data.subject || `New contact form submission from ${data.from_name}`,
      html: `
        <h2>${data.country_name ? `${data.country_name} Visa Inquiry` : 'New Contact Form Submission'}</h2>
        <p><strong>Name:</strong> ${data.from_name}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        ${data.current_visa_status ? `<p><strong>Current Visa Status:</strong> ${data.current_visa_status}</p>` : ''}
        ${data.visa_needed ? `<p><strong>Visa Needed:</strong> ${data.visa_needed}</p>` : ''}
        ${data.country_name ? `<p><strong>Country:</strong> ${data.country_name}</p>` : ''}
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
        ${data.contact_consent ? `<p><strong>Contact Consent:</strong> ${data.contact_consent}</p>` : ''}
      `
    };

    if (process.env.DEBUG_LOGS === 'true') {
      console.log('Sending email to:', mailOptions.to);
    }

    // Send email
    const info = await transporter.sendMail(mailOptions);

    if (process.env.DEBUG_LOGS === 'true') {
      console.log('Email sent successfully! Message ID:', info.messageId);
    }

    return json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
