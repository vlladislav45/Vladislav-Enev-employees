package com.employees.api.exceptions;

public class ValidationException extends RuntimeException {
    private String errorMessage;

    public ValidationException(String errorMessage, String message) {
        super(errorMessage);
        this.errorMessage = errorMessage;
    }
}
