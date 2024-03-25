package com.example.AcademicWebApp.Models;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity(name = "optional_course")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OptionalCourse {

    @Id
    @Column(name="cid")
    private int cid;

    @Column(name="username")
    private String username;
}
