
package com.example.AcademicWebApp.Controllers.RestAPIs.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentGrade {

    private String username;
    private String name;
    private int group;
    private String courseName;
    private int cid;
    private int gradeValue;


}
