/**
 * Appointments Lifecycle Route Skeletons
 * Multi-role accessible endpoints for booking, monitoring and status updates
 */

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { sendSuccess } = require('../helpers/response');

router.use(authenticate);

// Book appointment (Patient or Staff)
router.post('/book', (req, res) => {
  sendSuccess(res, 'Book Appointment Skeleton (Initial Status: Pending)', req.body, 201);
});

// Query appointments with role filtering
router.get('/', (req, res) => {
  sendSuccess(res, 'Appointments Query Skeleton', []);
});

// Update status (Pending -> Confirmed -> In Waiting -> In Progress -> Completed / Admitted / Rejected / Cancelled)
router.patch('/:id/status', (req, res) => {
  sendSuccess(res, `Update Appointment #${req.params.id} Status Skeleton`, {
    appointment_id: req.params.id,
    new_status: req.body.status
  });
});

module.exports = router;
