package de.trion.training.api.training;

import de.trion.training.web.training.InstructorDto;
import de.trion.training.web.training.TrainingDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.json.BasicJsonTester;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.sql.DataSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureJsonTesters
@AutoConfigureMockMvc
public class TrainingApiTest {
   @Autowired
   private MockMvc mockMvc;
   @Autowired
   private BasicJsonTester jsonTester;

   @Autowired
   private JacksonTester<TrainingDto> jacksonTester;

   @WithMockUser
   @Test
   public void get() throws Exception {
      String content = mockMvc.perform(MockMvcRequestBuilders.get("/api/trainings")
                  .param("size", "7"))
            //.andDo(print())
            .andReturn().getResponse().getContentAsString();

      assertThat(jsonTester.from(content))
            .extractingJsonPathArrayValue("$.content").hasSize(7);
   }

   @WithMockUser(roles = "ADMIN")
   @Test
   public void add() throws Exception {
      var training = new TrainingDto();
      training.setTopic("Testing");
      training.setLocation("Unit Test");
      var instructor = new InstructorDto();
      instructor.setName("Mr. Robot");
      training.setInstructor(instructor);

      String content = mockMvc.perform(MockMvcRequestBuilders.post("/api/trainings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jacksonTester.write(training).getJson()))
            //.andDo(print())
            .andReturn().getResponse().getContentAsString();

      assertThat(jacksonTester.parseObject(content))
            .extracting(TrainingDto::getTopic)
            .isEqualTo("Testing");
   }


   @TestConfiguration
   public static class UserCfg {
      @Bean
      UserDetailsManager users(PasswordEncoder passwordEncoder) {
         var endpointAdmin = User.withUsername("endpoint")
            .password("endpoint")
            .roles("ENDPOINT_ADMIN")
            .passwordEncoder(s -> "{noop}"+s)
            .build();

         return new InMemoryUserDetailsManager(endpointAdmin);
      }
   }

   @Test
   public void endpointBasicAuth() throws Exception {
      String content = mockMvc.perform(MockMvcRequestBuilders
            .get("/actuator/info").with(httpBasic("endpoint","endpoint")))
         .andDo(print())
         .andExpect(status().isOk())
         .andReturn().getResponse().getContentAsString();

      assertThat(jsonTester.from(content))
         .extractingJsonPathStringValue("$.sample").isEqualTo("from info");
   }
}
