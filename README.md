# Multi-Tenant Hospital Management System (HMS)

Enterprise-grade, multi-tenant healthcare SaaS platform foundation designed for Super Administrators, independent Hospital Administrators, Doctors, Healthcare Staff, and Patients.

---

## 🌟 Architecture Overview

```
                               ┌────────────────────────────────┐
                               │   Centrally Governed Platform  │
                               │          Super Admin           │
                               └───────────────┬────────────────┘
                                               │
                       ┌───────────────────────┴───────────────────────┐
                       ▼                                               ▼
         ┌───────────────────────────┐                   ┌───────────────────────────┐
         │  Hospital Tenant Alpha    │                   │   Hospital Tenant Beta    │
         │  (Admin, Doctors, Staff)  │                   │  (Admin, Doctors, Staff)  │
         └─────────────┬─────────────┘                   └─────────────┬─────────────┘
                       │                                               │
                       └───────────────────────┬───────────────────────┘
                                               ▼
                                 ┌───────────────────────────┐
                                 │   Public Patient Portal   │
                                 │  Directory, Slots & Vitals│
                                 └───────────────────────────┘
```

- **Multi-Tenant Isolation**: Strict segregation using `tenantGuard` middleware ensuring Hospital Admins, Doctors, and Staff are confined to their specific `hospital_id`.
- **RBAC Security Matrix**: Super Admin, Hospital Admin, Doctor, Staff, and Patient roles with token expiration and forced password updates on first login.
- **Strict Database Standards**: All tables adhere to `tbl_` naming, singular nouns, snake_case, primary key `id`, foreign keys `fk_*_id`, and standard audit trail columns (`status_flag`, `created_by`, `updated_by`, `created_at`, `updated_at`).

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Node.js (v18+), Express.js, MySQL (`mysql2` promise pool) |
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Axios, Lucide React |
| **Security & Auth** | JSON Web Tokens (JWT), Bcrypt password hashing, Helmet, Tenant Guard |
| **Validation & Logs** | Joi schema validation, Winston daily logging, Morgan HTTP streaming |
| **Emails & Uploads**| Nodemailer with HTML templates, Multer disk storage |

---

## 📁 Repository Structure

```text
hospital-management/
├── backend/
│   ├── config/
│   │   ├── constants.js          # Role IDs, Appointment Statuses, Payment Modes
│   │   ├── db.js                 # mysql2/promise connection pool & health checker
│   │   ├── logger.js             # Winston logger configuration
│   │   └── mail.js               # Nodemailer SMTP transporter configuration
│   ├── controllers/
│   │   └── authController.js     # Unified login, register, password change & OTP
│   ├── database/
│   │   ├── schema.sql            # Complete DDL matching strict naming conventions
│   │   └── seed.sql              # Initial roles, master data & Super Admin account
│   ├── helpers/
│   │   ├── jwt.js                # JWT sign & verify
│   │   ├── mailer.js             # HTML email templates & mail dispatcher
│   │   ├── otp.js                # 6-digit OTP generator & expiry calculator
│   │   ├── password.js           # Bcrypt hashing & random temporary password generator
│   │   └── response.js           # Standard { success, message, data } response formatter
│   ├── middleware/
│   │   ├── auth.js               # JWT bearer token verification
│   │   ├── errorHandler.js       # Centralized global error handler
│   │   ├── role.js               # RBAC authorization middleware
│   │   ├── tenant.js             # Hospital tenant isolation guard
│   │   ├── upload.js             # Multer image/document upload handler
│   │   └── validate.js           # Joi schema request validator
│   ├── routes/
│   │   ├── adminRoutes.js        # Hospital Admin operations skeleton
│   │   ├── appointmentRoutes.js  # Multi-role appointment lifecycle skeleton
│   │   ├── authRoutes.js         # Authentication, registration & reset endpoints
│   │   ├── doctorRoutes.js       # Doctor consultation & queue skeleton
│   │   ├── masterRoutes.js       # Masters (Dept, Desig, Locations) skeleton
│   │   ├── patientRoutes.js      # Patient profile & history skeleton
│   │   ├── staffRoutes.js        # Reception, queue & check-in skeleton
│   │   └── superadminRoutes.js   # Super Admin platform governance skeleton
│   ├── services/
│   │   ├── authService.js        # Core authentication, lookup & password change logic
│   │   └── userProvisioningService.js # Reusable createUserWithTemporaryPassword service
│   ├── stored_procedures/
│   │   └── procedures.sql        # sp_get_user_by_id, sp_update_appointment_status
│   ├── logs/                     # Winston log files
│   ├── uploads/                  # Uploaded files (.gitkeep)
│   ├── .env.example              # Environment variables template
│   ├── app.js                    # Express application entry point
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI widgets
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth session, role state & temp password flag
│   │   ├── layouts/
│   │   │   ├── SuperAdminLayout.jsx    # Super Admin sidebar navigation layout
│   │   │   ├── HospitalAdminLayout.jsx # Hospital Admin operational layout
│   │   │   ├── DoctorLayout.jsx        # Doctor consultation layout
│   │   │   ├── StaffLayout.jsx         # Staff reception & check-in layout
│   │   │   └── PublicPatientLayout.jsx # Patient public navbar/footer layout
│   │   ├── pages/
│   │   │   ├── auth/             # Login, ChangePassword, ForgotPassword, ResetPassword
│   │   │   ├── superadmin/       # SuperAdminDashboard
│   │   │   ├── admin/            # HospitalAdminDashboard
│   │   │   ├── doctor/           # DoctorDashboard
│   │   │   ├── staff/            # StaffDashboard
│   │   │   └── patient/          # PatientLandingPage, PatientRegister, HospitalList
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx # Route guard with role & forced password change check
│   │   ├── services/
│   │   │   └── api.js            # Axios client with Bearer interceptor & 401 handling
│   │   ├── styles/
│   │   │   └── index.css         # Tailwind directives & glassmorphic styling
│   │   ├── App.jsx               # Application routing tree
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

---

## 🚦 How to Run the Project

### 1. Database Setup (MySQL)
Open your MySQL client (Command Line or Workbench) and run:
```sql
SOURCE backend/database/schema.sql;
SOURCE backend/database/seed.sql;
SOURCE backend/stored_procedures/procedures.sql;
```

### 2. Backend Setup & Boot
```bash
# Navigate to backend directory
cd backend

