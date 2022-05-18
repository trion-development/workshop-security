package de.trion.training;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration(proxyBeanMethods = false)
public class WebSecurityConfiguration
{
    @Bean
    public InMemoryUserDetailsManager userDetailsManager() {

        var user = User
           .withUsername("user")
           .password("password")
           .passwordEncoder(s -> "{noop}" +s)
           .roles("USER", "SIMPEL")
           .build();
        return new InMemoryUserDetailsManager(user);
    }
}
