-- =============================================================================
-- Hospital Management System - Stored Procedures
-- Strict Conventions:
-- 1. Procedure name prefix: `sp_`
-- 2. Verb-based action naming
-- 3. Parameters MUST use `p_` prefix (e.g. p_user_id) to avoid ambiguity with columns
-- =============================================================================

USE `hospital_management_db`;

DELIMITER //

-- -----------------------------------------------------------------------------
-- Procedure 1: sp_get_user_by_id
-- Fetches user profile from target role table safely
-- -----------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `sp_get_user_by_id` //
CREATE PROCEDURE `sp_get_user_by_id`(
    IN p_user_id INT UNSIGNED,
    IN p_role_name VARCHAR(50)
)
BEGIN
    IF p_role_name = 'Super Admin' THEN
        SELECT 
            id, full_name, email, mobile_number, is_temporary_password, 
            role_id, status_flag, created_at, updated_at
        FROM tbl_super_admin 
        WHERE id = p_user_id;

    ELSEIF p_role_name = 'Hospital Admin' THEN
        SELECT 
            a.id, a.full_name, a.email, a.mobile_number, a.is_temporary_password,
            a.role_id, a.status_flag, h.id AS hospital_id, h.hospital_name,
            a.created_at, a.updated_at
        FROM tbl_admin a
        LEFT JOIN tbl_hospitals h ON h.admin_id = a.id
        WHERE a.id = p_user_id;

    ELSEIF p_role_name = 'Doctor' THEN
        SELECT 
            d.id, d.doctor_name AS full_name, d.email, d.mobile_number, d.hospital_id,
            d.department_id, d.designation_id, d.medical_licence_number, d.years_of_experience,
            d.is_temporary_password, d.role_id, d.status_flag, d.created_at, d.updated_at
        FROM tbl_doctors d
        WHERE d.id = p_user_id;

    ELSEIF p_role_name = 'Staff' THEN
        SELECT 
            s.id, s.full_name, s.email, s.mobile_number, s.hospital_id, s.department_id,
            s.designation_id, s.shift_timing, s.employment_type, s.is_temporary_password,
            s.role_id, s.status_flag, s.created_at, s.updated_at
        FROM tbl_staffs s
        WHERE s.id = p_user_id;

    ELSEIF p_role_name = 'Patient' THEN
        SELECT 
            p.id, p.full_name, p.email, p.mobile_number, p.gender, p.blood_group,
            p.date_of_birth, p.profile_completed, p.allergies, p.chronic_conditions,
            p.role_id, p.status_flag, p.created_at, p.updated_at
        FROM tbl_patients p
        WHERE p.id = p_user_id;
    END IF;
END //

-- -----------------------------------------------------------------------------
-- Procedure 2: sp_update_appointment_status
-- Safely updates appointment lifecycle state and records audit timestamp
-- -----------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `sp_update_appointment_status` //
CREATE PROCEDURE `sp_update_appointment_status`(
    IN p_appointment_id INT UNSIGNED,
    IN p_new_status VARCHAR(50),
    IN p_cancelled_by_role VARCHAR(50),
    IN p_updated_by INT UNSIGNED
)
BEGIN
    UPDATE tbl_appointments
    SET 
        appointment_status = p_new_status,
        cancelled_by_role = IF(p_new_status = 'Cancelled', p_cancelled_by_role, cancelled_by_role),
        cancelled_by = IF(p_new_status = 'Cancelled', p_updated_by, cancelled_by),
        thank_you_sent = IF(p_new_status = 'Completed', 1, thank_you_sent),
        updated_by = p_updated_by,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_appointment_id;

    -- Return updated appointment row for confirmation
    SELECT 
        id, patient_id, doctor_id, hospital_id, appointment_type, 
        appointment_date, appointment_time, appointment_status, updated_at
    FROM tbl_appointments
    WHERE id = p_appointment_id;
END //

DELIMITER ;
