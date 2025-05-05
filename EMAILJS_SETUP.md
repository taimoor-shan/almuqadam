# EmailJS Setup for Contact Form

This document explains how to set up EmailJS for the contact form on the 509 Real Estate Services website.

## Overview

The contact form now uses EmailJS to send emails when users submit the form. EmailJS is a service that allows you to send emails directly from client-side or server-side JavaScript without setting up your own email server or dealing with complex authentication.

## Setup Instructions

### 1. Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for an account
2. The free tier allows 200 emails per month, which should be sufficient for most small business websites

### 2. Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Give your service a name (e.g., "509 Real Estate Contact")
6. Note down the Service ID for later use

### 3. Create an Email Template

1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{from_name}}` - The name of the person submitting the form
   - `{{from_email}}` - The email of the person submitting the form
   - `{{phone}}` - The phone number provided
   - `{{interested_in}}` - What the person is interested in
   - `{{message}}` - The message content
   - `{{to_email}}` - The recipient email address

4. Here's a sample template:

```html
<!DOCTYPE html>
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body>
    <h2>New Contact Form Submission from {{from_name}}</h2>
    <p><strong>Name:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Phone:</strong> {{phone}}</p>
    <p><strong>Interested In:</strong> {{interested_in}}</p>
    <p><strong>Message:</strong></p>
    <p>{{message}}</p>
</body>
</html>
```

5. Save your template and note down the Template ID

### 4. Get Your API Keys

1. In your EmailJS dashboard, go to "Account" > "API Keys"
2. Note down your Public Key
3. Generate a Private Key if you don't already have one
4. Note down your Private Key

### 5. Update Environment Variables

Update your `.env` file with the EmailJS credentials:

```
# EmailJS Configuration
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_PUBLIC_KEY=your_public_key_here
EMAILJS_PRIVATE_KEY=your_private_key_here
EMAIL_TO=509realestateservicesllc@gmail.com
```

Replace the placeholder values with your actual EmailJS credentials.

## Testing

To test the email functionality:

1. Make sure your `.env` file is properly configured with all EmailJS credentials
2. Fill out the contact form on the website
3. Submit the form
4. Check the recipient email inbox for the message
5. You can also check the "Email History" section in your EmailJS dashboard to see if the email was sent successfully

## Troubleshooting

Common issues:

1. **Authentication Failed**: Check that your API keys are correct
2. **Template Not Found**: Verify your template ID
3. **Service Not Found**: Verify your service ID
4. **Rate Limit Exceeded**: The free tier has a limit of 200 emails per month

## Security Considerations

- Never expose your Private Key in client-side code
- The implementation in this project uses server-side sending, which is more secure
- Consider implementing rate limiting to prevent abuse of the contact form

## References

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS NodeJS SDK](https://www.emailjs.com/docs/sdk/installation/)
