package com.example.AcademicWebApp.Models;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name = "grade")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@IdClass(GradeId.class)
public class Grade implements Serializable {


    @Column(name = "gradevalue")
    private Integer gradevalue;

    @Id
    @Column(name = "username")
    private String username;

    @Id
    @Column(name = "cid")
    private Integer cid;

    /*
    @Override
    public String toString() {
        return this.username + ", " + this.name + ", " + this.group1 + ", " + this.group2;
    }
    */

}