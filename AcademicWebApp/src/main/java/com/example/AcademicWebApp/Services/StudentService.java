package com.example.AcademicWebApp.Services;
import com.example.AcademicWebApp.Models.*;
import com.example.AcademicWebApp.Repositories.*;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@NoArgsConstructor
@Service("studentService")
public class StudentService {

    @Autowired
    private StudentRepo studentRepository;
    @Autowired
    private FacultyRepo facultyRepo;
    @Autowired
    private GroupRepo groupRepo;
    @Autowired
    private CourseRepo courseRepo;
    @Autowired
    private OptionalCourseEnrollmentRepo optionalCourseEnrollmentRepo;
    @Autowired
    private GradeRepo gradeRepo;
    @Autowired
    private StudentEnrollmentRepo studentEnrollmentRepo;


    public Student saveStudent(StudentData student)
    {
        Integer fid1 = facultyRepo.findFidByName(student.getFaculty1());
        Integer year1 = student.getYear1();
        Integer fid2 = facultyRepo.findFidByName(student.getFaculty2());
        Integer year2 = student.getYear2();
        String username = student.getUsername();
        //we must get the groups
        List<Integer> groups1 = groupRepo.findAllGidsByFacultyAndYear(fid1, year1);
        List<Integer> groups2 = groupRepo.findAllGidsByFacultyAndYear(fid2, year2);
        Random rand = new Random();
        Integer group1 = groups1.get(rand.nextInt(groups1.size()));
        Integer group2;

        if(groups2.size() == 0)
            group2 = null;
        else {
            group2 = groups2.get(rand.nextInt(groups2.size()));
        }
        Student newS = new Student(username, group1, group2, 0);
        StudentEnrollment newSE1 = new StudentEnrollment(username, fid1, year1);

        studentRepository.save(newS);
        studentEnrollmentRepo.save(newSE1);
        if (groups2.size() != 0) {
            StudentEnrollment newSE2 = new StudentEnrollment(username, fid2, year2);
            studentEnrollmentRepo.save(newSE2);
        }
        return newS;
    }

    public List<Faculty> getFaculties()
    {
        List<Faculty> listOfFaculties = facultyRepo.findAll();
        return listOfFaculties;
    }

    public List<Course> getOptionalsBasedOnFacultyAndYear(OptionalCourseData data)
    {
        String facultyName = data.getFaculty();
        Integer year = data.getYear();
        Integer fid = facultyRepo.findFidByName(facultyName);
        return courseRepo.findOptionalsByFidAndYear(fid, year);
    }

    public List<Course> getCoursesForFirstGroup(String username)
    {
        Student s = studentRepository.getById(username);
        Integer firstGroup = s.getGroup1();
        Group group = groupRepo.getById(firstGroup);
        Integer fid = group.getFaculty();
        Integer year = group.getYear();
        List<Course> courses = courseRepo.findCoursesByFidAndYear(fid, year);
        return courses;
    }

    public List<Course> getCoursesForSecondGroup(String username)
    {
        Student s = studentRepository.getById(username);
        Integer secondGroup = s.getGroup2();
        if(secondGroup == null)
            return null;
        Group group = groupRepo.getById(secondGroup);

        Integer fid = group.getFaculty();
        Integer year = group.getYear();
        List<Course> courses = courseRepo.findCoursesByFidAndYear(fid, year);
        return courses;
    }

    public List<FacultyAndYearData> getFacultiesAndYears(String username)
    {
        List<FacultyAndYearData> listF = new ArrayList<>();
        Student s = studentRepository.getById(username);
        Integer group1id = s.getGroup1();
        Integer group2id = s.getGroup2();

        Group group1 = groupRepo.getById(group1id);
        Faculty faculty1 = facultyRepo.getById(group1.getFaculty());
        String faculty1name = faculty1.getName();
        int faculty1years = group1.getYear();
        FacultyAndYearData f1data = new FacultyAndYearData(faculty1name, faculty1years);
        listF.add(f1data);

        if(group2id != null)
        {
            Group group2 = groupRepo.getById(group2id);
            Faculty faculty2 = facultyRepo.getById(group2.getFaculty());
            String faculty2name = faculty2.getName();
            int faculty2years = group2.getYear();
            FacultyAndYearData f2data = new FacultyAndYearData(faculty2name, faculty2years);
            listF.add(f2data);
        }

        return listF;

    }


    public List<OptionalCourseEnrollment> sendOptionalsPreferences(List<Course> courses, String username)
    {

        optionalCourseEnrollmentRepo.deleteOptionalCourseEnrollmentsByUsername(username);

        Student s = studentRepository.getById(username);
        List<OptionalCourseEnrollment> oce = optionalCourseEnrollmentRepo.getAllByUsername(username);
        if (oce.size() >= 5){
            return null;
        }
        int preference = 1;
        for(Course course: courses)
        {
            OptionalCourseEnrollment oc = new OptionalCourseEnrollment(username, course.getCid(), preference);
            preference++;
            optionalCourseEnrollmentRepo.save(oc);
        }

        return optionalCourseEnrollmentRepo.getAllByUsername(username);

    }

    public List<Course> getAllCoursesForWhichEnrolled(String username) {

        List<Course> all = new ArrayList<>(getCoursesForFirstGroup(username));
        List<Course> cgroup2 = getCoursesForSecondGroup(username);
        if(cgroup2 != null)
            all.addAll(cgroup2);
        List<OptionalCourseEnrollment> listOp = optionalCourseEnrollmentRepo.getAllByUsername(username);
        if(listOp.size() > 0){
            OptionalCourseEnrollment op = listOp.get(0);
            Integer cid = op.getCid();
            Course opc = courseRepo.findById(cid).get();
            all.add(opc);
        }
        return all;
    }

    public List<CourseGradeData> getGrades(String username, FacultyAndYearData data) {

        Student s = studentRepository.getById(username);
        List<Grade> grades = gradeRepo.getAllGradesByUsername(username);
        List<CourseGradeData> dataList = new ArrayList<>();
        for(Grade g: grades)
        {
            int cid = g.getCid();
            Course course = courseRepo.getById(cid);
            dataList.add(new CourseGradeData(course.getName(), g.getGradevalue()));
        }

        return dataList;

    }

    public List<Course> getAllOptionals() {
        return this.courseRepo.getOptionals();
    }


    public Integer checkIfAssignEnabled() {

        Integer response = 0;
        for(OptionalCourseEnrollment s: this.optionalCourseEnrollmentRepo.findAll())
        {
            List<OptionalCourseEnrollment> oces = this.optionalCourseEnrollmentRepo.getAllByUsername(s.getUsername());
            if(oces.size() != 1)
                response = 1;
        }
        return response;
    }

}
