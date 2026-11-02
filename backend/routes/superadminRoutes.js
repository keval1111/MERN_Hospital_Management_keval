/**
 * Super Admin Route Skeletons
 * Restricted to Super Admin role
 */

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');
const { ROLES } = require('../config/constants');
const { sendSuccess } = require('../helpers/response');

router.use(authenticate, authorizeRoles(ROLES.SUPER_ADMIN));

// Overview & Analytics Skeleton
router.get('/dashboard/stats', (req, res) => {
  sendSuccess(res, 'Super Admin Dashboard Stats Skeleton', {
    total_hospitals: 0,
    active_hospitals: 0,
    total_doctors: 0,
    total_patients: 0
  });
});

// Hospital Onboarding Skeleton
router.post('/hospitals', (req, res) => {
  sendSuccess(res, 'Super Admin Create Hospital Skeleton (Accepts hospital + admin details)', {
    status: 'Ready for full module implementation'
  });
});

router.get('/hospitals', (req, res) => {
  sendSuccess(res, 'Super Admin List Hospitals Skeleton', []);
});

router.patch('/hospitals/:id/status', (req, res) => {
  sendSuccess(res, `Hospital #${req.params.id} Status Toggle Skeleton`, {
    hospital_id: req.params.id,
    status_flag: req.body.status_flag
  });
});

module.exports = router;
