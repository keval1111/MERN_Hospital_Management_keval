const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');
const { ROLES } = require('../config/constants');
const { sendSuccess } = require('../helpers/response');

router.use(authenticate, authorizeRoles(ROLES.DOCTOR));

router.get('/dashboard', (req, res) => {
  sendSuccess(res, 'Doctor Dashboard Stats Skeleton', {
    doctor_id: req.user.id,
    today_appointments: 0,
    waiting_queue: 0,
    completed_consultations: 0
  });
});

router.get('/appointments/today', (req, res) => {
  sendSuccess(res, 'Doctor Today Appointments Schedule Skeleton', []);
});

router.patch('/appointments/:id/review', (req, res) => {
  sendSuccess(res, `Doctor Review Appointment #${req.params.id} Skeleton (Accept / Reject)`, {
    appointment_id: req.params.id,
    action: req.body.action
  });
});

router.post('/appointments/:id/consultation', (req, res) => {
  sendSuccess(res, `Doctor Submit Consultation & Vitals for Appointment #${req.params.id} Skeleton`, req.body);
});

module.exports = router;
