/**
 * Patient Portal Route Skeletons
 * Restricted to Patient role
 */

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');
const { ROLES } = require('../config/constants');
const { sendSuccess } = require('../helpers/response');

router.use(authenticate, authorizeRoles(ROLES.PATIENT));

router.get('/profile', (req, res) => {
  sendSuccess(res, 'Patient Profile Details Skeleton', {
    patient_id: req.user.id
  });
});

router.put('/profile', (req, res) => {
  sendSuccess(res, 'Update Patient Profile Skeleton (Allergies, Emergency Contact)', req.body);
});

router.get('/appointments/my', (req, res) => {
  sendSuccess(res, 'My Booked Appointments History Skeleton', []);
});

router.get('/medical-records', (req, res) => {
  sendSuccess(res, 'My Medical Records & Prescriptions Skeleton', []);
});

module.exports = router;
