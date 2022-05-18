package de.trion.training;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.AbstractOAuth2Token;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.Duration;

@EnableJpaAuditing
@SpringBootApplication
public class TrainingAppApplication {

   public static void main(String[] args) {
      SpringApplication.run(TrainingAppApplication.class, args);
   }

   @Bean
   RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder) {
      return restTemplateBuilder
            .setConnectTimeout(Duration.ofMillis(1_500))
            .setReadTimeout(Duration.ofSeconds(2))
            .build();
   }

   @Qualifier("actuator")
   @Bean
   RestTemplate actuatorRestTemplate(RestTemplateBuilder builder) {
      return builder
         .basicAuthentication("endpoint", "endpoint")
         .rootUri("http://localhost:8080/actuator")
         .build();
   }

   @Qualifier("keycloak")
   @Bean
   RestTemplate kcRestTemplate(OAuth2AuthorizedClientService clientService, RestTemplateBuilder builder) {

      var tokenInterceptor = new ClientHttpRequestInterceptor()  {
         @Override
         public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException
         {
            final SecurityContext securityContext = SecurityContextHolder.getContext();
            final Authentication authentication = securityContext.getAuthentication();

            //unauhenticated request
            if (authentication == null) {
               return execution.execute(request, body);
            }

            //oauth2
            if (authentication.getCredentials() instanceof AbstractOAuth2Token token) {
               request.getHeaders().setBearerAuth(token.getTokenValue());
            }

            //oidc
            if(securityContext.getAuthentication() instanceof OAuth2AuthenticationToken token) {
               OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(token.getAuthorizedClientRegistrationId(),token.getName());
               request.getHeaders().setBearerAuth(client.getAccessToken().getTokenValue());
            }
            return execution.execute(request, body);
         }
      };

      return builder
         .rootUri("http://localhost:9090/realms/app")
         .additionalInterceptors(tokenInterceptor)
         .build();
   }

}
