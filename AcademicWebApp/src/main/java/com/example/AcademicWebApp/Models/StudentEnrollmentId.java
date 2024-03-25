
package com.example.AcademicWebApp.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentEnrollmentId implements Serializable{


    private String username;

    private Integer fid;

    private Integer year;

    @Override
    public int hashCode() {
        return 1;
    }

    @Override
    public boolean equals(Object obj) {
        com.example.AcademicWebApp.Models.StudentEnrollmentId model = (com.example.AcademicWebApp.Models.StudentEnrollmentId) obj;

        return Objects.equals(model.getUsername(), this.getUsername()) && Objects.equals(model.getYear(), this.getYear()) &&  Objects.equals(model.getFid(), this.getFid());

    }

}

