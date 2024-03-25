package com.example.AcademicWebApp.Models;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity(name = "faculty")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Faculty {

    @Id
    @Column(name="fid")
    private int fid;

    @Column(name="name")
    private String name;

    @Column(name="noyears")
    private int noyears;

    @Column(name="chief")
    private String chief;

    @Override
    public String toString() {
        return "Faculty{" +
                "fid=" + fid +
                ", name='" + name + '\'' +
                ", noYears=" + noyears +
                ", chief='" + chief + '\'' +
                '}';
    }
}

