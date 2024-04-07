package com.employees.api.services;

import com.employees.api.exceptions.ValidationException;
import com.employees.api.models.dtos.Employee;
import com.employees.api.models.dtos.PairEmployee;
import com.employees.api.models.entities.EmployeeEntity;
import com.employees.api.models.mappers.EmployeeMapper;
import com.employees.api.models.mappers.PairEmployeeMapperImpl;
import com.employees.api.repository.EmployeeRepository;
import com.employees.api.utils.CsvUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Service
@Slf4j
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final CsvUtil csvUtil;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper, CsvUtil csvUtil) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
        this.csvUtil = csvUtil;
    }


    public List<Employee> proceed(MultipartFile csv) throws IOException {
        List<Employee> employeeList = csvUtil.extractDataFromCSV(csv);


        if (employeeList == null || employeeList.isEmpty()) {
            throw new ValidationException("error", "Csv file wrong input");
        }

        employeeRepository.saveAll(employeeMapper.toEntities(employeeList));
        return employeeList;
    }

    public List<PairEmployee> getAllSorted() {
        List<Object[]> result = employeeRepository.getEmployeeDataOrdered();

        return PairEmployeeMapperImpl.toDtos(result);
    }
}
