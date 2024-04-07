package com.employees.api.repository;

import com.employees.api.models.entities.EmployeeEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EmployeeRepository extends CrudRepository<EmployeeEntity, Long> {
    @Query(value = "SELECT e1.emplid AS workerId1,\n" +
            "       e2.emplid AS workerId2,\n" +
            "       DATE_PART('day', LEAST(COALESCE(e1.dateto, NOW()), COALESCE(e2.dateto, NOW())) - GREATEST(e1.datefrom, e2.datefrom)) AS daysWorked\n" +
            "FROM employees e1\n" +
            "         JOIN employees e2 ON e1.projectid = e2.projectid AND e1.emplid < e2.emplid\n" +
            "WHERE GREATEST(e1.datefrom, e2.datefrom) < LEAST(COALESCE(e1.dateto, NOW()), COALESCE(e2.dateto, NOW()))\n" +
            "GROUP BY e1.emplid, e2.emplid, e1.dateto, e2.dateto, e1.datefrom, e2.datefrom\n" +
            "ORDER BY daysWorked DESC;", nativeQuery = true)
    List<Object[]> getEmployeeDataOrdered();
}
