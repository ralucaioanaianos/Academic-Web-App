package com.example.AcademicWebApp.Controllers.RestAPIs.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CourseStatistics {
    private int cid;
    private String courseName;
    private int totalNumberOfStudents;
    private int passedStudents;
    private int failedStudents;
    private int[] marks;
}
