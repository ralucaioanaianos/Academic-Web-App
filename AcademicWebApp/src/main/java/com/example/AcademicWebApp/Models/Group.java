package com.example.AcademicWebApp.Models;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity(name = "group")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Group {

    @Id
    @Column(name = "gid")
    private Integer gid;
    @Column(name = "faculty")
    private Integer faculty;
    @Column(name = "year")
    private Integer year;



}