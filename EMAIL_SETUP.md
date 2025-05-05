# Email Setup for Contact Form

This document explains how to set up the email functionality for the contact form on the 509 Real Estate Services website.

## Overview

The contact form uses Nodemailer to send emails when users submit the form. The form data is sent to a server endpoint that processes the data and sends an email to the specified recipient.

## Configuration

### 1. SMTP Settings

You need to configure the SMTP settings in the `.env` file. The following variables are required:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_TO=recipient_email@example.com
```

### 2. Gmail App Password Setup

If you're using Gmail as your SMTP provider, you'll need to create an App Password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Select "Security" from the left menu
3. Under "Signing in to Google," select "2-Step Verification" (you must have this enabled)
4. At the bottom of the page, select "App passwords"
5. Select "Mail" as the app and "Other" as the device (name it "509 Real Estate Website")
6. Click "Generate"
7. Copy the 16-character password that appears
8. Paste this password as the value for `SMTP_PASS` in your `.env` file

### 3. Other Email Providers

If you're using a different email provider, you'll need to adjust the SMTP settings accordingly:

- **Outlook/Office 365**:
  ```
  SMTP_HOST=smtp.office365.com
  SMTP_PORT=587
  ```

- **Yahoo Mail**:
  ```
  SMTP_HOST=smtp.mail.yahoo.com
  SMTP_PORT=587
  ```

## Testing

To test the email functionality:

1. Make sure your `.env` file is properly configured
2. Fill out the contact form on the website
3. Submit the form
4. Check the recipient email inbox for the message

If you encounter any issues, check the server logs for error messages.

## Troubleshooting

Common issues:

1. **Authentication Failed**: Check that your SMTP username and password are correct
2. **Connection Refused**: Make sure the SMTP host and port are correct
3. **Timeout**: Check your internet connection or firewall settings
4. **Gmail Security**: If using Gmail, make sure you've created an App Password and not using your regular password

## Security Considerations

- Never commit your `.env` file to version control
- Regularly rotate your app passwords
- Consider implementing rate limiting to prevent abuse of the contact form
