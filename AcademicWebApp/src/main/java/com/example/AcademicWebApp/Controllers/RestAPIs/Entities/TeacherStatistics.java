package com.example.AcademicWebApp.Controllers.RestAPIs.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherStatistics {
    private String username;
    private String fullName;
    List<CourseStatistics> courseStatisticsList;
}
