package com.example.AcademicWebApp.Controllers.RestAPIs.Entities;

import com.example.AcademicWebApp.Models.Group;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FacultyGroups {

    private String facultyName;
    private List<Group> groups;

}
