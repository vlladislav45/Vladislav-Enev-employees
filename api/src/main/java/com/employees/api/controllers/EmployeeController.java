package com.employees.api.controllers;

import com.employees.api.exceptions.ValidationException;
import com.employees.api.models.dtos.Employee;
import com.employees.api.services.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/v1/employees", produces = "application/json", consumes = { "multipart/form-data", "application/json" })
@Slf4j
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<?> proceed(@RequestPart("csv") MultipartFile csv) {
        try {
            List<Employee> employees = employeeService.proceed(csv);
            return ResponseEntity.ok(Map.of("success", employees));
        } catch (ValidationException e) {
            log.warn("Bad request {}" + e);
            return ResponseEntity.status(403).body(e.getMessage());
        } catch (IOException e) {
            log.warn("Bad request {}" + e);
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    /**
     * Sorted
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(employeeService.getAllSorted());
    }
}
