package com.example.AcademicWebApp.Repositories;

import com.example.AcademicWebApp.Models.Course;
import com.example.AcademicWebApp.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface CourseRepo extends JpaRepository<Course, Integer>
{
    @Query("from course where fid=?1 and year=?2 and (priority=1 or priority=3)")
    List<Course> findCoursesByFidAndYear(Integer fid, Integer year);

    @Query("from course where fid=?1 and year=?2 and priority=2")
    List<Course> findOptionalsByFidAndYear(Integer fid, Integer year);

    @Query("from course where priority=2")
    List<Course> getOptionals();

    @Modifying
    @Transactional
    @Query("delete from course as c where c.cid=?1")
    void deleteCoursesByCid(int cid);
}