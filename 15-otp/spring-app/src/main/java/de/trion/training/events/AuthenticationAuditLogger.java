package de.trion.training.events;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.actuate.security.AbstractAuthenticationAuditListener;
import org.springframework.security.authentication.event.AbstractAuthenticationEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationAuditLogger extends AbstractAuthenticationAuditListener
{
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void onApplicationEvent(AbstractAuthenticationEvent event)
    {
        // siehe auch org.springframework.boot.actuate.security.AuthenticationAuditListener
        logger.warn("AuthNEvent {} ({}) ", event, event.getClass().getSimpleName());
    }
}
