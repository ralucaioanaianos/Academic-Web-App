package com.example.AcademicWebApp.Services;

import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.Message;
import com.example.AcademicWebApp.Controllers.RestAPIs.UserEntity;
import com.example.AcademicWebApp.Models.User;
import com.example.AcademicWebApp.Repositories.*;
import com.example.AcademicWebApp.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service("userService")
public class UserService {

    @Autowired
    UsersRepo usersRepo;

    @Autowired
    TeacherRepo teacherRepo;

    @Autowired
    CourseRepo coursesRepo;

    @Autowired
    OptionalCourseRepo optionalCourseRepo;

    @Autowired
    FacultyRepo facultiesRepo;

    @Autowired
    UserDataRepo userDataRepo;

    @Autowired
    GradeRepo gradeRepo;

    @Autowired
    GroupRepo groupRepo;

    @Autowired
    StudentRepo studentRepo;

    /**
     * Checks the credentials against the database's data
     * @param username The username of the user
     * @param pass The password of the user
     * @return A UserEntity object containing a message and the role (null if sth went wrong)
     */
    public UserEntity logIn(String username, String pass){
        if(usersRepo.existsById(username)){
            /**String hash1 = Utils.hashPassword("text");
             String hash2 = Utils.hashPassword("text");
             System.out.println(hash1);
             System.out.println(hash2);
             System.out.println(Utils.verifyHash("text", hash1));
             System.out.println(Utils.verifyHash("text", hash2));
             */
            pass = pass.replace(" ", "+");
            System.out.println(pass);
            try {
                pass = Utils.decrypt(pass);
            }
            catch (Exception e){
                System.out.println(e.getMessage());
                e.printStackTrace();
                return new UserEntity("null", "Password or username is not correct.");
            }
            User user = usersRepo.getById(username);
            if(Objects.equals(user.getUsername(), username) && Objects.equals(user.getPassword(), pass)){
                return new UserEntity(user.getRole().toString().toLowerCase(), "Logged in successfully.");
            }
            else{
                return new UserEntity("null", "Password is not correct.");
            }
        }
        else{
            return new UserEntity("null", "Username is wrong.");
        }
    }

}
