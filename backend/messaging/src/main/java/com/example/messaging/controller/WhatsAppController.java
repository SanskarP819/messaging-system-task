package com.example.messaging.controller;



import com.example.messaging.dto.WhatsAppRequest;
import com.example.messaging.dto.WhatsAppResponse;
import com.example.messaging.service.WhatsAppService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/whatsapp")
@CrossOrigin(origins = "*")

public class WhatsAppController {

    private final WhatsAppService whatsAppService;

    public WhatsAppController(WhatsAppService whatsAppService) {
        this.whatsAppService = whatsAppService;
    }
    @PostMapping("/send")
    public ResponseEntity<WhatsAppResponse> sendWhatsApp(@Valid @RequestBody WhatsAppRequest request) {
        WhatsAppResponse response = whatsAppService.sendWhatsApp(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<WhatsAppResponse>> getAllWhatsApp() {
        List<WhatsAppResponse> whatsappList = whatsAppService.getAllWhatsApp();
        return new ResponseEntity<>(whatsappList, HttpStatus.OK);
    }
}