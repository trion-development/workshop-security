package de.trion.training.api.oauthclient;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(allowCredentials = "true", originPatterns = "*")
public class ClientController
{
    private final RestTemplate restTemplate;

    public ClientController(@Qualifier("keycloak") RestTemplate restTemplate)
    {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/api/client")
    public Object userinfo()
    {
        return restTemplate.getForObject("/protocol/openid-connect/userinfo", Object.class);
    }
}
