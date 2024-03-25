package com.example.AcademicWebApp.Controllers.RestAPIs;


import com.example.AcademicWebApp.Models.*;
import com.example.AcademicWebApp.Repositories.StudentRepo;
import com.example.AcademicWebApp.Services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Objects;


@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequiredArgsConstructor
//@RequestMapping("/")
public class StudentController {

    @Autowired
    private StudentRepo studentRepo;
    @Autowired
    private StudentService studentService;


    @GetMapping("/{username}/Student")
    public UserEntity getStudent(@PathVariable("username") String username, HttpServletRequest request)
    {
        return (UserEntity) request.getAttribute("userEntity");
    }

    @RequestMapping("/students")
    public String getStudents()
    {
        return studentRepo.findAll().toString();
    }

    @GetMapping("/student/{username}")
    public Student getStudentByUsername(@PathVariable("username") String username)
    {
        return studentRepo.findByUsername(username);
    }

    @GetMapping("/student/group1/{group1}")
    public List<Student> getStudentsByFirstGroup(@PathVariable("group1") String group1)
    {
        return studentRepo.findAllByGroup1(Integer.valueOf(group1));
    }

    @GetMapping("/student/group2/{group2}")
    public List<Student> getStudentsBySecondGroup(@PathVariable("group2") String group2)
    {
        return studentRepo.findBySecondGroup(Integer.valueOf(group2));
    }


    @PostMapping(value = "/student/add",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public Student addStudent(@RequestBody StudentData student)
    {

        return studentService.saveStudent(student);
    }



    @GetMapping("/student/getCoursesFirstGroup/{username}")
    public List<Course> getCoursesForStudentFirstGroup(@PathVariable(name = "username") String username)
    {
        return studentService.getCoursesForFirstGroup(username);

    }

    @GetMapping("/student/getCoursesSecondGroup/{username}")
    public List<Course> getCoursesForStudentSecondGroup(@PathVariable(name = "username") String username)
    {
        return studentService.getCoursesForSecondGroup(username);

    }

    @GetMapping("/student/getOptionalsByFacultyAndYear")
    public List<Course> getOptionalsByFacultyAndYear(@RequestBody OptionalCourseData data)
    {
        return studentService.getOptionalsBasedOnFacultyAndYear(data);
    }

    @GetMapping("/student/getAllOptionals")
    public List<Course> getAllOptionals()
    {
        return studentService.getAllOptionals();
    }

    @GetMapping("/student/getFaculties")
    public List<Faculty> getFacultiesForStudent()
    {
        return studentService.getFaculties();
    }


    @PostMapping(value="/student/sendOptionalsPreferences/{username}",
            consumes = "application/json",
            produces = "application/json")
    public List<OptionalCourseEnrollment> sendOptionalsPreferences(@RequestBody List<Course> courses, @PathVariable(name = "username") String username)
    {
        return studentService.sendOptionalsPreferences(courses, username);
    }


    @GetMapping("/student/getAllCoursesForWhichEnrolled/{username}")
    public List<Course> getAllCoursesForWhichEnrolled(@PathVariable(name = "username") String username)
    {
        return studentService.getAllCoursesForWhichEnrolled(username);
    }



    @GetMapping("/student/getFacultiesAndYears/{username}")
    public List<FacultyAndYearData> getFacultiesAndYears(@PathVariable(name = "username") String username)
    {
        return studentService.getFacultiesAndYears(username);
    }

    @PostMapping(value="/student/getGrades/{username}",
            consumes = "application/json",
            produces = "application/json")
    public List<CourseGradeData> getGrades(@PathVariable(name = "username") String username,@RequestBody FacultyAndYearData data)
    {
        return studentService.getGrades(username, data);
    }


    public String sayHello(UserEntity user)
    {
        return "You are a " + user.getRole() + ". This should be that page where you can edit your profile and etc.";
    }

    @GetMapping("/checkIfAssignToOptionalsEnabled/{username}")
    public Integer checkIfAssignEnabled(@PathVariable(name = "username") String username){
        if(Objects.equals(username, "cathygeorge"))
            return studentService.checkIfAssignEnabled();
        else return 0;
    }

}
