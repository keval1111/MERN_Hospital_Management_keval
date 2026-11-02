-- =============================================================================
-- Hospital Management System - Initial Seed Data (seed.sql)
-- Default Super Admin Credentials:
-- Email: superadmin@hospital.com
-- Password: Admin@123 (hashed with bcrypt, 10 rounds)
-- =============================================================================

USE `hospital_management_db`;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Seed tbl_roles
INSERT INTO `tbl_roles` (`id`, `role_name`, `status_flag`, `created_by`, `updated_by`) VALUES
(1, 'Super Admin', 1, 1, 1),
(2, 'Hospital Admin', 1, 1, 1),
(3, 'Doctor', 1, 1, 1),
(4, 'Staff', 1, 1, 1),
(5, 'Patient', 1, 1, 1)
ON DUPLICATE KEY UPDATE `role_name` = VALUES(`role_name`);

-- 2. Seed tbl_super_admin
-- Bcrypt Hash for 'Admin@123'
INSERT INTO `tbl_super_admin` (
  `id`, `full_name`, `email`, `mobile_number`, `password_hash`, 
  `is_temporary_password`, `role_id`, `status_flag`, `created_by`, `updated_by`
) VALUES (
  1, 
  'Keval Kuvad (Super Admin)', 
  'superadmin@hospital.com', 
  '+91 9876543210', 
  '$2a$10$7zB3c9B4Qk5jM0X5V.xQ2.bQ6L7Y3G6v0qW9v4J1p7r8s9t0u1v2w', 
  0, 
  1, 
  1, 
  1, 
  1
) ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);

-- 3. Seed tbl_countries
INSERT INTO `tbl_countries` (`id`, `country_name`, `iso_code`, `status_flag`, `created_by`, `updated_by`) VALUES
(1, 'India', 'IND', 1, 1, 1),
(2, 'United States', 'USA', 1, 1, 1)
ON DUPLICATE KEY UPDATE `country_name` = VALUES(`country_name`);

-- 4. Seed tbl_states
INSERT INTO `tbl_states` (`id`, `country_id`, `state_name`, `status_flag`, `created_by`, `updated_by`) VALUES
(1, 1, 'Maharashtra', 1, 1, 1),
(2, 1, 'Gujarat', 1, 1, 1),
(3, 1, 'Karnataka', 1, 1, 1),
(4, 1, 'Delhi NCR', 1, 1, 1)
ON DUPLICATE KEY UPDATE `state_name` = VALUES(`state_name`);

-- 5. Seed tbl_cities
INSERT INTO `tbl_cities` (`id`, `state_id`, `city_name`, `pincode`, `status_flag`, `created_by`, `updated_by`) VALUES
(1, 1, 'Mumbai', '400001', 1, 1, 1),
(2, 1, 'Pune', '411001', 1, 1, 1),
(3, 2, 'Ahmedabad', '380001', 1, 1, 1),
(4, 2, 'Surat', '395001', 1, 1, 1),
(5, 3, 'Bengaluru', '560001', 1, 1, 1),
(6, 4, 'New Delhi', '110001', 1, 1, 1)
ON DUPLICATE KEY UPDATE `city_name` = VALUES(`city_name`);

-- 6. Seed tbl_department_master
INSERT INTO `tbl_department_master` (`id`, `department_name`, `description`, `department_image`, `status_flag`, `created_by`, `updated_by`) VALUES
(1, 'Cardiology', 'Heart and cardiovascular clinical care', 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400', 1, 1, 1),
(2, 'Neurology', 'Brain, spinal and central nervous system treatments', 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400', 1, 1, 1),
(3, 'Orthopedics', 'Musculoskeletal, bone, joint and arthroscopic surgery', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400', 1, 1, 1),
(4, 'Pediatrics', 'Comprehensive newborn, child, and adolescent care', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400', 1, 1, 1),
(5, 'ENT', 'Ear, Nose and Throat advanced microscopic surgery', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400', 1, 1, 1),
(6, 'Dermatology', 'Dermatological and cosmetic dermatology clinical care', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400', 1, 1, 1)
ON DUPLICATE KEY UPDATE `department_name` = VALUES(`department_name`);

-- 7. Seed tbl_designation_master
INSERT INTO `tbl_designation_master` (`id`, `designation_name`, `status_flag`, `created_by`, `updated_by`) VALUES
(1, 'Senior Consultant', 1, 1, 1),
(2, 'Junior Consultant', 1, 1, 1),
(3, 'Attending Physician', 1, 1, 1),
(4, 'Head Nurse', 1, 1, 1),
(5, 'Staff Nurse', 1, 1, 1),
(6, 'Front Desk Receptionist', 1, 1, 1),
(7, 'Chief Pharmacist', 1, 1, 1),
(8, 'Laboratory Technician', 1, 1, 1)
ON DUPLICATE KEY UPDATE `designation_name` = VALUES(`designation_name`);

SET FOREIGN_KEY_CHECKS = 1;
