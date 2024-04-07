package com.employees.api.utils;

import com.employees.api.models.dtos.Employee;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class CsvUtil {

    private static final DateTimeFormatter[] DATE_FORMATS = {
            DateTimeFormatter.ofPattern("yyyy-MM-dd"),
            DateTimeFormatter.ofPattern("MM/dd/yyyy"),
            DateTimeFormatter.ofPattern("dd-MM-yyyy")
            // Add more date formats as needed
    };

    public List<Employee> extractDataFromCSV(MultipartFile file) throws IOException {
        List<Employee> dataList = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length >= 3) {
                    try {
                        long empId = Long.parseLong(parts[0].trim());
                        int projectId = Integer.parseInt(parts[1].trim());
                        Date dateFrom = parseDate(parts[2].trim());
                        Date dateTo = parts[3] != null && !parts[3].trim().equalsIgnoreCase("null") && !parts[3].trim().isEmpty() ?
                                parseDate(parts[3].trim()) : Date.from(Instant.now());

                        Employee employeeData = Employee.builder()
                                .emplId(empId)
                                .projectId(projectId)
                                .dateFrom(dateFrom)
                                .dateTo(dateTo)
                                .build();
                        dataList.add(employeeData);
                    } catch (NumberFormatException e) {
                        // Handle invalid numeric data
                        System.err.println("Invalid numeric data: " + line);
                    }
                } else {
                    // Handle invalid CSV format
                    System.err.println("Invalid CSV line: " + line);
                }
            }
        }
        return dataList;
    }

    private static Date parseDate(String dateString) {
        for (DateTimeFormatter formatter : DATE_FORMATS) {
            try {
                return Date.from(LocalDate.parse(dateString, formatter).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
            } catch (DateTimeParseException e) {
                // Try next format
            }
        }
        throw new IllegalArgumentException("Unparseable date: " + dateString);
    }
}
