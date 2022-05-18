package de.trion.training.events;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.boot.actuate.audit.listener.AuditApplicationEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;

@Component
public class AuditEventLogger
{
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @EventListener
    public void auditEvent(AuditApplicationEvent event) {
        AuditEvent auditEvent = event.getAuditEvent();
        logger.info("Principal: {}, type: {}", auditEvent.getPrincipal(), auditEvent.getType());

        if (auditEvent.getData().get("details") instanceof  WebAuthenticationDetails details) {
            logger.info("Remote IP {}, session {}", details.getRemoteAddress(), details.getSessionId());
        }
    }
}
