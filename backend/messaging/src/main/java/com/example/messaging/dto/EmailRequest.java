package com.example.messaging.dto;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class EmailRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String emailTo;

    // No-argument constructor
    public EmailRequest() {
    }

    // All-arguments constructor
    public EmailRequest(String emailTo) {
        this.emailTo = emailTo;
    }

    // Getter
    public String getEmailTo() {
        return emailTo;
    }

    // Setter
    public void setEmailTo(String emailTo) {
        this.emailTo = emailTo;
    }
}