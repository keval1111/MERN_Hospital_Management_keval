const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');
const { ROLES } = require('../config/constants');
const { sendSuccess } = require('../helpers/response');

// 1. Department Masters
router.get('/departments', (req, res) => {
  sendSuccess(res, 'Active Department Masters Skeleton', []);
});

router.post('/departments', authenticate, authorizeRoles(ROLES.SUPER_ADMIN), (req, res) => {
  sendSuccess(res, 'Create Department Master Skeleton', req.body, 201);
});

// 2. Designation Masters
router.get('/designations', (req, res) => {
  sendSuccess(res, 'Active Designation Masters Skeleton', []);
});

router.post('/designations', authenticate, authorizeRoles(ROLES.SUPER_ADMIN), (req, res) => {
  sendSuccess(res, 'Create Designation Master Skeleton', req.body, 201);
});

// 3. Location Masters: Countries, States, Cities
router.get('/countries', (req, res) => {
  sendSuccess(res, 'Countries List Skeleton', []);
});

router.get('/states', (req, res) => {
  sendSuccess(res, 'States List Skeleton', []);
});

router.get('/cities', (req, res) => {
  sendSuccess(res, 'Cities List Skeleton', []);
});

module.exports = router;
