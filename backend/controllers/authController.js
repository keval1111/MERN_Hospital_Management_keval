const Joi = require('joi');
const authService = require('../services/authService');
const { sendSuccess, sendError } = require('../helpers/response');

// Validation Schemas
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  roleHint: Joi.string().optional().allow('')
});

const registerPatientSchema = Joi.object({
  full_name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  mobile_number: Joi.string().min(8).max(20).required(),
  password: Joi.string().min(6).max(100).required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
  date_of_birth: Joi.date().iso().optional(),
  blood_group: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-').optional()
});

const changePasswordSchema = Joi.object({
  old_password: Joi.string().optional().allow(''),
  new_password: Joi.string().min(6).max(100).required()
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required()
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
  new_password: Joi.string().min(6).max(100).required()
});

const authController = {
  // POST /api/v1/auth/login
  async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) return sendError(res, error.details[0].message, 400);

      const result = await authService.login(value);
      return sendSuccess(res, 'Login successful', result);
    } catch (err) {
      return sendError(res, err.message, 401, err);
    }
  },

  // POST /api/v1/auth/register (Patient)
  async register(req, res, next) {
    try {
      const { error, value } = registerPatientSchema.validate(req.body);
      if (error) return sendError(res, error.details[0].message, 400);

      const result = await authService.registerPatient(value);
      return sendSuccess(res, 'Registration successful', result, 201);
    } catch (err) {
      return sendError(res, err.message, 400, err);
    }
  },

  // POST /api/v1/auth/change-password
  async changePassword(req, res, next) {
    try {
      const { error, value } = changePasswordSchema.validate(req.body);
      if (error) return sendError(res, error.details[0].message, 400);

      await authService.changePassword({
        userId: req.user.id,
        role: req.user.role,
        oldPassword: value.old_password,
        newPassword: value.new_password
      });

      return sendSuccess(res, 'Password updated successfully. You can now use your new password.');
    } catch (err) {
      return sendError(res, err.message, 400, err);
    }
  },

  // POST /api/v1/auth/forgot-password
  async forgotPassword(req, res, next) {
    try {
      const { error, value } = forgotPasswordSchema.validate(req.body);
      if (error) return sendError(res, error.details[0].message, 400);

      const result = await authService.requestPasswordResetOtp(value.email);
      return sendSuccess(res, result.message);
    } catch (err) {
      return sendError(res, err.message, 400, err);
    }
  },

  // POST /api/v1/auth/verify-otp
  async verifyOtp(req, res, next) {
    try {
      const { error, value } = verifyOtpSchema.validate(req.body);
      if (error) return sendError(res, error.details[0].message, 400);

      const result = await authService.verifyOtp(value);
      return sendSuccess(res, result.message);
    } catch (err) {
      return sendError(res, err.message, 400, err);
    }
  },

  // POST /api/v1/auth/reset-password
  async resetPassword(req, res, next) {
    try {
      const { error, value } = resetPasswordSchema.validate(req.body);
      if (error) return sendError(res, error.details[0].message, 400);

      const result = await authService.resetPasswordWithOtp(value);
      return sendSuccess(res, result.message);
    } catch (err) {
      return sendError(res, err.message, 400, err);
    }
  },

  // GET /api/v1/auth/me (Protected current user context)
  async getCurrentUser(req, res, next) {
    try {
      return sendSuccess(res, 'Current user profile context retrieved', {
        user: req.user
      });
    } catch (err) {
      return sendError(res, err.message, 500, err);
    }
  }
};

module.exports = authController;
