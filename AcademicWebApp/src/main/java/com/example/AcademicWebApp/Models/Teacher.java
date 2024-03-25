package com.example.AcademicWebApp.Models;


import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity(name = "teacher")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Teacher {

    @Id
    @Column(name = "username")
    private String username;

    @Override
    public String toString() {
        return "Teacher{" +
                "username='" + username + '\'' +
                '}';
    }
}
