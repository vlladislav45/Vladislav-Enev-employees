package com.employees.api.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.Date;

@Entity
@Table(name = EmployeeEntity.TABLE_NAME)
@Data
public class EmployeeEntity implements BaseEntity {
    public static final String TABLE_NAME = "employees";
    public static final String SEQUENCE_NAME = "seq_employee_id";

    @Id
    @SequenceGenerator(name = SEQUENCE_NAME, sequenceName = SEQUENCE_NAME, allocationSize = 1, initialValue = 1000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator=SEQUENCE_NAME)
    @Column(name = "id", updatable = false)
    private long id;

    @Column(name = "emplid")
    private long emplId;

    @Column(name = "projectid")
    private int projectId;

    @Column(name = "datefrom")
    private ZonedDateTime dateFrom;

    @Column(name = "dateto")
    private Date dateTo;

    private Date created;

    private ZonedDateTime edited;

    private ZonedDateTime deleted;
}
