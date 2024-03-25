package com.example.AcademicWebApp.Controllers.RestAPIs.Entities;

import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudentAverage {

    private String username;
    private String name;
    private int year;
    private int group;
    private double finalGrade;
    private int scholarship;

}
