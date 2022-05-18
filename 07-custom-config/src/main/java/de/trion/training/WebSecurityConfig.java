package de.trion.training;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

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
    public SecurityFilterChain h2Filter(HttpSecurity httpSecurity) throws Exception
    {
        httpSecurity
           .antMatcher("/h2-console/**")
           .authorizeRequests()
               .anyRequest()
               .permitAll()
           .and()
           .csrf().disable()
           .headers()
           .frameOptions().disable();

        return httpSecurity.build();
    }

    @Bean
    public SecurityFilterChain trainings(HttpSecurity httpSecurity) throws Exception
    {
        httpSecurity
           .mvcMatcher("/trainings/**")
           .authorizeRequests()
           .antMatchers(HttpMethod.POST).hasRole("ADMIN")
           .mvcMatchers("/trainings/*/edit").hasRole("ADMIN")
           .anyRequest().permitAll();
        return httpSecurity.build();
    }

    @Bean
    public SecurityFilterChain login(HttpSecurity httpSecurity) throws Exception
    {
//        var anon = new User("anonymousUser", "", List.of(new SimpleGrantedAuthority("ANONYMOUS")) );
//        httpSecurity.anonymous().principal(anon);

        httpSecurity
           .formLogin()
           .and().logout().logoutSuccessUrl("/");
        return httpSecurity.build();
    }

}
