package de.trion.training.events;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.actuate.security.AbstractAuthorizationAuditListener;
import org.springframework.security.access.event.AbstractAuthorizationEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthorizationAuditLogger extends AbstractAuthorizationAuditListener
{
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void onApplicationEvent(AbstractAuthorizationEvent event)
    {
        // siehe auch org.springframework.boot.actuate.security.AuthorizationAuditListener
        logger.warn("AuthZEvent {} ({}) ", event, event.getClass().getSimpleName());
    }
}
