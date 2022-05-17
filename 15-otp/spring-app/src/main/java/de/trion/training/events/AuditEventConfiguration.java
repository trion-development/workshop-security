package de.trion.training.events;

import org.springframework.boot.actuate.audit.InMemoryAuditEventRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuditEventConfiguration
{
    @Bean
    public InMemoryAuditEventRepository auditEventRepository() {
        return new InMemoryAuditEventRepository();
    }
}
