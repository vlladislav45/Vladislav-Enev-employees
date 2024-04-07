package com.employees.api.models.mappers;

import com.employees.api.models.dtos.PairEmployee;

import java.util.ArrayList;
import java.util.List;

public class PairEmployeeMapperImpl {
    public static List<PairEmployee> toDtos(List<Object[]> resultList) {
        List<PairEmployee> employeeList = new ArrayList<>();

        for (Object[] result : resultList) {
            Long workerId1 = (Long) result[0];
            Long workerId2 = (Long) result[1];
            Long daysWorked = ((Number) result[2]).longValue(); // Extracting Long value from Number

            PairEmployee employee = PairEmployee.builder()
                    .workerId1(workerId1)
                    .workerId2(workerId2)
                    .daysWorked(daysWorked)
                    .build();

            employeeList.add(employee);
        }

        return employeeList;
    }
}
