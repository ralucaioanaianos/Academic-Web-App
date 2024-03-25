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
public class GradeId implements Serializable {

    private String username;

    private Integer cid;

    @Override
    public int hashCode() {
        return Objects.hash(username, cid);
    }

    @Override
    public boolean equals(Object obj) {
        GradeId gradeId = (GradeId) obj;

        return Objects.equals(gradeId.getCid(), this.getCid()) && Objects.equals(gradeId.getUsername(), this.getUsername());

    }
}
