package com.example.AcademicWebApp.Services;

import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.*;
import com.example.AcademicWebApp.Models.*;
import com.example.AcademicWebApp.Repositories.*;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Service
public class StaffService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private GradeRepo gradeRepo;

    @Autowired
    private FacultyRepo facultyRepo;

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private UserDataRepo userDataRepo;

    @Autowired
    private StudentEnrollmentRepo studentEnrollmentRepo;

    public List<FacultyGroups> getFacultiesWithGroups() {
        List<Faculty> faculties = facultyRepo.findAll();
        List<FacultyGroups> facultyGroups = new ArrayList<>();

        for (Faculty faculty : faculties) {
            List<Group> groups = groupRepo.findAllByFaculty(faculty.getFid());

            FacultyGroups facultyGroup = new FacultyGroups(faculty.getName(), groups);
            facultyGroups.add(facultyGroup);
        }

        return facultyGroups;
    }

    private double calculateAverageGrade(StudentEnrollment s) {
        List<Grade> grades = gradeRepo.findAllByUsernameAndFaculty(s.getUsername(), s.getFid());

        double avg = 0;

        for (Grade grade: grades) {
            avg += (double) grade.getGradevalue();
        }
        avg /= grades.size();

        return avg;
    }

    private int averageGradeComparator(StudentEnrollment s1, StudentEnrollment s2) {
        double avg1 = calculateAverageGrade(s1);
        double avg2 = calculateAverageGrade(s2);

        if (avg1 == avg2) {
            return 0;
        }
        else if (avg1 < avg2) {
            return 1;
        }
        else{
            return -1;
        }
    }

    public List<StudentAverage> getStudentsFromFacultyYearGroup(StaffFilter staffFilter) {
        List<StudentAverage> students = new ArrayList<>();

        String faculty = staffFilter.getFaculty();
        String sYear = staffFilter.getYear();
        String sGroup = staffFilter.getGroup();

        int year = -1, group = -1;
        if (sYear != "")
            year = Integer.parseInt(sYear);
        if (sGroup != "")
            group = Integer.parseInt(sGroup);

        List<StudentEnrollment> filteredStudents = studentEnrollmentRepo.findAllByFacultyYearGroup(faculty, year, group);

        filteredStudents.sort(this::averageGradeComparator);

        for (StudentEnrollment student: filteredStudents) {
            students.add(new StudentAverage(
                    student.getUsername(),
                    userDataRepo.findAllByUsername(student.getUsername()).getName() + " " + userDataRepo.findAllByUsername(student.getUsername()).getSurname(),
                    student.getYear(),
                    groupRepo.findByUsernameFidYear(student.getUsername(), student.getFid(), student.getYear()).getGid(),
                    calculateAverageGrade(student),
                    studentRepo.findByUsername(student.getUsername()).getScholarship()
            ));
        }

        return students;
    }

    public List<Integer> getGroupsByFaculty(FacultyYear facultyYear) {
        List<Integer> groups = new ArrayList<>();

        String faculty = facultyYear.getFaculty();
        String sYear = facultyYear.getYear();

        int year = -1;
        if (sYear != "")
            year = Integer.parseInt(sYear);

        List<Group> groupList = groupRepo.findAllByYearAndFaculty(faculty, year);

        for (Group gr: groupList) {
            groups.add(gr.getGid());
        }

        return groups;
    }

    public Integer setScholarships(FoundingData foundingData) {
        int minimumGrade = foundingData.getMinimumGrade();
        int moneyPerPerson = foundingData.getMoneyPerPerson();

        List<StudentEnrollment> studentEnrollments = studentEnrollmentRepo.findAll();
        studentEnrollments.sort(this::averageGradeComparator);

        int totalFounding = 0;

        for (StudentEnrollment se: studentEnrollments) {
            double grade = calculateAverageGrade(se);
            if (grade >= minimumGrade) {
                studentRepo.setScholarship(se.getUsername(), moneyPerPerson);
                totalFounding += moneyPerPerson;
            }
        }

        return totalFounding;
    }

    public List<StudentGradeStaff> getStudentFounding() {
        List<StudentGradeStaff> studentGrades = new ArrayList<>();

        List<StudentEnrollment> studentEnrollments = studentEnrollmentRepo.findAll();
        studentEnrollments.sort(this::averageGradeComparator);

        for (StudentEnrollment se: studentEnrollments) {
            double grade = calculateAverageGrade(se);
            studentGrades.add(new StudentGradeStaff(
                    se.getUsername(),
                    grade
            ));
        }

        return studentGrades;
    }

}
