const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  HOSPITAL_ADMIN: 'Hospital Admin',
  DOCTOR: 'Doctor',
  STAFF: 'Staff',
  PATIENT: 'Patient'
};

const ROLE_IDS = {
  SUPER_ADMIN: 1,
  HOSPITAL_ADMIN: 2,
  DOCTOR: 3,
  STAFF: 4,
  PATIENT: 5
};

const APPOINTMENT_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  REJECTED: 'Rejected',
  IN_WAITING: 'In Waiting',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  ADMITTED: 'Admitted'
};

const PAYMENT_MODES = {
  CASH: 'Cash',
  UPI: 'UPI'
};

const APPOINTMENT_TYPES = {
  VISIT_HOSPITAL: 'Visit Hospital',
  ONLINE_CONSULTATION: 'Online Consultation',
  OTHERS: 'Others'
};

const STATUS_FLAG = {
  ACTIVE: 1,
  INACTIVE: 0
};

module.exports = {
  ROLES,
  ROLE_IDS,
  APPOINTMENT_STATUS,
  PAYMENT_MODES,
  APPOINTMENT_TYPES,
  STATUS_FLAG
};
