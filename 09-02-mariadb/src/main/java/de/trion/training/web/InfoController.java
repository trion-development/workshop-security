package de.trion.training.web;

import de.trion.training.common.training.TrainingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;
import java.util.Map;

@Controller
public class InfoController {

   private final Logger logger = LoggerFactory.getLogger(getClass());

   @RequestMapping("/info")
   public ModelAndView info() {

      final SecurityContext context = SecurityContextHolder.getContext();
      final Authentication authentication = context.getAuthentication();
      final Object principal = authentication.getPrincipal();
      logger.info("Name: {}, principal: {}, authorities: {}", authentication.getName(), principal, authentication.getAuthorities());
      var details = authentication.getDetails();
      if (details instanceof WebAuthenticationDetails webDetails) {
         logger.info("Remote ip: {}, session: {}", webDetails.getRemoteAddress(), webDetails.getSessionId());
      }

      return new ModelAndView("info", Map.of("heading", "Info!"));
   }

   @Autowired
   TrainingService trainingService;

   @RequestMapping("/info2")
   public ModelAndView info2(Principal principal, Authentication authentication,
                             @AuthenticationPrincipal UserDetails user, @CurrentSecurityContext SecurityContext context) {

      logger.info("principal: {}", principal);
      if (authentication != null)
      {
         logger.info("Name: {}, authorities: {}", authentication.getName(), authentication.getAuthorities());
         var details = authentication.getDetails();
         if (details instanceof WebAuthenticationDetails webDetails)
         {
            logger.info("Remote ip: {}, session: {}", webDetails.getRemoteAddress(), webDetails.getSessionId());
         }
      }
      else
      {
         logger.info("Authentication is null.");
      }

      logger.info("user: {}", user);
      var contextAuthentication = context.getAuthentication();
      logger.info("context principal: {} ({}), context authentication: {}", principal, contextAuthentication.getPrincipal().getClass(), contextAuthentication);

      return new ModelAndView("info", Map.of("heading", "Info!"));
   }
}
