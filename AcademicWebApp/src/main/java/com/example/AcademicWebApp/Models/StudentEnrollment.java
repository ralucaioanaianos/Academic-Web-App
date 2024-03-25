
package com.example.AcademicWebApp.Models;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Data
@Entity(name = "studentenrollment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@IdClass(StudentEnrollmentId.class)
public class StudentEnrollment {

    @Id
    @Column(name="username")
    private String username;
    @Id
    @Column(name="fid")
    private Integer fid;
    @Id
    @Column(name="year")
    private Integer year;

}
