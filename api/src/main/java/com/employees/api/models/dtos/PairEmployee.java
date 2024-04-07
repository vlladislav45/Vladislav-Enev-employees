package com.employees.api.models.dtos;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@Data
@Builder(toBuilder = true)
@Jacksonized
public class PairEmployee {
    private Long workerId1;
    private Long workerId2;
    private Long daysWorked;
}
