package com.example.AcademicWebApp.Controllers.RestAPIs;


import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.*;
import com.example.AcademicWebApp.Models.Faculty;
import com.example.AcademicWebApp.Models.Group;
import com.example.AcademicWebApp.Models.Student;
import com.example.AcademicWebApp.Repositories.UsersRepo;
import com.example.AcademicWebApp.Services.StaffService;
import net.bytebuddy.asm.Advice;
import net.bytebuddy.implementation.bind.annotation.Origin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Locale;
import java.util.Objects;


@RestController
public class StaffController  {

    @Autowired
    private StaffService staffService;

    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping("/staff/faculty/students/{username}")
    public List<StudentAverage> getStudentsFromFacultyYearGroup(@PathVariable(name="username") String username, @RequestBody StaffFilter staffFilter) {
        return staffService.getStudentsFromFacultyYearGroup(staffFilter);
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping("/staff/faculty/getGroups/{username}")
    public List<Integer> getGroupsFromFaculties(@PathVariable(name="username") String username, @RequestBody FacultyYear facultyYear) {
        return staffService.getGroupsByFaculty(facultyYear);
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping(value="/staff/founding/set/{username}")
    public Integer setScholarships(@PathVariable(name="username") String username, @RequestBody FoundingData foundingData) {
        return staffService.setScholarships(foundingData);
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping(value="/staff/founding/{username}")
    public List<StudentGradeStaff> getStudentGrades(@PathVariable(name="username") String username) {
        return staffService.getStudentFounding();
    }

}
