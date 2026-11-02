/**
 * Hospital Staff Route Skeletons
 * Restricted to Staff role (Receptionist, Nurse, Lab, etc.)
 */

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');
const { ROLES } = require('../config/constants');
const { sendSuccess } = require('../helpers/response');

router.use(authenticate, authorizeRoles(ROLES.STAFF, ROLES.HOSPITAL_ADMIN));

router.get('/queue/today', (req, res) => {
  sendSuccess(res, 'Staff Today Patient Queue Skeleton', []);
});

router.patch('/appointments/:id/checkin', (req, res) => {
  sendSuccess(res, `Patient Check-in (Mark In Waiting) for Appointment #${req.params.id} Skeleton`, {
    appointment_id: req.params.id,
    status: 'In Waiting'
  });
});

router.post('/patients/walkin', (req, res) => {
  sendSuccess(res, 'Register Walk-in Patient Skeleton', req.body);
});

module.exports = router;
