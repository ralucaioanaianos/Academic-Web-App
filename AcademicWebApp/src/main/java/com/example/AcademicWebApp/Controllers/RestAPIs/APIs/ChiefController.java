package com.example.AcademicWebApp.Controllers.RestAPIs.APIs;

import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.Message;
import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.TeacherStatistics;
import com.example.AcademicWebApp.Models.Course;
import com.example.AcademicWebApp.Services.ChiefService;
import com.example.AcademicWebApp.Services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class ChiefController {

    @Autowired
    TeacherService teacherService;

    @Autowired
    ChiefService chiefService;

    @GetMapping("/chief/getAllOptionalsForApproval/{username}")
    public List<Course> getAllOptionalsForApproval(@PathVariable(name = "username") String username) {
        return chiefService.getAllOptionalsForApproval(username);
    }

    @GetMapping("/chief/getTeacherStatistics/{username}")
    public List<TeacherStatistics> getTeacherStatistics(@PathVariable(name = "username") String username) {
        return chiefService.getTeacherStatistics(username);
    }

    @PostMapping("/chief/approveOptionals/{username}")
    public Message approvedOptionals(@PathVariable(name = "username") String username, @RequestBody List<Course> approvedOptionals){
        return chiefService.approveOptionals(username, approvedOptionals);
    }

    @PostMapping("/assignStudentsToOptionals/{username}")
    public Message assignStudentsToOptionals(@PathVariable(name = "username") String username){
        return chiefService.assignStudentsToOptionals();
    }
}
