package com.example.AcademicWebApp.Repositories;

import com.example.AcademicWebApp.Models.Course;
import com.example.AcademicWebApp.Models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeacherRepo extends JpaRepository<Teacher, String> {

    @Query("SELECT t FROM teacher AS t INNER JOIN course c on t.username = c.teacher INNER JOIN faculty f on f.fid = c.fid where f.fid = ?1")
    List<Teacher> getAllTeachersForFid(int fid);

    @Query("SELECT c from course c where c.teacher = ?1 and c.fid = ?2")
    List<Course> getAllCoursesForTeacherForFid(String username, int fid);

    @Query("SELECT c from course c where c.teacher = ?1")
    List<Course> getAllCoursesForTeacher(String username);
}
