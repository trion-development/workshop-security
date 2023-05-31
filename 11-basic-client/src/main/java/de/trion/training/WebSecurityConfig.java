package de.trion.training;

import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity(debug = true)
@Configuration(proxyBeanMethods = false)
public class WebSecurityConfig {

    @Profile("dev")
    @Bean
    public DataSource dataSource() {
        //besser: properties in profilen definieren
        System.setProperty("spring.flyway.baseline-on-migrate", "true");
        System.setProperty("spring.flyway.baseline-version", "0");
        var builder = new EmbeddedDatabaseBuilder();
        return builder.setType(EmbeddedDatabaseType.H2)
           .addScript("classpath:org/springframework/security/core/userdetails/jdbc/users.ddl").build();
    }

    @Bean
    UserDetailsManager users(DataSource dataSource)
    {
        var encoder = passwordEncoder();
        UserDetails user = User.withUsername("user")
           .password("password")
           .roles("USER")
           .passwordEncoder(encoder::encode)
           .build();

        var admin = User.withUsername("admin")
            .password("admin")
            .roles("ADMIN")
            .passwordEncoder(s -> "{noop}"+s)
            .build();

        var endpointAdmin = User.withUsername("endpoint")
           .password("endpoint")
           .roles("ENDPOINT_ADMIN")
           .passwordEncoder(s -> "{noop}"+s)
           .build();

        var mgr = new JdbcUserDetailsManager(dataSource);
        mgr.createUser(user);
        mgr.createUser(admin);
        mgr.createUser(endpointAdmin);
        return mgr;
    }

    @Bean
    PasswordEncoder passwordEncoder()
    {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Profile("dev")
    @Bean
    public SecurityFilterChain h2Filter(HttpSecurity httpSecurity) throws Exception
    {
        httpSecurity
           .securityMatcher(PathRequest.toH2Console())
           .authorizeRequests()
           .anyRequest()
           .permitAll()
           .and()
           .csrf(c -> c.disable())
           .headers(h -> h.frameOptions(o -> o.disable()))
        ;

        return httpSecurity.build();
    }

    @Bean
    public SecurityFilterChain trainings(HttpSecurity httpSecurity) throws Exception
    {
        httpSecurity
           .securityMatcher("/trainings/**")
           .authorizeRequests()
           .requestMatchers(HttpMethod.POST).hasRole("ADMIN")
           .requestMatchers("/trainings/*/edit").hasRole("ADMIN")
           .anyRequest().permitAll();
        return httpSecurity.build();
    }

    @Bean
    public SecurityFilterChain api(HttpSecurity httpSecurity) throws Exception
    {
        return httpSecurity
           .securityMatcher("/api/**")
           .authorizeRequests(a ->
              a.requestMatchers(HttpMethod.POST).hasRole("ADMIN")
                 .anyRequest().permitAll())
           .httpBasic(withDefaults())
           .oauth2ResourceServer(o -> o.jwt(withDefaults()))
           .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.NEVER))
           .build();
    }

    @Bean
    public SecurityFilterChain endpoint(HttpSecurity http) throws Exception {
        http.securityMatcher(EndpointRequest.toAnyEndpoint().excluding(HealthEndpoint.class))
           .authorizeRequests(a -> a.anyRequest().hasRole("ENDPOINT_ADMIN"))
           .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public SecurityFilterChain login(HttpSecurity httpSecurity) throws Exception
    {
        httpSecurity
           .formLogin(Customizer.withDefaults())
           .logout(l -> l.logoutSuccessUrl("/"));
        return httpSecurity.build();
    }

}
