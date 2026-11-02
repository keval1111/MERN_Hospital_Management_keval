-- =============================================================================
-- Hospital Management System (Multi-Tenant) - Database Schema
-- Strict Conventions:
-- 1. All tables prefixed with tbl_, snake_case, primary key ALWAYS `id`
-- 2. Foreign keys named with fk_<table_target>_id constraint convention
-- 3. Every table includes: status_flag, created_by, updated_by, created_at, updated_at
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `hospital_management_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `hospital_management_db`;

-- Disable foreign key checks for clean re-creation if needed
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------------------------
-- 1. tbl_roles (System Roles Master)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_roles`;
CREATE TABLE `tbl_roles` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `role_name` VARCHAR(50) NOT NULL UNIQUE,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_roles_status` (`status_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 2. tbl_countries (Location Master - Country)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_countries`;
CREATE TABLE `tbl_countries` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `country_name` VARCHAR(100) NOT NULL UNIQUE,
  `iso_code` VARCHAR(10) NULL,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_countries_status` (`status_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 3. tbl_states (Location Master - State)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_states`;
CREATE TABLE `tbl_states` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `country_id` INT UNSIGNED NOT NULL,
  `state_name` VARCHAR(100) NOT NULL,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_country_state` (`country_id`, `state_name`),
  INDEX `idx_states_country` (`country_id`),
  INDEX `idx_states_status` (`status_flag`),
  CONSTRAINT `fk_states_country_id` FOREIGN KEY (`country_id`) REFERENCES `tbl_countries` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 4. tbl_cities (Location Master - City with Pincode)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_cities`;
CREATE TABLE `tbl_cities` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `state_id` INT UNSIGNED NOT NULL,
  `city_name` VARCHAR(100) NOT NULL,
  `pincode` VARCHAR(20) NOT NULL,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_cities_state` (`state_id`),
  INDEX `idx_cities_pincode` (`pincode`),
  INDEX `idx_cities_status` (`status_flag`),
  CONSTRAINT `fk_cities_state_id` FOREIGN KEY (`state_id`) REFERENCES `tbl_states` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 5. tbl_department_master (Global Departments Master)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_department_master`;
CREATE TABLE `tbl_department_master` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `department_name` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `department_image` VARCHAR(500) NULL,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_dept_master_status` (`status_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 6. tbl_designation_master (Global Designations Master)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_designation_master`;
CREATE TABLE `tbl_designation_master` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `designation_name` VARCHAR(100) NOT NULL UNIQUE,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_desig_master_status` (`status_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 7. tbl_super_admin (Super Admin Accounts)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_super_admin`;
CREATE TABLE `tbl_super_admin` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `mobile_number` VARCHAR(30) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `is_temporary_password` TINYINT(1) NOT NULL DEFAULT 0,
  `password_expires_at` DATETIME NULL,
  `otp` VARCHAR(10) NULL,
  `otp_expires_at` DATETIME NULL,
  `otp_used` TINYINT(1) NOT NULL DEFAULT 0,
  `role_id` INT UNSIGNED NOT NULL DEFAULT 1,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_super_admin_email` (`email`),
  INDEX `idx_super_admin_mobile` (`mobile_number`),
  CONSTRAINT `fk_super_admin_role_id` FOREIGN KEY (`role_id`) REFERENCES `tbl_roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 8. tbl_admin (Hospital Administrator Accounts)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_admin`;
CREATE TABLE `tbl_admin` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `mobile_number` VARCHAR(30) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `is_temporary_password` TINYINT(1) NOT NULL DEFAULT 1,
  `otp_last_sent_at` DATETIME NULL,
  `password_expires_at` DATETIME NULL,
  `otp` VARCHAR(10) NULL,
  `otp_expires_at` DATETIME NULL,
  `otp_used` TINYINT(1) NOT NULL DEFAULT 0,
  `role_id` INT UNSIGNED NOT NULL DEFAULT 2,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_admin_email` (`email`),
  INDEX `idx_admin_mobile` (`mobile_number`),
  CONSTRAINT `fk_admin_role_id` FOREIGN KEY (`role_id`) REFERENCES `tbl_roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 9. tbl_hospitals (Multi-Tenant Hospitals Master)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_hospitals`;
CREATE TABLE `tbl_hospitals` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `admin_id` INT UNSIGNED NOT NULL UNIQUE,
  `hospital_name` VARCHAR(200) NOT NULL,
  `hospital_address` TEXT NOT NULL,
  `pincode` VARCHAR(20) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `contact_number` VARCHAR(50) NOT NULL,
  `admin_name` VARCHAR(150) NOT NULL,
  `admin_email` VARCHAR(150) NOT NULL,
  `qr_code` VARCHAR(500) NULL,
  `upi_id` VARCHAR(150) NULL,
  `working_hours` JSON NULL,
  `hospital_images` JSON NULL,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_hospitals_admin` (`admin_id`),
  INDEX `idx_hospitals_city` (`city`),
  INDEX `idx_hospitals_status` (`status_flag`),
  CONSTRAINT `fk_hospitals_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `tbl_admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 10. tbl_departments (Hospital Assigned Departments)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_departments`;
CREATE TABLE `tbl_departments` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `hospital_id` INT UNSIGNED NOT NULL,
  `department_master_id` INT UNSIGNED NOT NULL,
  `admin_id` INT UNSIGNED NOT NULL,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_hospital_department` (`hospital_id`, `department_master_id`),
  INDEX `idx_dept_hospital` (`hospital_id`),
  INDEX `idx_dept_master` (`department_master_id`),
  CONSTRAINT `fk_departments_hospital_id` FOREIGN KEY (`hospital_id`) REFERENCES `tbl_hospitals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_departments_master_id` FOREIGN KEY (`department_master_id`) REFERENCES `tbl_department_master` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_departments_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `tbl_admin` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 11. tbl_doctors (Doctors Roster)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_doctors`;
CREATE TABLE `tbl_doctors` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `hospital_id` INT UNSIGNED NOT NULL,
  `department_id` INT UNSIGNED NOT NULL,
  `designation_id` INT UNSIGNED NOT NULL,
  `doctor_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `mobile_number` VARCHAR(30) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `is_temporary_password` TINYINT(1) NOT NULL DEFAULT 1,
  `otp_last_sent_at` DATETIME NULL,
  `device_token` VARCHAR(255) NULL,
  `device_type` VARCHAR(50) NULL,
  `password_expires_at` DATETIME NULL,
  `otp` VARCHAR(10) NULL,
  `otp_expires_at` DATETIME NULL,
  `otp_used` TINYINT(1) NOT NULL DEFAULT 0,
  `role_id` INT UNSIGNED NOT NULL DEFAULT 3,
  `date_of_birth` DATE NULL,
  `profile_image` VARCHAR(500) NULL,
  `years_of_experience` INT UNSIGNED NOT NULL DEFAULT 0,
  `medical_licence_number` VARCHAR(100) NOT NULL UNIQUE,
  `languages_spoken` JSON NULL,
  `blood_group` VARCHAR(10) NULL,
  `gender` VARCHAR(20) NULL,
  `bio` TEXT NULL,
  `address_line_1` VARCHAR(255) NULL,
  `address_line_2` VARCHAR(255) NULL,
  `pincode` VARCHAR(20) NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(100) NULL,
  `country` VARCHAR(100) NULL DEFAULT 'India',
  `education` JSON NULL,
  `consultation_charges` JSON NULL,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_doctors_hospital` (`hospital_id`),
  INDEX `idx_doctors_dept` (`department_id`),
  INDEX `idx_doctors_email` (`email`),
  INDEX `idx_doctors_mobile` (`mobile_number`),
  INDEX `idx_doctors_license` (`medical_licence_number`),
  CONSTRAINT `fk_doctors_hospital_id` FOREIGN KEY (`hospital_id`) REFERENCES `tbl_hospitals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_doctors_department_id` FOREIGN KEY (`department_id`) REFERENCES `tbl_departments` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_doctors_designation_id` FOREIGN KEY (`designation_id`) REFERENCES `tbl_designation_master` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_doctors_role_id` FOREIGN KEY (`role_id`) REFERENCES `tbl_roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 12. tbl_staffs (Healthcare Staff & Operations)
-- RECOMMENDED ADDITION: hospital_id column included directly for fast tenant scoping
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_staffs`;
CREATE TABLE `tbl_staffs` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `hospital_id` INT UNSIGNED NOT NULL,
  `department_id` INT UNSIGNED NOT NULL,
  `designation_id` INT UNSIGNED NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `mobile_number` VARCHAR(30) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `is_temporary_password` TINYINT(1) NOT NULL DEFAULT 1,
  `otp_last_sent_at` DATETIME NULL,
  `device_token` VARCHAR(255) NULL,
  `device_type` VARCHAR(50) NULL,
  `password_expires_at` DATETIME NULL,
  `otp` VARCHAR(10) NULL,
  `otp_expires_at` DATETIME NULL,
  `otp_used` TINYINT(1) NOT NULL DEFAULT 0,
  `role_id` INT UNSIGNED NOT NULL DEFAULT 4,
  `gender` VARCHAR(20) NULL,
  `date_of_birth` DATE NULL,
  `blood_group` VARCHAR(10) NULL,
  `address` TEXT NULL,
  `pincode` VARCHAR(20) NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(100) NULL,
  `country` VARCHAR(100) NULL DEFAULT 'India',
  `profile_image` VARCHAR(500) NULL,
  `shift_timing` VARCHAR(100) NULL,
  `employment_type` VARCHAR(50) NOT NULL DEFAULT 'Full-Time',
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_staffs_hospital` (`hospital_id`),
  INDEX `idx_staffs_dept` (`department_id`),
  INDEX `idx_staffs_email` (`email`),
  INDEX `idx_staffs_mobile` (`mobile_number`),
  CONSTRAINT `fk_staffs_hospital_id` FOREIGN KEY (`hospital_id`) REFERENCES `tbl_hospitals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_staffs_department_id` FOREIGN KEY (`department_id`) REFERENCES `tbl_departments` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_staffs_designation_id` FOREIGN KEY (`designation_id`) REFERENCES `tbl_designation_master` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_staffs_role_id` FOREIGN KEY (`role_id`) REFERENCES `tbl_roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 13. tbl_patients (Patient User Accounts & Profiles)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_patients`;
CREATE TABLE `tbl_patients` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `mobile_number` VARCHAR(30) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `is_temporary_password` TINYINT(1) NOT NULL DEFAULT 0,
  `otp_last_sent_at` DATETIME NULL,
  `device_token` VARCHAR(255) NULL,
  `device_type` VARCHAR(50) NULL,
  `profile_completed` TINYINT(1) NOT NULL DEFAULT 0,
  `password_expires_at` DATETIME NULL,
  `otp` VARCHAR(10) NULL,
  `otp_expires_at` DATETIME NULL,
  `otp_used` TINYINT(1) NOT NULL DEFAULT 0,
  `role_id` INT UNSIGNED NOT NULL DEFAULT 5,
  `date_of_birth` DATE NULL,
  `gender` VARCHAR(20) NULL,
  `blood_group` VARCHAR(10) NULL,
  `address_line_1` VARCHAR(255) NULL,
  `address_line_2` VARCHAR(255) NULL,
  `pincode` VARCHAR(20) NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(100) NULL,
  `country` VARCHAR(100) NULL DEFAULT 'India',
  `emergency_contact_name` VARCHAR(150) NULL,
  `emergency_contact_number` VARCHAR(30) NULL,
  `allergies` TEXT NULL,
  `chronic_conditions` TEXT NULL,
  `current_medicines` TEXT NULL,
  `heart_rate` VARCHAR(50) NULL,
  `oxygen_saturation` VARCHAR(50) NULL,
  `blood_pressure` VARCHAR(50) NULL,
  `temperature` VARCHAR(50) NULL,
  `medical_conditions` TEXT NULL,
  `treatment_period` VARCHAR(100) NULL,
  `therapists` VARCHAR(200) NULL,
  `treatment_center` VARCHAR(200) NULL,
  `ptd` VARCHAR(100) NULL,
  `last_visit` DATE NULL,
  `therapy_notes` TEXT NULL,
  `created_by_id` INT UNSIGNED NULL,
  `created_by_role` VARCHAR(50) NOT NULL DEFAULT 'Patient',
  `updated_by_id` INT UNSIGNED NULL,
  `updated_by_role` VARCHAR(50) NOT NULL DEFAULT 'Patient',
  `login_type` ENUM('Local', 'Google') NOT NULL DEFAULT 'Local',
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_patients_email` (`email`),
  INDEX `idx_patients_mobile` (`mobile_number`),
  INDEX `idx_patients_status` (`status_flag`),
  CONSTRAINT `fk_patients_role_id` FOREIGN KEY (`role_id`) REFERENCES `tbl_roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 14. tbl_appointments (Appointment Workflow & Scheduling)
-- RECOMMENDED ADDITION: hospital_id column included directly for fast tenant scoping
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_appointments`;
CREATE TABLE `tbl_appointments` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `parent_appointment_id` INT UNSIGNED NULL,
  `patient_id` INT UNSIGNED NOT NULL,
  `doctor_id` INT UNSIGNED NOT NULL,
  `hospital_id` INT UNSIGNED NOT NULL,
  `appointment_type` ENUM('Visit Hospital', 'Online Consultation', 'Others') NOT NULL DEFAULT 'Visit Hospital',
  `appointment_date` DATE NOT NULL,
  `appointment_time` VARCHAR(30) NOT NULL,
  `appointment_reason` TEXT NOT NULL,
  `payment_mode` ENUM('Cash', 'UPI') NOT NULL DEFAULT 'Cash',
  `appointment_status` ENUM('Pending', 'Confirmed', 'Rejected', 'In Waiting', 'In Progress', 'Completed', 'Cancelled', 'Admitted') NOT NULL DEFAULT 'Pending',
  `auto_cancelled` TINYINT(1) NOT NULL DEFAULT 0,
  `reminder_sent` TINYINT(1) NOT NULL DEFAULT 0,
  `follow_up_sent` TINYINT(1) NOT NULL DEFAULT 0,
  `thank_you_sent` TINYINT(1) NOT NULL DEFAULT 0,
  `cancelled_by_role` VARCHAR(50) NULL,
  `cancelled_by` INT UNSIGNED NULL,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_appt_patient` (`patient_id`),
  INDEX `idx_appt_doctor` (`doctor_id`),
  INDEX `idx_appt_hospital` (`hospital_id`),
  INDEX `idx_appt_date` (`appointment_date`),
  INDEX `idx_appt_status` (`appointment_status`),
  CONSTRAINT `fk_appointments_parent_id` FOREIGN KEY (`parent_appointment_id`) REFERENCES `tbl_appointments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_appointments_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_appointments_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `tbl_doctors` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_appointments_hospital_id` FOREIGN KEY (`hospital_id`) REFERENCES `tbl_hospitals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 15. [RECOMMENDED EXTRA TABLE] tbl_doctor_schedule
-- Stores doctor working hours, consultation slot duration and daily availability
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_doctor_schedule`;
CREATE TABLE `tbl_doctor_schedule` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `doctor_id` INT UNSIGNED NOT NULL,
  `day_of_week` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `slot_duration` INT UNSIGNED NOT NULL DEFAULT 15 COMMENT 'Duration in minutes',
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_doctor_day` (`doctor_id`, `day_of_week`),
  INDEX `idx_doc_sched_doctor` (`doctor_id`),
  CONSTRAINT `fk_doc_schedule_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `tbl_doctors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 16. [RECOMMENDED EXTRA TABLE] tbl_medical_records
-- Stores clinical observations and vitals per consultation visit
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_medical_records`;
CREATE TABLE `tbl_medical_records` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `patient_id` INT UNSIGNED NOT NULL,
  `appointment_id` INT UNSIGNED NOT NULL,
  `hr` VARCHAR(30) NULL COMMENT 'Heart Rate (bpm)',
  `bp` VARCHAR(30) NULL COMMENT 'Blood Pressure (mmHg)',
  `os` VARCHAR(30) NULL COMMENT 'Oxygen Saturation (%)',
  `temperature` VARCHAR(30) NULL COMMENT 'Body Temperature',
  `diagnosis` TEXT NULL,
  `notes` TEXT NULL,
  `prescriptions` JSON NULL,
  `status_flag` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT UNSIGNED NULL,
  `updated_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_med_records_patient` (`patient_id`),
  INDEX `idx_med_records_appointment` (`appointment_id`),
  CONSTRAINT `fk_med_records_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_med_records_appointment_id` FOREIGN KEY (`appointment_id`) REFERENCES `tbl_appointments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
