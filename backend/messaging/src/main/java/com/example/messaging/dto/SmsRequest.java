package com.example.messaging.dto;





import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class SmsRequest {

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be 10 digits")
    private String mobileNumber;

    @NotBlank(message = "Message is required")
    private String message;

    // No-argument constructor
    public SmsRequest() {
    }

    // All-arguments constructor
    public SmsRequest(String mobileNumber, String message) {
        this.mobileNumber = mobileNumber;
        this.message = message;
    }

    // Getters
    public String getMobileNumber() {
        return mobileNumber;
    }

    public String getMessage() {
        return message;
    }

    // Setters
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}