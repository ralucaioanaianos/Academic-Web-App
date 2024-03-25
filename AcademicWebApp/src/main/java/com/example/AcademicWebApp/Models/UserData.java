package com.example.AcademicWebApp.Models;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity(name = "user_data")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserData {


    @Id
    @Column(name = "username")
    private String username;
    @Column(name = "name")
    private String name;
    @Column(name = "surname")
    private String surname;
    @Column(name = "email")
    private String email;
    @Column(name = "phone_number")
    private String phone_number;
    @Column(name = "home_address")
    private String home_address;
    @Column(name = "cnp")
    private String cnp;




}
