package com.example.demo.service;

import com.example.demo.entity.Doctor;
import com.example.demo.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // CREATE / UPDATE
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // READ ALL
    public List<Doctor> findAllDoctors() {
        return doctorRepository.findAll();
    }

    // READ ONE
    public Optional<Doctor> findDoctorById(Long id) {
        return doctorRepository.findById(id);
    }

    // DELETE
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
    
    // SEARCH/FILTER
    // This supports the 'SearchDoctor.jsx' component's filtering logic.
    public List<Doctor> searchDoctors(String searchTerm, String searchBy) {
        if (searchTerm == null || searchTerm.isBlank()) {
            return findAllDoctors();
        }

        String term = searchTerm.toLowerCase();

        // Delegate filtering to the repository if possible, or filter locally.
        // For simplicity and to cover various search fields, we'll use a local filter
        // or a compound repository method if the fields are well-defined.
        
        // --- Custom logic for the frontend's search behavior ---
        return findAllDoctors().stream()
            .filter(doctor -> {
                String value = "";
                switch (searchBy.toLowerCase()) {
                    case "name":
                        value = doctor.getName();
                        break;
                    case "hospitalname":
                        value = doctor.getHospitalName();
                        break;
                    case "department":
                        value = doctor.getDepartment();
                        break;
                    case "experience":
                        value = String.valueOf(doctor.getExperience());
                        break;
                    default:
                        return false;
                }
                return value != null && value.toLowerCase().contains(term);
            })
            .toList();
    }
}