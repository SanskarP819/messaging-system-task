package com.example.messaging.dto;





import java.time.LocalDateTime;

public class EmailResponse {

    private Long id;
    private String emailTo;
    private LocalDateTime timestamp;

    // No-argument constructor
    public EmailResponse() {
    }

    // All-arguments constructor
    public EmailResponse(Long id, String emailTo, LocalDateTime timestamp) {
        this.id = id;
        this.emailTo = emailTo;
        this.timestamp = timestamp;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getEmailTo() {
        return emailTo;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setEmailTo(String emailTo) {
        this.emailTo = emailTo;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}