package com.example.AcademicWebApp.ControllerTests;

import com.example.AcademicWebApp.Controllers.RestAPIs.APIs.TeacherController;
import com.example.AcademicWebApp.Controllers.RestAPIs.StudentController;
import com.example.AcademicWebApp.Models.Course;
import com.example.AcademicWebApp.Models.FacultyAndYearData;
import com.example.AcademicWebApp.Models.OptionalCourseData;
import com.example.AcademicWebApp.Models.Student;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@SpringBootTest
class TeacherControllerTest {

    @Autowired
    private TeacherController teacherController;


    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getOptionalsForTeacher() {
        List<Course> lo = teacherController.getOptionalCoursesOfTeacher("dorothymcdevitt");
        assert lo.size() == 1;
    }

    @Test
    void getCoursesForTeacher() {
        List<Course> lo = teacherController.getAllCourses("dorothymcdevitt");
        assert lo.size() == 5;
    }


}
