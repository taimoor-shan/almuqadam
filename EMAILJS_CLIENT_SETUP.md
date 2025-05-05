# EmailJS Client-Side Setup for Contact Form

This document explains how to set up EmailJS for the contact form on the 509 Real Estate Services website.

## Overview

The contact form now uses EmailJS to send emails directly from the client-side when users submit the form. EmailJS is a service that allows you to send emails directly from client-side JavaScript without setting up your own email server.

## Current Implementation

The contact form has been updated to use EmailJS directly in the client-side code. This approach:

1. Eliminates the need for a server-side email endpoint
2. Simplifies the email sending process
3. Reduces the complexity of the codebase

## EmailJS Configuration

The following environment variables are used for EmailJS:

```
# EmailJS Configuration (Client-side)
PUBLIC_EMAILJS_SERVICE_ID=service_8cwmez4
PUBLIC_EMAILJS_TEMPLATE_ID=template_p910m7p
PUBLIC_EMAILJS_PUBLIC_KEY=_fFSJ62eMeH1mVe-p
EMAIL_TO=realestate509llc@gmail.com
```

Note that these variables have the `PUBLIC_` prefix to make them accessible in client-side code in SvelteKit.

## How It Works

1. When the contact form is submitted, the `handleSubmit` function is called
2. The function prepares the template parameters with the form data
3. EmailJS is used to send the email directly from the client
4. A success message is shown to the user upon successful submission

## EmailJS Account Management

### Accessing Your EmailJS Dashboard

1. Go to [EmailJS](https://www.emailjs.com/) and sign in with your account
2. From the dashboard, you can:
   - Monitor your email sending activity
   - View your email templates
   - Manage your email services
   - Check your usage and billing

### Email Templates

Your current template ID is `template_p910m7p`. You can view and edit this template in the EmailJS dashboard:

1. Go to "Email Templates"
2. Find the template with ID `template_p910m7p`
3. Click "Edit" to modify the template

The template uses the following variables:
- `{{from_name}}` - The name of the person submitting the form
- `{{from_email}}` - The email of the person submitting the form
- `{{phone}}` - The phone number provided
- `{{interested_in}}` - What the person is interested in
- `{{message}}` - The message content
- `{{to_email}}` - The recipient email address

### Email Services

Your current service ID is `service_8cwmez4`. This service is connected to your email provider. You can manage this service in the EmailJS dashboard:

1. Go to "Email Services"
2. Find the service with ID `service_8cwmez4`
3. Click "Edit" to modify the service settings

## Testing

To test the email functionality:

1. Fill out the contact form on the website
2. Submit the form
3. Check the recipient email inbox for the message
4. You can also check the "Email History" section in your EmailJS dashboard to see if the email was sent successfully

## Troubleshooting

Common issues:

1. **Authentication Failed**: Check that your public key is correct
2. **Template Not Found**: Verify your template ID
3. **Service Not Found**: Verify your service ID
4. **Rate Limit Exceeded**: The free tier has a limit of 200 emails per month

## Security Considerations

- The public key is exposed in client-side code, but this is normal and expected with EmailJS
- EmailJS has built-in security measures to prevent abuse
- Consider implementing rate limiting on the form submission to prevent spam

## References

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS JavaScript SDK](https://www.emailjs.com/docs/sdk/installation/)
