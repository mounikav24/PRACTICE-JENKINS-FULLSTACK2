package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Hospital Name is required")
    private String hospitalName;

    @NotBlank(message = "Department is required")
    private String department;

    @NotNull(message = "Experience is required")
    @Min(value = 0, message = "Experience must be non-negative")
    private int experience; // Corresponds to 'Experience (years)'

    @NotNull(message = "Consultant Fee is required")
    @Min(value = 0, message = "Fee must be non-negative")
    private double consultantFee; // Corresponds to 'Consultant Fee (₹)'

    // Default constructor is required by JPA
    public Doctor() {
    }

    // Constructor for convenience (optional)
    public Doctor(String name, String hospitalName, String department, int experience, double consultantFee) {
        this.name = name;
        this.hospitalName = hospitalName;
        this.department = department;
        this.experience = experience;
        this.consultantFee = consultantFee;
    }

    // --- Getters and Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public double getConsultantFee() {
        return consultantFee;
    }

    public void setConsultantFee(double consultantFee) {
        this.consultantFee = consultantFee;
    }
}