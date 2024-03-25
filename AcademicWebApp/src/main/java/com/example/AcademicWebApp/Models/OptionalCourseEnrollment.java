
package com.example.AcademicWebApp.Models;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

@Data
@Entity(name = "optional_course_enrollment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@IdClass(OptionalCourseEnrollment.class)
public class OptionalCourseEnrollment implements Serializable {


    @Id
    @Column(name="username")
    private String username;

    @Id
    @Column(name="cid")
    private int cid;

    @Column(name="preference")
    private int preference;

}
