const { sendError } = require('../helpers/response');

/**
 * Higher-order middleware to validate request body, params, or query
 * @param {Object} schema
 * @param {'body'|'query'|'params'} source
 */
function validate(schema, source = 'body') {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map((d) => d.message.replace(/['"]/g, '')).join('; ');
      return sendError(res, `Validation Error: ${details}`, 400);
    }

    req[source] = value;
    next();
  };
}

module.exports = validate;
