package de.trion.training;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity(debug = true)
@Configuration(proxyBeanMethods = false)
public class WebSecurityConfig {
    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
           .username("user")
           .password("password")
           .roles("USER")
           .build();

        var admin = User.builder()
            .username("admin")
            .password("admin")
            .roles("ADMIN")
            .passwordEncoder(s -> "{noop}"+s)
            .build();

        return new InMemoryUserDetailsManager(user, admin);
    }

    @Profile("dev")
    @Bean
    SecurityFilterChain h2ConsoleSecurity(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
           .antMatcher("/h2-console/**")
           .csrf().disable()
           .headers().frameOptions().disable();

        return httpSecurity.build();
    }

}
