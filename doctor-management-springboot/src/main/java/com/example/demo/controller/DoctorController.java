package com.example.demo.controller;

import com.example.demo.entity.Doctor;
import com.example.demo.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid; 

import java.util.List;

@RestController
@RequestMapping("/doctors") // Base URL matches the frontend's API_URL 
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from your React development server
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // GET /doctors (AdminPanel.jsx -> fetchDoctors)
    // Also used for initial data for SearchDoctor.jsx
    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.findAllDoctors();
    }

    // POST /doctors (AdminPanel.jsx -> handleAddDoctor)
    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@Valid @RequestBody Doctor doctor) {
        // Ensure ID is null so JPA generates a new one on creation
        doctor.setId(null); 
        Doctor savedDoctor = doctorService.saveDoctor(doctor);
        return new ResponseEntity<>(savedDoctor, HttpStatus.CREATED);
    }

    // PUT /doctors/{id} (AdminPanel.jsx -> handleEditDoctor)
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @Valid @RequestBody Doctor doctorDetails) {
        
        return doctorService.findDoctorById(id).map(existingDoctor -> {
            // Update fields manually
            existingDoctor.setName(doctorDetails.getName());
            existingDoctor.setHospitalName(doctorDetails.getHospitalName());
            existingDoctor.setDepartment(doctorDetails.getDepartment());
            existingDoctor.setExperience(doctorDetails.getExperience());
            existingDoctor.setConsultantFee(doctorDetails.getConsultantFee());
            
            Doctor updatedDoctor = doctorService.saveDoctor(existingDoctor);
            return ResponseEntity.ok(updatedDoctor);
        }).orElseGet(() -> {
            // If ID not found, treat as a bad request or create new (often bad practice for PUT)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        });
    }

    // DELETE /doctors/{id} (AdminPanel.jsx -> handleDeleteDoctor)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }
    
    // GET /doctors/search?term={term}&by={field} - Supports SearchDoctor.jsx
    @GetMapping("/search")
    public List<Doctor> searchDoctors(
            @RequestParam(required = false) String term,
            @RequestParam(required = false, defaultValue = "name") String by) {
        
        return doctorService.searchDoctors(term, by);
    }
}