package com.example.messaging.controller;



import com.example.messaging.dto.EmailRequest;
import com.example.messaging.dto.EmailResponse;
import com.example.messaging.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")

public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }
    @PostMapping("/send")
    public ResponseEntity<EmailResponse> sendEmail(@Valid @RequestBody EmailRequest request) {
        EmailResponse response = emailService.sendEmail(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<EmailResponse>> getAllEmails() {
        List<EmailResponse> emails = emailService.getAllEmails();
        return new ResponseEntity<>(emails, HttpStatus.OK);
    }
}