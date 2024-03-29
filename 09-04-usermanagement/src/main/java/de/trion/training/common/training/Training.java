package de.trion.training.common.training;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "TBL_TRAININGS")
public class Training {

   @Id
   @Column(name = "COL_ID", nullable = false, length = 36, columnDefinition = "char")
   @GeneratedValue(generator = "uuid")
   @GenericGenerator(name = "uuid", strategy = "uuid2")
   private String id;

   @Version
   @Column(name = "COL_VERSION")
   private Integer version;

   @Column(name="COL_LOCATION")
   @NotBlank
   private String location;

   @Column(name="COL_TOPIC")
   @Size(min=4, max=100)
   private String topic;

   @ReadOnlyProperty
   @CreatedDate
   @Column(name="COL_CREATED_ON", updatable = false)
   private LocalDateTime createdOn;

   @ReadOnlyProperty
   @CreatedBy
   @Column(name="COL_CREATED_BY", updatable = false)
   private String createdBy;

   @LastModifiedDate
   @Column(name="COL_MODIFIED_ON")
   private LocalDateTime modifiedOn;

   @ReadOnlyProperty
   @LastModifiedBy
   @Column(name="COL_MODIFIED_BY")
   private String modifiedBy;

   @Valid
   private Instructor instructor;

   @Column(name="COL_DESCRIPTION")
   private String description;

   public String getDescription() {
      return description;
   }

   public void setDescription(String description) {
      this.description = description;
   }

   public String getId() {
      return id;
   }

   public void setId(String id) {
      this.id = id;
   }

   public static TrainingBuilder withLocation(String location) {
      return new TrainingBuilder().withLocation(location);
   }

   public static TrainingBuilder withTopic(String topic) {
      return new TrainingBuilder().withTopic(topic);
   }

   public static TrainingBuilder withInstructor(String name) {
      return new TrainingBuilder().withInstructor(name);
   }

   public static TrainingBuilder withId(String id) {
      return new TrainingBuilder().withId(id);
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

   public Instructor getInstructor() {
      return instructor;
   }

   public void setInstructor(Instructor instructor) {
      this.instructor = instructor;
   }

   public Integer getVersion() {
      return version;
   }

   public void setVersion(Integer version) {
      this.version = version;
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

   public String getCreatedBy()
   {
      return createdBy;
   }

   public void setCreatedBy(String createdBy)
   {
      this.createdBy = createdBy;
   }

   public String getModifiedBy()
   {
      return modifiedBy;
   }

   public void setModifiedBy(String modifiedBy)
   {
      this.modifiedBy = modifiedBy;
   }

   public static class TrainingBuilder {
      private Training template = new Training();

      public TrainingBuilder withLocation(String location) {
         template.location = location;
         return this;
      }

      public TrainingBuilder withTopic(String topic) {
         template.topic = topic;
         return this;
      }

      public TrainingBuilder withInstructor(String name) {
         template.instructor = new Instructor(name);
         return this;
      }

      public TrainingBuilder withDescription(String text) {
         template.description = text;
         return this;
      }

      public TrainingBuilder withId(String id) {
         template.id = id;
         return this;
      }

      public Training build() {
         return template;
      }
   }

   @Override
   public String toString() {
      return "Training{" +
            "location='" + location + '\'' +
            ", topic='" + topic + '\'' +
            ", instructor=" + instructor +
            '}';
   }
}
