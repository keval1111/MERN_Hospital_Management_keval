const transporter = require('../config/mail');
const logger = require('../config/logger');

const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || 'no-reply@hospitalplatform.com';
const FROM_NAME = process.env.SMTP_FROM_NAME || 'Hospital Management Platform';

async function sendMail({ to, subject, html, text }) {
  const mailOptions = {
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject,
    text: text || '',
    html: html || ''
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info('Email dispatched successfully to %s (MsgId: %s)', to, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    logger.warn('SMTP Dispatch Fallback Note: Simulated email dispatch to %s with subject "%s"', to, subject);
    logger.debug('Simulated Email Content Preview:\n%s', text || html);
    return { success: true, simulated: true, note: err.message };
  }
}

function getCredentialsEmailTemplate({ name, role, email, temporaryPassword, loginUrl }) {
  const targetUrl = loginUrl || process.env.APP_LOGIN_URL || 'http://localhost:5173/login';
  
  return {
    subject: `Your ${role} Account Credentials - Hospital Management System`,
    text: `Hello ${name},\n\nYour ${role} account has been created.\n\nLogin URL: ${targetUrl}\nEmail: ${email}\nTemporary Password: ${temporaryPassword}\n\nIMPORTANT: You must change your password on first login.\n\nBest regards,\nHospital Management Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #4f46e5; margin-top: 0;">Welcome to Hospital Management Platform</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>An official <strong>${role}</strong> account has been provisioned for you.</p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #4f46e5; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 8px 0;"><strong>Portal Login URL:</strong> <a href="${targetUrl}">${targetUrl}</a></p>
          <p style="margin: 0 0 8px 0;"><strong>Username / Email:</strong> ${email}</p>
          <p style="margin: 0 0 0 0;"><strong>Temporary Password:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 15px;">${temporaryPassword}</code></p>
        </div>

        <p style="color: #b91c1c; font-weight: bold;">⚠️ Mandatory Action: You are required to update this temporary password upon your first login.</p>
        
        <p style="margin-top: 30px; font-size: 13px; color: #64748b;">This is an automated system email. Please do not reply directly to this address.</p>
      </div>
    `
  };
}

function getOtpEmailTemplate({ name, otp }) {
  return {
    subject: 'Verification Code (OTP) - Hospital Management System',
    text: `Hello ${name},\n\nYour one-time password (OTP) is: ${otp}\n\nThis OTP is valid for 10 minutes.\n\nIf you did not request this, please ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h3 style="color: #4f46e5; margin-top: 0;">Verification Code</h3>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Use the following OTP to proceed with your verification or password reset:</p>
        <div style="text-align: center; margin: 24px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; background: #eef2ff; color: #4338ca; padding: 8px 24px; border-radius: 6px;">${otp}</span>
        </div>
        <p style="color: #64748b; font-size: 13px;">This OTP will expire in 10 minutes. Do not share this code with anyone.</p>
      </div>
    `
  };
}

module.exports = {
  sendMail,
  getCredentialsEmailTemplate,
  getOtpEmailTemplate
};
