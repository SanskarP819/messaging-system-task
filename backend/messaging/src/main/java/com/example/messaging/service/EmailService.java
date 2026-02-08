package com.example.messaging.service;



import com.example.messaging.dto.EmailRequest;
import com.example.messaging.dto.EmailResponse;
import com.example.messaging.entity.EmailLog;
import com.example.messaging.repository.EmailLogRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmailService {

    private final EmailLogRepository emailLogRepository;

    // Constructor Injection
    public EmailService(EmailLogRepository emailLogRepository) {
        this.emailLogRepository = emailLogRepository;
    }
    public EmailResponse sendEmail(EmailRequest request) {
        EmailLog emailLog = new EmailLog();
        emailLog.setEmailTo(request.getEmailTo());

        EmailLog saved = emailLogRepository.save(emailLog);

        return new EmailResponse(
                saved.getId(),
                saved.getEmailTo(),
                saved.getTimestamp()
        );
    }

    public List<EmailResponse> getAllEmails() {
        return emailLogRepository.findAllByOrderByTimestampDesc()
                .stream()
                .map(email -> new EmailResponse(
                        email.getId(),
                        email.getEmailTo(),
                        email.getTimestamp()
                ))
                .collect(Collectors.toList());
    }
}