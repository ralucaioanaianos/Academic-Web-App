package com.example.AcademicWebApp.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LogInController {

    @RequestMapping("/login")
    public String logIn(){


        return "login.html";
    }


}