# Install dependencies (already installed)
npm install

# Configure environment variables
# Copy .env.example to .env and adjust your MySQL password
cp .env.example .env

# Run development server
npm run dev
```
Backend will be live on: `http://localhost:5000`

### 3. Frontend Setup & Boot
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (already installed)
npm install

# Start Vite development server
npm run dev
```
Frontend will be live on: `http://localhost:5173`

---

## 🔐 How to Log In as Super Admin

1. Open `http://localhost:5173/login` in your browser.
2. Enter the seeded Super Admin credentials:
   - **Email:** `superadmin@hospital.com`
   - **Password:** `Admin@123`
3. Click **Sign In**.
4. You will be redirected to the **Super Admin Governance Dashboard** (`/superadmin`).

---

## 📋 API Endpoints Summary

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Unified multi-role login | Public |
| `POST` | `/api/v1/auth/register` | Patient registration | Public |
| `POST` | `/api/v1/auth/forgot-password` | Request 6-digit OTP | Public |
| `POST` | `/api/v1/auth/verify-otp` | Verify 6-digit OTP | Public |
| `POST` | `/api/v1/auth/reset-password` | Reset password using OTP | Public |
| `POST` | `/api/v1/auth/change-password` | Update password (clears temporary flag) | Authenticated |
| `GET` | `/api/v1/auth/me` | Fetch active user profile context | Authenticated |

### Route Skeletons Mounted
- `/api/v1/superadmin/*` (Protected: Super Admin)
- `/api/v1/admin/*` (Protected: Hospital Admin with `tenantGuard`)
- `/api/v1/doctor/*` (Protected: Doctor)
- `/api/v1/staff/*` (Protected: Staff / Hospital Admin)
- `/api/v1/patient/*` (Protected: Patient)
- `/api/v1/appointments/*` (Protected: Multi-role with status lifecycle)
- `/api/v1/masters/*` (Countries, States, Cities, Department Master, Designation Master)

---

## 📌 Scope of this Phase vs What is NOT Yet Built

### ✅ Built in this Foundation Phase:
1. Complete directory structure conforming to strict SOP guidelines.
2. MySQL schema (`schema.sql`) and initial seed data (`seed.sql`) with all 16 tables, constraints, indexes, and recommended tables (`tbl_doctor_schedule`, `tbl_medical_records`).
3. Express server with Helmet, CORS, Morgan, Winston logging, and centralized error handling.
4. Database pool configuration using `mysql2/promise`.
5. Helper functions: Bcrypt hashing, temporary password generation, OTP generation, JWT sign/verify, response helpers, and Nodemailer HTML mailer.
6. Middleware: `auth` (JWT), `role` (RBAC), `tenant` (isolation guard), `validate` (Joi), `upload` (Multer), `errorHandler`.
7. Reusable `createUserWithTemporaryPassword` service for provisioning Admins, Doctors, and Staff.
8. Auth controller and service implementing the complete login, mandatory password reset, and OTP password recovery lifecycle.
9. Stored procedures (`procedures.sql`) with `p_` parameter naming conventions.
10. Vite + React 18 + Tailwind CSS frontend foundation with Axios interceptors, AuthContext, role-based Protected Routes, 5 layout shells, and placeholder pages.

### ⏳ NOT Yet Built (Deferred for Feature Implementation Phases):
1. **Full CRUD business logic implementations inside route skeletons**:
   - Super Admin Hospital Onboarding full form wizard
   - Hospital Admin Doctor & Staff creation forms
   - Doctor consultation notes & prescription builder UI
   - Staff patient arrival & waiting queue live actions
   - Multi-step appointment booking wizard with Razorpay/Stripe/UPI gateway integration
2. **Real-time Push Notifications** (WebSockets / Firebase Cloud Messaging using device tokens).
3. **Automated Cron Jobs** (for appointment reminders 1 hour prior and auto-cancellations).
4. **Third-party OAuth** (Google Sign-In integration for patients).
