package com.example.AcademicWebApp.Repositories;

import com.example.AcademicWebApp.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface StudentRepo extends JpaRepository<Student, String>
{
    @Query("from student where group1 = ?1")
    List<Student> findByFirstGroup(Integer group1);

    Student findByUsername(String username);

    @Modifying
    @Transactional
    @Query("UPDATE student SET scholarship = ?2 WHERE username = ?1")
    void setScholarship(String username, int scholarship);

    List<Student> findAllByGroup1(Integer group1);

    List<Student> findAllByGroup2(Integer group2);

    @Query("from student where group2 = ?1")
    List<Student> findBySecondGroup(Integer group2);
}