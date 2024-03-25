package com.example.AcademicWebApp.Repositories;

import com.example.AcademicWebApp.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends JpaRepository<User, String>
{

}
