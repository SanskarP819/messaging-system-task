package com.example.messaging.service;



import com.example.messaging.dto.WhatsAppRequest;
import com.example.messaging.dto.WhatsAppResponse;
import com.example.messaging.entity.WhatsAppLog;
import com.example.messaging.repository.WhatsAppLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class WhatsAppService {

    private final WhatsAppLogRepository whatsAppLogRepository;

    public WhatsAppService(WhatsAppLogRepository whatsAppLogRepository) {
        this.whatsAppLogRepository = whatsAppLogRepository;
    }

    public WhatsAppResponse sendWhatsApp(WhatsAppRequest request) {
        WhatsAppLog whatsAppLog = new WhatsAppLog();
        whatsAppLog.setMobileNumber(request.getMobileNumber());
        whatsAppLog.setMessage(request.getMessage());

        WhatsAppLog saved = whatsAppLogRepository.save(whatsAppLog);

        return new WhatsAppResponse(
                saved.getId(),
                saved.getMobileNumber(),
                saved.getMessage(),
                saved.getTimestamp()
        );
    }

    public List<WhatsAppResponse> getAllWhatsApp() {
        return whatsAppLogRepository.findAllByOrderByTimestampDesc()
                .stream()
                .map(whatsapp -> new WhatsAppResponse(
                        whatsapp.getId(),
                        whatsapp.getMobileNumber(),
                        whatsapp.getMessage(),
                        whatsapp.getTimestamp()
                ))
                .collect(Collectors.toList());
    }
}