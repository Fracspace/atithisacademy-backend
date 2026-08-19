const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const smtpPort = parseInt(process.env.SMTP_PORT, 10) || 2525;

  // Create transporter configuration
  const transporterConfig = {
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: smtpPort,
    secure: smtpPort === 465, // true for port 465, false for other ports (like 587 or 2525)
    tls: {
      rejectUnauthorized: false, // Bypass self-signed certificate validation errors
    },
  };

  // Only include auth if user and pass are provided in env
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporterConfig.auth = {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    };
  }

  // console.log('SMTP Config Loaded:', {
  //   host: transporterConfig.host,
  //   port: transporterConfig.port,
  //   user: process.env.SMTP_USER,
  //   passLength: process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0,
  //   hasAuth: !!transporterConfig.auth,
  // });

  const transporter = nodemailer.createTransport(transporterConfig);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

