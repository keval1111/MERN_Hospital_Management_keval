const { sendError } = require('../helpers/response');

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return sendError(res, 'Authentication context missing.', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        `Forbidden: Role '${req.user.role}' does not have permission to access this resource. Required: [${allowedRoles.join(', ')}]`,
        403
      );
    }

    next();
  };
}

module.exports = authorizeRoles;
