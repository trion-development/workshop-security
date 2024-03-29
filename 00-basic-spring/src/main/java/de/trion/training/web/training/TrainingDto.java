package de.trion.training.web.training;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public class TrainingDto {

   @JsonProperty(value="internal_id", access = JsonProperty.Access.READ_ONLY)
   private String id;

   @JsonProperty(access = JsonProperty.Access.READ_ONLY)
   private Integer version;

   @NotBlank
   private String location;

   @NotNull
   @Size(min=4, max=100)
   private String topic;

   @Valid
   private InstructorDto instructor;

   private String description;
   @JsonIgnore
   private LocalDateTime createdOn;
   private LocalDateTime modifiedOn;

   private Integer seats;

   public Integer getSeats() {
      return seats;
   }

   public void setSeats(Integer seats) {
      this.seats = seats;
   }

   public String getId() {
      return id;
   }

   public void setId(String id) {
      this.id = id;
   }

   public Integer getVersion()
   {
      return version;
   }

   public void setVersion(Integer version)
   {
      this.version = version;
   }

   public String getLocation() {
      return location;
   }

   public void setLocation(String location) {
      this.location = location;
   }

   public String getTopic() {
      return topic;
   }

   public void setTopic(String topic) {
      this.topic = topic;
   }

   public InstructorDto getInstructor() {
      return instructor;
   }

   public void setInstructor(InstructorDto instructor) {
      this.instructor = instructor;
   }

   public String getDescription() {
      return description;
   }

   public void setDescription(String description) {
      this.description = description;
   }

   public LocalDateTime getCreatedOn() {
      return createdOn;
   }

   public void setCreatedOn(LocalDateTime createdOn) {
      this.createdOn = createdOn;
   }

   public LocalDateTime getModifiedOn() {
      return modifiedOn;
   }

   public void setModifiedOn(LocalDateTime modifiedOn) {
      this.modifiedOn = modifiedOn;
   }
}
