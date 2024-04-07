package com.employees.api.models.dtos;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

import java.time.ZonedDateTime;
import java.util.Date;

@Data
@Builder(toBuilder = true)
@Jacksonized
public class Employee implements Dto {
    private Long id;
    private Long emplId;
    private int projectId;

    private Date dateFrom;
    private Date dateTo;

    private ZonedDateTime created;
    private ZonedDateTime edited;
}
