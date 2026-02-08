package com.example.messaging.dto;




import java.time.LocalDateTime;

public class SmsResponse {

    private Long id;
    private String mobileNumber;
    private String message;
    private LocalDateTime timestamp;

    // No-argument constructor
    public SmsResponse() {
    }

    // All-arguments constructor
    public SmsResponse(Long id, String mobileNumber, String message, LocalDateTime timestamp) {
        this.id = id;
        this.mobileNumber = mobileNumber;
        this.message = message;
        this.timestamp = timestamp;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}