package com.example.AcademicWebApp.Models;


import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity(name = "course")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Course {

    @Id
    @Column(name="cid")
    private int cid;

    @Column(name="name")
    private String name;

    @Column(name="fid")
    private int fid;

    @Column(name="year")
    private int year;

    @Column(name="teacher")
    private String teacher;

    @Column(name="semester")
    private int semester;

    @Column(name="maxstudents")
    private int maxstudents;

    @Column(name= "priority")
    private int priority;

    @Column(name= "credits")
    private int credits;

}