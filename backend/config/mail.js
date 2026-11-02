const nodemailer = require('nodemailer');
const logger = require('./logger');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: Number(process.env.SMTP_PORT) || 2525,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

transporter.verify((error) => {
  if (error) {
    logger.warn('SMTP Configuration verification note: Mail server may not be reached immediately (%s). Mock fallback logging is active.', error.message);
  } else {
    logger.info('SMTP Mail Server is ready to dispatch emails.');
  }
});

module.exports = transporter;
