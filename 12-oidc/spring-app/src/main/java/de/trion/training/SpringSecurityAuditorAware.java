package de.trion.training;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SpringSecurityAuditorAware implements AuditorAware<String>
{
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public Optional<String> getCurrentAuditor()
    {
        logger.info("Retrieving auditor: {}", SecurityContextHolder.getContext().getAuthentication());
        return Optional.ofNullable(SecurityContextHolder.getContext())
           .map(SecurityContext::getAuthentication)
           .filter(Authentication::isAuthenticated)
           .map(Authentication::getPrincipal)
           .map( p -> {
               if (p instanceof User user)
               {
                   return user.getUsername();
               }
               if (p instanceof Jwt jwt)
               {
                   return jwt.getClaimAsString("preferred_username");
               }
               return null;
           });
    }
}
