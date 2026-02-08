package com.example.messaging.service;



import com.example.messaging.dto.SmsRequest;
import com.example.messaging.dto.SmsResponse;
import com.example.messaging.entity.SmsLog;
import com.example.messaging.repository.SmsLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class SmsService {

    private final SmsLogRepository smsLogRepository;

    public SmsService(SmsLogRepository smsLogRepository){
        this.smsLogRepository=smsLogRepository;
    }
    public SmsResponse sendSms(SmsRequest request) {
        SmsLog smsLog = new SmsLog();
        smsLog.setMobileNumber(request.getMobileNumber());
        smsLog.setMessage(request.getMessage());

        SmsLog saved = smsLogRepository.save(smsLog);

        return new SmsResponse(
                saved.getId(),
                saved.getMobileNumber(),
                saved.getMessage(),
                saved.getTimestamp()
        );
    }

    public List<SmsResponse> getAllSms() {
        return smsLogRepository.findAllByOrderByTimestampDesc()
                .stream()
                .map(sms -> new SmsResponse(
                        sms.getId(),
                        sms.getMobileNumber(),
                        sms.getMessage(),
                        sms.getTimestamp()
                ))
                .collect(Collectors.toList());
    }
}