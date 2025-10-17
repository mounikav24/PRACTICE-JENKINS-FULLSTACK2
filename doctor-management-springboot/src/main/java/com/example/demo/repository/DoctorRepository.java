package com.example.demo.repository;

import com.example.demo.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    
    /**
     * Custom method to support the search functionality by name, 
     * hospital, or department (used in the service layer).
     * Spring Data JPA creates the query automatically based on the method name.
     */
    List<Doctor> findByNameContainingIgnoreCaseOrHospitalNameContainingIgnoreCaseOrDepartmentContainingIgnoreCase(
        String name, String hospitalName, String department
    );
}