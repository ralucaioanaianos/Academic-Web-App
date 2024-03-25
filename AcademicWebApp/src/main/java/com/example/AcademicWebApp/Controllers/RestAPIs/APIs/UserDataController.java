package com.example.AcademicWebApp.Controllers.RestAPIs.APIs;

import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.Message;
import com.example.AcademicWebApp.Models.UserData;
import com.example.AcademicWebApp.Services.UserDataService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class UserDataController {


    @Autowired
    UserDataService userDataService;

    @GetMapping("/userdata/{username}/{name}")
    public String getFullName(@PathVariable(name = "username") String username, @PathVariable(name="name") String name){
        JSONObject obj = new JSONObject();
        obj.put("fullname", userDataService.getNameByUsername(name));
        return obj.toString();
    }

    @GetMapping("/userdata/{username}")
    public UserData getUserData(@PathVariable(name = "username") String username){
        return userDataService.getUserDataByUsername(username);
    }

    @PostMapping("/userdata/{username}")
    public Message getUserData(@PathVariable(name = "username") String username, @RequestBody UserData userData){
        return userDataService.saveUserData(userData);
    }




}
