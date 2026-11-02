const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');
const tenantGuard = require('../middleware/tenant');
const { ROLES } = require('../config/constants');
const { sendSuccess } = require('../helpers/response');

router.use(authenticate, authorizeRoles(ROLES.HOSPITAL_ADMIN), tenantGuard);

router.get('/dashboard', (req, res) => {
  sendSuccess(res, 'Hospital Admin Dashboard Skeleton', {
    hospital_id: req.tenantHospitalId,
    total_doctors: 0,
    total_departments: 0,
    today_appointments: 0
  });
});

// Department Selection from Master
router.post('/departments/select', (req, res) => {
  sendSuccess(res, 'Select Department for Hospital Skeleton', req.body);
});

router.get('/departments', (req, res) => {
  sendSuccess(res, 'Hospital Departments List Skeleton', []);
});

// Doctor Provisioning
router.post('/doctors', (req, res) => {
  sendSuccess(res, 'Onboard Doctor Skeleton (Triggers temporary password & email)', req.body);
});

router.get('/doctors', (req, res) => {
  sendSuccess(res, 'Hospital Doctors List Skeleton', []);
});

// Staff Provisioning
router.post('/staff', (req, res) => {
  sendSuccess(res, 'Onboard Staff Member Skeleton (Triggers temporary password & email)', req.body);
});

router.get('/staff', (req, res) => {
  sendSuccess(res, 'Hospital Staff List Skeleton', []);
});

module.exports = router;
