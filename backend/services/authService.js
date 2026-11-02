/**
 * Authentication Service
 * Implements Unified Multi-Role Authentication, Password Management & OTP Flows
 * Uses parameterized queries only. Never exposes password_hash or OTP.
 */

const { pool } = require('../config/db');
const { ROLES, ROLE_IDS } = require('../config/constants');
const { hashPassword, comparePassword } = require('../helpers/password');
const { generateOtp, getOtpExpiry } = require('../helpers/otp');
const { signToken } = require('../helpers/jwt');
const { sendMail, getOtpEmailTemplate } = require('../helpers/mailer');
const logger = require('../config/logger');

const authService = {
  /**
   * Unified Login across Super Admin, Hospital Admin, Doctor, Staff, Patient
   */
  async login({ email, password, roleHint }) {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check Super Admin
    if (!roleHint || roleHint === ROLES.SUPER_ADMIN) {
      const [rows] = await pool.execute(
        `SELECT id, full_name, email, mobile_number, password_hash, is_temporary_password, status_flag 
         FROM tbl_super_admin 
         WHERE LOWER(email) = ? AND status_flag = 1 LIMIT 1`,
        [cleanEmail]
      );

      if (rows.length > 0) {
        const user = rows[0];
        const match = await comparePassword(password, user.password_hash);
        if (match) {
          const token = signToken({
            id: user.id,
            name: user.full_name,
            email: user.email,
            role: ROLES.SUPER_ADMIN,
            role_id: ROLE_IDS.SUPER_ADMIN,
            is_temporary_password: Boolean(user.is_temporary_password)
          });

          return {
            token,
            user: {
              id: user.id,
              name: user.full_name,
              email: user.email,
              mobile_number: user.mobile_number,
              role: ROLES.SUPER_ADMIN,
              role_id: ROLE_IDS.SUPER_ADMIN,
              is_temporary_password: Boolean(user.is_temporary_password)
            }
          };
        }
      }
    }

    // 2. Check Hospital Admin (and fetch their hospital_id)
    if (!roleHint || roleHint === ROLES.HOSPITAL_ADMIN) {
      const [rows] = await pool.execute(
        `SELECT a.id, a.full_name, a.email, a.mobile_number, a.password_hash, a.is_temporary_password, a.status_flag,
                h.id AS hospital_id, h.hospital_name
         FROM tbl_admin a
         LEFT JOIN tbl_hospitals h ON h.admin_id = a.id
         WHERE LOWER(a.email) = ? AND a.status_flag = 1 LIMIT 1`,
        [cleanEmail]
      );

      if (rows.length > 0) {
        const user = rows[0];
        const match = await comparePassword(password, user.password_hash);
        if (match) {
          const token = signToken({
            id: user.id,
            name: user.full_name,
            email: user.email,
            role: ROLES.HOSPITAL_ADMIN,
            role_id: ROLE_IDS.HOSPITAL_ADMIN,
            hospital_id: user.hospital_id || null,
            is_temporary_password: Boolean(user.is_temporary_password)
          });

          return {
            token,
            user: {
              id: user.id,
              name: user.full_name,
              email: user.email,
              mobile_number: user.mobile_number,
              role: ROLES.HOSPITAL_ADMIN,
              role_id: ROLE_IDS.HOSPITAL_ADMIN,
              hospital_id: user.hospital_id || null,
              hospital_name: user.hospital_name || 'Hospital',
              is_temporary_password: Boolean(user.is_temporary_password)
            }
          };
        }
      }
    }

    // 3. Check Doctor (fetches hospital_id and department_id)
    if (!roleHint || roleHint === ROLES.DOCTOR) {
      const [rows] = await pool.execute(
        `SELECT d.id, d.doctor_name AS full_name, d.email, d.mobile_number, d.password_hash, 
                d.is_temporary_password, d.hospital_id, d.department_id, d.status_flag,
                h.hospital_name
         FROM tbl_doctors d
         LEFT JOIN tbl_hospitals h ON h.id = d.hospital_id
         WHERE LOWER(d.email) = ? AND d.status_flag = 1 LIMIT 1`,
        [cleanEmail]
      );

      if (rows.length > 0) {
        const user = rows[0];
        const match = await comparePassword(password, user.password_hash);
        if (match) {
          const token = signToken({
            id: user.id,
            name: user.full_name,
            email: user.email,
            role: ROLES.DOCTOR,
            role_id: ROLE_IDS.DOCTOR,
            hospital_id: user.hospital_id,
            department_id: user.department_id,
            is_temporary_password: Boolean(user.is_temporary_password)
          });

          return {
            token,
            user: {
              id: user.id,
              name: user.full_name,
              email: user.email,
              mobile_number: user.mobile_number,
              role: ROLES.DOCTOR,
              role_id: ROLE_IDS.DOCTOR,
              hospital_id: user.hospital_id,
              hospital_name: user.hospital_name || 'Hospital',
              department_id: user.department_id,
              is_temporary_password: Boolean(user.is_temporary_password)
            }
          };
        }
      }
    }

    // 4. Check Staff (fetches hospital_id and department_id)
    if (!roleHint || roleHint === ROLES.STAFF) {
      const [rows] = await pool.execute(
        `SELECT s.id, s.full_name, s.email, s.mobile_number, s.password_hash, 
                s.is_temporary_password, s.hospital_id, s.department_id, s.status_flag,
                h.hospital_name
         FROM tbl_staffs s
         LEFT JOIN tbl_hospitals h ON h.id = s.hospital_id
         WHERE LOWER(s.email) = ? AND s.status_flag = 1 LIMIT 1`,
        [cleanEmail]
      );

      if (rows.length > 0) {
        const user = rows[0];
        const match = await comparePassword(password, user.password_hash);
        if (match) {
          const token = signToken({
            id: user.id,
            name: user.full_name,
            email: user.email,
            role: ROLES.STAFF,
            role_id: ROLE_IDS.STAFF,
            hospital_id: user.hospital_id,
            department_id: user.department_id,
            is_temporary_password: Boolean(user.is_temporary_password)
          });

          return {
            token,
            user: {
              id: user.id,
              name: user.full_name,
              email: user.email,
              mobile_number: user.mobile_number,
              role: ROLES.STAFF,
              role_id: ROLE_IDS.STAFF,
              hospital_id: user.hospital_id,
              hospital_name: user.hospital_name || 'Hospital',
              department_id: user.department_id,
              is_temporary_password: Boolean(user.is_temporary_password)
            }
          };
        }
      }
    }

    // 5. Check Patient
    if (!roleHint || roleHint === ROLES.PATIENT) {
      const [rows] = await pool.execute(
        `SELECT id, full_name, email, mobile_number, password_hash, is_temporary_password, profile_completed, status_flag
         FROM tbl_patients 
         WHERE LOWER(email) = ? AND status_flag = 1 LIMIT 1`,
        [cleanEmail]
      );

      if (rows.length > 0) {
        const user = rows[0];
        const match = await comparePassword(password, user.password_hash);
        if (match) {
          const token = signToken({
            id: user.id,
            name: user.full_name,
            email: user.email,
            role: ROLES.PATIENT,
            role_id: ROLE_IDS.PATIENT,
            profile_completed: Boolean(user.profile_completed),
            is_temporary_password: Boolean(user.is_temporary_password)
          });

          return {
            token,
            user: {
              id: user.id,
              name: user.full_name,
              email: user.email,
              mobile_number: user.mobile_number,
              role: ROLES.PATIENT,
              role_id: ROLE_IDS.PATIENT,
              profile_completed: Boolean(user.profile_completed),
              is_temporary_password: Boolean(user.is_temporary_password)
            }
          };
        }
      }
    }

    throw new Error('Invalid email or password credentials.');
  },

  /**
   * Patient Registration Flow
   */
  async registerPatient({ full_name, email, mobile_number, password, gender, date_of_birth, blood_group }) {
    const cleanEmail = email.trim().toLowerCase();

    // Check duplicate email
    const [existing] = await pool.execute(
      `SELECT id FROM tbl_patients WHERE LOWER(email) = ? LIMIT 1`,
      [cleanEmail]
    );

    if (existing.length > 0) {
      throw new Error('An account with this email address already exists.');
    }

    const hashed = await hashPassword(password);
    const profileCompleted = Boolean(gender && date_of_birth && blood_group) ? 1 : 0;

    const [result] = await pool.execute(
      `INSERT INTO tbl_patients (
        full_name, email, mobile_number, password_hash, is_temporary_password,
        role_id, gender, date_of_birth, blood_group, profile_completed, login_type, status_flag
      ) VALUES (?, ?, ?, ?, 0, 5, ?, ?, ?, ?, 'Local', 1)`,
      [full_name, cleanEmail, mobile_number, hashed, gender || null, date_of_birth || null, blood_group || null, profileCompleted]
    );

    const token = signToken({
      id: result.insertId,
      name: full_name,
      email: cleanEmail,
      role: ROLES.PATIENT,
      role_id: ROLE_IDS.PATIENT,
      profile_completed: Boolean(profileCompleted),
      is_temporary_password: false
    });

    return {
      token,
      user: {
        id: result.insertId,
        name: full_name,
        email: cleanEmail,
        mobile_number,
        role: ROLES.PATIENT,
        role_id: ROLE_IDS.PATIENT,
        profile_completed: Boolean(profileCompleted),
        is_temporary_password: false
      }
    };
  },

  /**
   * Password Change (Mandatory when is_temporary_password = 1)
   */
  async changePassword({ userId, role, oldPassword, newPassword }) {
    let tableName = '';
    if (role === ROLES.SUPER_ADMIN) tableName = 'tbl_super_admin';
    else if (role === ROLES.HOSPITAL_ADMIN) tableName = 'tbl_admin';
    else if (role === ROLES.DOCTOR) tableName = 'tbl_doctors';
    else if (role === ROLES.STAFF) tableName = 'tbl_staffs';
    else if (role === ROLES.PATIENT) tableName = 'tbl_patients';
    else throw new Error('Unrecognized user role.');

    // Fetch user hash
    const [users] = await pool.execute(
      `SELECT id, password_hash, is_temporary_password FROM \`${tableName}\` WHERE id = ? LIMIT 1`,
      [userId]
    );

    if (users.length === 0) {
      throw new Error('User record not found.');
    }

    const user = users[0];

    // If not temporary, verify current old password
    if (!user.is_temporary_password && oldPassword) {
      const match = await comparePassword(oldPassword, user.password_hash);
      if (!match) {
        throw new Error('Current password does not match.');
      }
    }

    const newHash = await hashPassword(newPassword);

    await pool.execute(
      `UPDATE \`${tableName}\` 
       SET password_hash = ?, is_temporary_password = 0, password_expires_at = NULL, updated_at = NOW() 
       WHERE id = ?`,
      [newHash, userId]
    );

    return { success: true };
  },

  /**
   * Forgot Password - Request 6-digit OTP
   */
  async requestPasswordResetOtp(email) {
    const cleanEmail = email.trim().toLowerCase();
    const otp = generateOtp();
    const expiresAt = getOtpExpiry(10); // 10 minutes

    const tables = ['tbl_super_admin', 'tbl_admin', 'tbl_doctors', 'tbl_staffs', 'tbl_patients'];
    let targetUser = null;
    let targetTable = '';

    for (const table of tables) {
      const nameCol = table === 'tbl_doctors' ? 'doctor_name' : 'full_name';
      const [rows] = await pool.execute(
        `SELECT id, ${nameCol} AS name, email FROM \`${table}\` WHERE LOWER(email) = ? LIMIT 1`,
        [cleanEmail]
      );
      if (rows.length > 0) {
        targetUser = rows[0];
        targetTable = table;
        break;
      }
    }

    if (!targetUser) {
      // Do not disclose whether email exists for security
      return { success: true, message: 'If an account exists, a verification code has been dispatched.' };
    }

    await pool.execute(
      `UPDATE \`${targetTable}\` 
       SET otp = ?, otp_expires_at = ?, otp_used = 0 
       WHERE id = ?`,
      [otp, expiresAt, targetUser.id]
    );

    // Send email
    const emailTemplate = getOtpEmailTemplate({
      name: targetUser.name,
      otp
    });

    await sendMail({
      to: cleanEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text
    });

    return { success: true, message: 'Verification OTP has been dispatched to your email.' };
  },

  /**
   * Verify OTP
   */
  async verifyOtp({ email, otp }) {
    const cleanEmail = email.trim().toLowerCase();
    const tables = ['tbl_super_admin', 'tbl_admin', 'tbl_doctors', 'tbl_staffs', 'tbl_patients'];

    for (const table of tables) {
      const [rows] = await pool.execute(
        `SELECT id, otp, otp_expires_at, otp_used FROM \`${table}\` WHERE LOWER(email) = ? LIMIT 1`,
        [cleanEmail]
      );
      if (rows.length > 0) {
        const u = rows[0];
        if (u.otp !== otp || u.otp_used === 1) {
          throw new Error('Invalid or expired OTP code.');
        }
        if (new Date(u.otp_expires_at) < new Date()) {
          throw new Error('OTP code has expired.');
        }
        return { success: true, message: 'OTP verified successfully.' };
      }
    }

    throw new Error('User not found.');
  },

  /**
   * Reset Password with Verified OTP
   */
  async resetPasswordWithOtp({ email, otp, newPassword }) {
    const cleanEmail = email.trim().toLowerCase();
    const tables = ['tbl_super_admin', 'tbl_admin', 'tbl_doctors', 'tbl_staffs', 'tbl_patients'];

    for (const table of tables) {
      const [rows] = await pool.execute(
        `SELECT id, otp, otp_expires_at, otp_used FROM \`${table}\` WHERE LOWER(email) = ? LIMIT 1`,
        [cleanEmail]
      );

      if (rows.length > 0) {
        const u = rows[0];
        if (u.otp !== otp || u.otp_used === 1) {
          throw new Error('Invalid or already used OTP.');
        }
        if (new Date(u.otp_expires_at) < new Date()) {
          throw new Error('OTP has expired.');
        }

        const newHash = await hashPassword(newPassword);

        await pool.execute(
          `UPDATE \`${table}\` 
           SET password_hash = ?, otp_used = 1, is_temporary_password = 0, password_expires_at = NULL 
           WHERE id = ?`,
          [newHash, u.id]
        );

        return { success: true, message: 'Password has been reset successfully. You can now login.' };
      }
    }

    throw new Error('User not found.');
  }
};

module.exports = authService;
