package com.example.messaging.controller;



import com.example.messaging.dto.SmsRequest;
import com.example.messaging.dto.SmsResponse;
import com.example.messaging.service.SmsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sms")
@CrossOrigin(origins = "*")

public class SmsController {

    private final SmsService smsService;

    public SmsController(SmsService smsService) {
        this.smsService = smsService;
    }
    @PostMapping("/send")
    public ResponseEntity<SmsResponse> sendSms(@Valid @RequestBody SmsRequest request) {
        SmsResponse response = smsService.sendSms(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<SmsResponse>> getAllSms() {
        List<SmsResponse> smsList = smsService.getAllSms();
        return new ResponseEntity<>(smsList, HttpStatus.OK);

    }
}