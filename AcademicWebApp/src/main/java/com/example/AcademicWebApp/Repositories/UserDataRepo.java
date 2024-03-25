
package com.example.AcademicWebApp.Repositories;

import com.example.AcademicWebApp.Models.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDataRepo extends JpaRepository<UserData, String> {

    UserData findAllByUsername(String username);
}
