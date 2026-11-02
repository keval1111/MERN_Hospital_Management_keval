function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Calculate OTP expiry timestamp
 * @param {number} minutes - validity in minutes (default 10)
 */
function getOtpExpiry(minutes = 10) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

module.exports = {
  generateOtp,
  getOtpExpiry
};
