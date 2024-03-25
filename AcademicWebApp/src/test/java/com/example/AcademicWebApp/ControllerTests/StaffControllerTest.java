package com.example.AcademicWebApp.ControllerTests;

import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.StudentGradeStaff;
import com.example.AcademicWebApp.Controllers.RestAPIs.StaffController;
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
class StaffControllerTest {

    @Autowired
    private StaffController staffController;


    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }


    @Test
    void getStudentGrades() {
        List<StudentGradeStaff> lg = staffController.getStudentGrades("robertrobertson");
        assert lg.size() != 0;
    }
}
