package com.employees.api.models.mappers;

import com.employees.api.models.dtos.Employee;
import com.employees.api.models.entities.EmployeeEntity;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface EmployeeMapper extends BaseMapper<EmployeeEntity, Employee> {
}
