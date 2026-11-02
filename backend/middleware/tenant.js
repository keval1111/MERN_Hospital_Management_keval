const { ROLES } = require('../config/constants');
const { sendError } = require('../helpers/response');

function tenantGuard(req, res, next) {
  if (!req.user) {
    return sendError(res, 'Authentication required for tenant verification.', 401);
  }

  // Super Admin has global platform-wide access
  if (req.user.role === ROLES.SUPER_ADMIN) {
    return next();
  }

  // Patients access data through their own identity, guarded per endpoint
  if (req.user.role === ROLES.PATIENT) {
    return next();
  }

  // For Hospital Admin, Doctor, and Staff:
  const userHospitalId = req.user.hospital_id;
  if (!userHospitalId) {
    return sendError(res, 'Security Violation: User is not linked to any hospital tenant.', 403);
  }

  // Check if a specific hospital_id was requested in route params, query, or body
  const requestedHospitalId = Number(req.params.hospital_id || req.query.hospital_id || req.body.hospital_id);

  if (requestedHospitalId && requestedHospitalId !== Number(userHospitalId)) {
    return sendError(
      res,
      `Cross-Tenant Access Prohibited: You cannot access data for Hospital #${requestedHospitalId}.`,
      403
    );
  }

  // Auto-inject verified tenant ID into request context for controller safety
  req.tenantHospitalId = Number(userHospitalId);
  next();
}

module.exports = tenantGuard;
