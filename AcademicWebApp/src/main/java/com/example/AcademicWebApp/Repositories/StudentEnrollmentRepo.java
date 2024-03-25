
package com.example.AcademicWebApp.Repositories;

import com.example.AcademicWebApp.Models.Student;
import com.example.AcademicWebApp.Models.StudentEnrollment;
import com.example.AcademicWebApp.Models.StudentEnrollmentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentEnrollmentRepo extends JpaRepository<StudentEnrollment, StudentEnrollmentId> {

    List<StudentEnrollment> findAllByFidAndYear(Integer fid, Integer year);

    List<StudentEnrollment> findAllByFid(Integer fid);

    @Query("FROM studentenrollment as se " +
            "INNER JOIN group as g ON se.fid = g.faculty AND se.year = g.year " +
            "INNER JOIN student as s ON s.username = se.username AND (g.gid = s.group1 OR g.gid = s.group2) " +
            "INNER JOIN faculty as f ON f.fid = se.fid AND g.faculty = f.fid " +
            "WHERE (f.name = ?1 OR ?1 = '') AND (se.year = ?2 OR ?2 = -1) AND ((s.group1 = ?3 OR s.group2 = ?3 OR ?3 = -1) AND (g.gid = ?3 or ?3 = -1))")
    List<StudentEnrollment> findAllByFacultyYearGroup(String faculty, int year, int group);
 
  
    @Query("SELECT s from studentenrollment s where s.fid = ?1 and s.year = ?2")
    List<StudentEnrollment> getAllStudentEnrollmentsForFidAndYear(int fid, int year);

    @Query("SELECT s from studentenrollment s where s.username = ?1 ")
    List<StudentEnrollment> getStudentEnrollmentsByUsername(String username);
}
