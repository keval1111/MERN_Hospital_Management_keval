# Hospital Management System - Backend API

Production-ready, multi-tenant backend foundation built with **Node.js, Express.js, and MySQL (mysql2 promise pool)**.

## 🏗️ Architecture & Features

- **Multi-Tenant Isolation**: Multi-tenant data segregation with `tenantGuard` middleware ensuring Hospital Admins, Doctors, and Staff only access their hospital's records.
- **Role-Based Access Control (RBAC)**: Super Admin, Hospital Admin, Doctor, Staff, Patient.
- **Security & Hardening**:
  - Helmet for security headers
  - CORS enabled
  - Strict parameterization on all SQL queries
  - Passwords hashed with `bcryptjs` (10 rounds)
  - JWT Access Tokens with expiration
  - Passwords and OTPs never returned in API payloads
- **Audit Compliance**: Every table contains `status_flag`, `created_by`, `updated_by`, `created_at`, `updated_at`.
- **Automated Logging**: Winston logger with daily rotation (`backend/logs/combined.log` and `error.log`) paired with Morgan HTTP logging.
- **Transactional Emails**: Nodemailer SMTP integration with responsive HTML templates for:
  - Account provisioning with temporary password
  - One-time verification passwords (OTP)
  - Appointment confirmations

---

## 📁 Repository Structure

```text
backend/
├── config/
│   ├── constants.js          # Role IDs, Appointment Statuses, Payment Modes
│   ├── db.js                 # mysql2/promise connection pool & health checker
│   ├── logger.js             # Winston logger configuration
│   └── mail.js               # Nodemailer SMTP transporter configuration
├── controllers/
│   └── authController.js     # Unified login, register, password change & OTP
├── database/
│   ├── schema.sql            # Complete DDL matching strict naming conventions
│   └── seed.sql              # Initial roles, master data & Super Admin account
├── helpers/
│   ├── jwt.js                # JWT sign & verify
│   ├── mailer.js             # HTML email templates & mail dispatcher
│   ├── otp.js                # 6-digit OTP generator & expiry calculator
│   ├── password.js           # Bcrypt hashing & random temporary password generator
│   └── response.js           # Standard { success, message, data } response formatter
├── middleware/
│   ├── auth.js               # JWT bearer token verification
│   ├── errorHandler.js       # Centralized global error handler
│   ├── role.js               # RBAC authorization middleware
│   ├── tenant.js             # Hospital tenant isolation guard
│   ├── upload.js             # Multer image/document upload handler
│   └── validate.js           # Joi schema request validator
├── routes/
│   ├── adminRoutes.js        # Hospital Admin operations skeleton
│   ├── appointmentRoutes.js  # Multi-role appointment lifecycle skeleton
│   ├── authRoutes.js         # Authentication, registration & reset endpoints
│   ├── doctorRoutes.js       # Doctor consultation & queue skeleton
│   ├── masterRoutes.js       # Masters (Dept, Desig, Locations) skeleton
│   ├── patientRoutes.js      # Patient profile & history skeleton
│   ├── staffRoutes.js        # Reception, queue & check-in skeleton
│   └── superadminRoutes.js   # Super Admin platform governance skeleton
├── services/
│   ├── authService.js        # Core authentication, lookup & password change logic
│   └── userProvisioningService.js # Reusable createUserWithTemporaryPassword service
├── stored_procedures/
│   └── procedures.sql        # sp_get_user_by_id, sp_update_appointment_status
├── logs/                     # Winston log files
├── uploads/                  # Uploaded files (.gitkeep)
├── .env.example              # Environment variables template
├── app.js                    # Express application entry point
└── package.json
```

---

## 🚀 Setup & Execution

### 1. Prerequisites
- Node.js (v18+)
- MySQL Server (v8.0+)

### 2. Database Initialization
Open MySQL terminal or Workbench and execute:
```sql
SOURCE database/schema.sql;
SOURCE database/seed.sql;
SOURCE stored_procedures/procedures.sql;
```

### 3. Environment Setup
Copy the template and configure your local credentials:
```bash
cp .env.example .env
```
Ensure you provide your MySQL password in `.env`:
```ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hospital_management_db
```

### 4. Install Dependencies & Start Server
```bash
npm install
npm run dev
```

Server will start on `http://localhost:5000`.

---

## 🔑 Default Super Admin Credentials
- **Email:** `superadmin@hospital.com`
- **Password:** `Admin@123`
