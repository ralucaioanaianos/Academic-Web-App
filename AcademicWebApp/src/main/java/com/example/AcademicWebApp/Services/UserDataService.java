package com.example.AcademicWebApp.Services;

import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.Message;
import com.example.AcademicWebApp.Models.Student;
import com.example.AcademicWebApp.Models.User;
import com.example.AcademicWebApp.Models.UserData;
import com.example.AcademicWebApp.Repositories.UserDataRepo;
import com.example.AcademicWebApp.Repositories.UsersRepo;
import com.example.AcademicWebApp.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userDataService")
public class UserDataService {

    @Autowired
    public UserDataRepo userDataRepo;
    @Autowired
    public UsersRepo usersRepo;

    public String getNameByUsername(String username){
        return userDataRepo.getById(username).getName() + " " + userDataRepo.getById(username).getSurname();
    }

    public UserData getUserDataByUsername(String username){
        return this.userDataRepo.findById(username).get();
    }

    public Message saveUserData(UserData userData) {
        this.userDataRepo.save(userData);

        return new Message("User information saved with success.");
    }

}
