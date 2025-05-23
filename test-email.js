import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_TO
} = process.env;

async function testEmail() {
  console.log('Email configuration:');
  console.log(`SMTP_HOST: ${SMTP_HOST}`);
  console.log(`SMTP_PORT: ${SMTP_PORT}`);
  console.log(`SMTP_SECURE: ${SMTP_SECURE}`);
  console.log(`SMTP_USER: ${SMTP_USER}`);
  console.log(`EMAIL_TO: ${EMAIL_TO}`);
  
  try {
    // Create transporter with SMTP settings
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      debug: true, // Enable debug output
      logger: true // Log information about the mail
    });
    
    console.log('Verifying SMTP connection...');
    
    // Verify connection configuration
    await transporter.verify();
    console.log('SMTP connection verified successfully!');
    
    // Configure email options
    const mailOptions = {
      from: `"Test Email" <${SMTP_USER}>`,
      to: EMAIL_TO,
      subject: 'Test Email from Almuqadam',
      html: `
        <h2>This is a test email</h2>
        <p>If you're receiving this, the email configuration is working correctly.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    };
    
    console.log('Sending test email...');
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    
    return { success: true, info };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}

// Run the test
testEmail()
  .then(result => {
    if (result.success) {
      console.log('Email test completed successfully!');
    } else {
      console.error('Email test failed:', result.error);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });
