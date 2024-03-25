package com.example.AcademicWebApp.Controllers.RestAPIs;
import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.Message;
import com.example.AcademicWebApp.Repositories.UsersRepo;
import com.example.AcademicWebApp.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;
import javax.servlet.http.HttpServletRequest;
import java.util.Locale;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class UserController {

    @Autowired
    UsersRepo usersRepo;
    @Autowired
    UserService userService;

    @GetMapping("/user/{username}")
    public UserEntity getUser(@PathVariable("username") String username, @RequestParam("password") String pass){
        return userService.logIn(username, pass);
    }




}
