package com.example.AcademicWebApp.Models;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity(name = "student")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {

    @Id
    @Column(name = "username")
    private String username;
    @Column(name = "group1")
    private Integer group1;
    @Column(name = "group2")
    private Integer group2;
    @Column(name = "scholarship")
    private Integer scholarship;

    /*
    @Override
    public String toString() {
        return this.username + ", " + this.name + ", " + this.group1 + ", " + this.group2;
    }
    */

}