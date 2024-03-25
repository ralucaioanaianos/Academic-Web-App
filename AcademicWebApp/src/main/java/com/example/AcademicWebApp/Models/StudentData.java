package com.example.AcademicWebApp.Models;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Id;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentData {

    private String username;
    private String faculty1;
    private Integer year1;
    private String faculty2;
    private Integer year2;


}
