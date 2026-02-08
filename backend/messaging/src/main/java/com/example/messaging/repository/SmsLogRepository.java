package com.example.messaging.repository;



import com.example.messaging.entity.SmsLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SmsLogRepository extends JpaRepository<SmsLog, Long> {
    List<SmsLog> findAllByOrderByTimestampDesc();
}