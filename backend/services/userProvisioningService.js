/**
 * Reusable User Provisioning Service
 * Implements Section 6.5:
 * generate temp password -> hash -> save with is_temporary_password = 1 -> email credentials
 */

const { generateTemporaryPassword, hashPassword } = require('../helpers/password');
const { sendMail, getCredentialsEmailTemplate } = require('../helpers/mailer');
const logger = require('../config/logger');

/**
 * Provision an internal user (Admin, Doctor, or Staff)
 * @param {Object} options
 * @param {string} options.roleName - e.g. 'Hospital Admin', 'Doctor', 'Staff'
 * @param {string} options.name - User's full name
 * @param {string} options.email - User's unique login email
 * @param {Function} options.saveUserCallback - Callback that receives { passwordHash, temporaryPassword, passwordExpiresAt } and executes INSERT query
 * @param {string} [options.loginUrl] - Optional portal URL
 */
async function createUserWithTemporaryPassword({ roleName, name, email, saveUserCallback, loginUrl }) {
  // 1. Generate strong temporary password
  const temporaryPassword = generateTemporaryPassword(roleName.replace(/\s+/g, '').slice(0, 4));

  // 2. Hash password with bcrypt
  const passwordHash = await hashPassword(temporaryPassword);

  // 3. Temporary password expiry (7 days validity)
  const passwordExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // 4. Execute database save callback
  const savedUser = await saveUserCallback({
    passwordHash,
    temporaryPassword,
    passwordExpiresAt
  });

  // 5. Dispatch credentials email
  const emailTemplate = getCredentialsEmailTemplate({
    name,
    role: roleName,
    email,
    temporaryPassword,
    loginUrl
  });

  try {
    await sendMail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text
    });
  } catch (mailErr) {
    logger.error('Failed to dispatch credentials email to %s: %s', email, mailErr.message);
  }

  return {
    user: savedUser,
    temporaryPassword // returned so caller/tester can inspect or display during local setup
  };
}

module.exports = {
  createUserWithTemporaryPassword
};
