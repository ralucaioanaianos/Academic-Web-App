package com.example.AcademicWebApp.Repositories;

import com.example.AcademicWebApp.Models.Faculty;
import com.example.AcademicWebApp.Models.Group;
import com.example.AcademicWebApp.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface GroupRepo extends JpaRepository<Group, Integer>
{
    @Query("Select g.gid from group g where g.faculty=?1 and g.year=?2")
    List<Integer> findAllGidsByFacultyAndYear(Integer faculty, Integer year);

    List<Group> findAllByFaculty(Integer faculty);

    @Query("FROM group AS g " +
            "INNER JOIN faculty AS f ON g.faculty = f.fid " +
            "WHERE (f.name = ?1 OR ?1 = '') AND (g.year = ?2 OR ?2 = -1)")
    List<Group> findAllByYearAndFaculty(String faculty, int year);

    @Query("FROM group AS g " +
            "INNER JOIN student AS s ON s.group1 = g.gid OR s.group2 = g.gid " +
            "WHERE s.username = ?1 AND g.faculty = ?2 AND g.year = ?3")
    Group findByUsernameFidYear(String username, int fid, int year);

}