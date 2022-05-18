package de.trion.training;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

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

        var mgr = new JdbcUserDetailsManager(dataSource);
        mgr.createUser(user);
        mgr.createUser(admin);
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
           .antMatcher("/h2-console/**")
           .requestMatcher(request -> request.getRemoteAddr().startsWith("127.0.0"))
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
