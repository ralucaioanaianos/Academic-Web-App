package com.example.AcademicWebApp.Repositories;

import com.example.AcademicWebApp.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface OptionalCourseEnrollmentRepo extends JpaRepository<OptionalCourseEnrollment, Integer> {

    @Query("from optional_course_enrollment where username=?1 order by preference")
    public List<OptionalCourseEnrollment> getAllByUsername(String username);

    @Modifying
    @Transactional
    @Query("delete from optional_course_enrollment as s where s.username=?1")
    public void deleteOptionalCourseEnrollmentsByUsername(String username);

    @Modifying
    @Transactional
    @Query("delete from optional_course_enrollment as c where c.cid=?1")
    public void deleteOptionalCourseEnrollmentsByCid(int cid);

    @Query("from optional_course_enrollment where cid=?1")
    List<OptionalCourseEnrollment> getAllByCid(int cid);
}
