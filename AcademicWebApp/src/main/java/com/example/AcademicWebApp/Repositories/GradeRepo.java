package com.example.AcademicWebApp.Repositories;

import com.example.AcademicWebApp.Models.Grade;
import com.example.AcademicWebApp.Models.GradeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface GradeRepo extends JpaRepository<Grade, GradeId> {

    @Query("from grade where username = ?1")
    List<Grade> getAllGradesByUsername(String username);


    List<Grade> findAllByUsername(String username);

    @Query("FROM grade AS g " +
            "INNER JOIN course AS c ON g.cid = c.cid " +
            "WHERE g.username = ?1 AND c.fid = ?2")
    List<Grade> findAllByUsernameAndFaculty(String username, int faculty);

    @Modifying
    @Transactional
    @Query("delete from grade as c where c.cid=?1")
    void deleteGradesByCid(int cid);

}

