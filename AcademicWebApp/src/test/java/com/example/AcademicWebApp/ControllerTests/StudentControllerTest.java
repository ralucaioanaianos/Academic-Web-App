package com.example.AcademicWebApp.ControllerTests;

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
class StudentControllerTest {

    @Autowired
    private StudentController studentController;


    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getStudentByUsername() {
        Student s = studentController.getStudentByUsername("johnroberts");
        assert s.getGroup1() == 95;
    }

    @Test
    void getStudentsByFirstGroup() {
        List<Student> s = studentController.getStudentsByFirstGroup("95");
        Student st = studentController.getStudentByUsername("johnroberts");
        assert s.contains(st);

    }

    @Test
    void getStudentsBySecondGroup() {
        List<Student> s = studentController.getStudentsBySecondGroup("40");
        assert s.size() != 0;

    }

    //@Test
    //void getCoursesFirstGroup()
    //{
    //    List<Course> lc = studentController.getCoursesForStudentFirstGroup("robertrobertson");
    //    assert lc.size() != 0;
    //
    //
    // }

    @Test
    void getOptionalsByFacultyAndYear() {
        List<Course> lc = studentController.getOptionalsByFacultyAndYear(new OptionalCourseData("Mathematics and Informatics-Informatica", 1));
        assert lc.size() == 0;
        lc = studentController.getOptionalsByFacultyAndYear(new OptionalCourseData("Mathematics and Informatics-Informatica", 3));
        assert lc.size() != 0;

    }

}