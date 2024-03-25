package com.example.AcademicWebApp.Services;

import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.CourseStatistics;
import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.Message;
import com.example.AcademicWebApp.Controllers.RestAPIs.Entities.TeacherStatistics;
import com.example.AcademicWebApp.Models.*;
import com.example.AcademicWebApp.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.*;

@Service("chiefService")
public class ChiefService {

    @Autowired
    TeacherRepo teacherRepo;

    @Autowired
    CourseRepo coursesRepo;

    @Autowired
    OptionalCourseRepo optionalCourseRepo;

    @Autowired
    GradeRepo gradeRepo;

    @Autowired
    UserDataRepo userDataRepo;

    @Autowired
    OptionalCourseEnrollmentRepo optionalCourseEnrollmentRepo;

    @Autowired
    StudentEnrollmentRepo studentEnrollmentRepo;

    @Autowired
    FacultyRepo facultiesRepo;

    public List<Course> getAllOptionalsForApproval(String username){
        // getting the faculty id that the teacher is as a chief

        List<Faculty> f = facultiesRepo.getFacultyForChief(username);
        if (f.size() >= 1) {
            return optionalCourseRepo.getAllOptionalsForApproval(f.get(0).getFid());
        }
        else{
            return new ArrayList<Course>();
        }

    }

    public Message approveOptionals(String username, List<Course> approvedOptionals){

        // getting all the optionals that were for approval
        // then i go trough each optional, those that are in approvedOptionals will get updated
        // the rest will get deleted
        List<Course> allOptionalsThatWereForApproval = this.getAllOptionalsForApproval(username);

        for(Course optional : allOptionalsThatWereForApproval){

            boolean approved = false;
            Course optionalNewValuesApproved = new Course();
            for(Course ao : approvedOptionals){
                if(ao.getCid() == optional.getCid()){
                    approved = true;
                    optionalNewValuesApproved = ao;
                    break;
                }
            }

            if(approved){
                // gets updated
                coursesRepo.save(optionalNewValuesApproved);
            }
            else{
                //gets deleted
                gradeRepo.deleteGradesByCid(optional.getCid());
                optionalCourseEnrollmentRepo.deleteOptionalCourseEnrollmentsByCid(optional.getCid());
                optionalCourseRepo.delete(new OptionalCourse(optional.getCid(), username));
                coursesRepo.delete(optional);
            }
        }

        return new Message("Optionals were approved successfully.");
    }

    public List<TeacherStatistics> getTeacherStatistics(String username){

        // getting the fid of the faculty where the teacher is chief
        int fidOfChief;
        List<Faculty> f = facultiesRepo.getFacultyForChief(username);
        if (f.size() >= 1) {
            fidOfChief = f.get(0).getFid();
        }
        else{
            return new ArrayList<>();
        }

        // now we get all the teachers for that department
        // can contain doubles
        List<Teacher> teacherListWithDoubles = teacherRepo.getAllTeachersForFid(fidOfChief);

        // eliminating duplicate teachers
        Set<Teacher> s = new LinkedHashSet<>(teacherListWithDoubles);
        List<Teacher> teacherList = new ArrayList<>(s);

        List<TeacherStatistics> teacherStatisticsList = new ArrayList<>();
        for(Teacher teacher : teacherList){
            List<CourseStatistics> courseStatisticsList = new ArrayList<>();
            // Getting all the courses for that teacher
            List<Course> courseList = teacherRepo.getAllCoursesForTeacherForFid(teacher.getUsername(), fidOfChief);

            // going trough each course and making statistics for it
            for(Course course : courseList){
                CourseStatistics courseStatistics = new CourseStatistics();
                int passedStudents = 0;
                int[] marks = new int[]{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

                // getting all the students enrolled to that course
                List<StudentEnrollment> studentEnrollments = this.getAllStudentEnrollmentsEnrolledToCid(course.getCid());

                for(StudentEnrollment se : studentEnrollments){
                    Grade g = new Grade();
                    if (gradeRepo.existsById(new GradeId(se.getUsername(), course.getCid()))) {
                        g = gradeRepo.getById(new GradeId(se.getUsername(), course.getCid()));
                    } else {
                        g = new Grade(0, se.getUsername(), course.getCid());
                    }
                    marks[g.getGradevalue()]++;
                    if(g.getGradevalue() >= 5){
                        passedStudents++;
                    }
                }


                // setting the statistics
                courseStatistics.setCid(course.getCid());
                courseStatistics.setCourseName(course.getName());
                courseStatistics.setMarks(marks);
                courseStatistics.setTotalNumberOfStudents(studentEnrollments.size());
                courseStatistics.setPassedStudents(passedStudents);
                courseStatistics.setFailedStudents(studentEnrollments.size() - passedStudents);

                courseStatisticsList.add(courseStatistics);

            }

            teacherStatisticsList.add(new TeacherStatistics(teacher.getUsername(), this.getFullName(teacher.getUsername()), courseStatisticsList));


        }

        return teacherStatisticsList;
    }

    public Message assignStudentsToOptionals(){
        List<OptionalCourseEnrollment> optionalCourseEnrollments = optionalCourseEnrollmentRepo.findAll();
        List<Course> availableCourses = new ArrayList<>();
        Map<Course, Integer> coursePotential = new HashMap<>();
        Map<Course, Integer> courseNumbers = new HashMap<>();

        List<Course> courseList = coursesRepo.findAll();


        // getting all the optional courses and setting to 0 their potential followers
        for(Course course : courseList){
            if(course.getPriority() == 2){
                coursePotential.put(course, 0);
            }
        }

        // finding out for each course how many potential followers it has
        for(OptionalCourseEnrollment oce : optionalCourseEnrollments){
            for(Course course : coursePotential.keySet()){
                if(oce.getCid() == course.getCid()){
                    coursePotential.put(course, coursePotential.get(course) + 1);
                    break;
                }
            }
        }

        // selecting the optional courses that have at least 20 potential followers
        for(Course course : coursePotential.keySet()){
            if(coursePotential.get(course) >= 20){
                availableCourses.add(course);
            }
        }

        // setting the current enrolled student number for each optional course to 0
        for(Course course : availableCourses){
            if(course.getPriority() == 2){
                courseNumbers.put(course, 0);
            }
        }

        // getting all the students that are trying to enroll
        Set<String> usernamesForEnrollment = new HashSet<>();

        for(OptionalCourseEnrollment oce : optionalCourseEnrollments){
            usernamesForEnrollment.add(oce.getUsername());
        }

        // going trough the students that want to enroll, getting their optionals, trying to fit them in an available one
        // if not, choose a random available one
        List<OptionalCourseEnrollment> oceFinalList = new ArrayList<>();

        for(String username : usernamesForEnrollment){
            List<OptionalCourseEnrollment> oceList = optionalCourseEnrollmentRepo.getAllByUsername(username);
            // trying to fit him in one of his choices
            boolean ableToFitInChoices = false;
            for(OptionalCourseEnrollment oce : oceList){
                boolean available = false;

                for(Course c : availableCourses){
                    if(c.getCid() == oce.getCid()){
                        available = true;
                        break;
                    }
                }

                if(available == false){
                    continue;
                }

                for(Course c : courseNumbers.keySet()){
                    if(c.getCid() == oce.getCid()){
                        if(c.getMaxstudents() > courseNumbers.get(c)){
                            courseNumbers.put(c, courseNumbers.get(c) + 1);

                            oceFinalList.add(new OptionalCourseEnrollment(username, c.getCid(), 0));
                            ableToFitInChoices = true;
                        }
                        break;
                    }
                }

                if(ableToFitInChoices){
                    break;
                }
            }

            if(ableToFitInChoices == false){
                // i have to put him in a random available optional course
                Random rand = new Random();
                boolean done = false;

                while(!done){
                    Course c = availableCourses.get(rand.nextInt(availableCourses.size()));
                    if(c.getMaxstudents() > courseNumbers.get(c)){
                        courseNumbers.put(c, courseNumbers.get(c) + 1);

                        oceFinalList.add(new OptionalCourseEnrollment(username, c.getCid(), 0));
                        done = true;
                    }
                }
            }
        }

        // saving the optional course enrollment list
        optionalCourseEnrollmentRepo.deleteAll();

        for(OptionalCourseEnrollment oce : oceFinalList){
            optionalCourseEnrollmentRepo.save(oce);
        }

        return new Message("All students were assigned to optional courses successfully.");
    }

    private String getFullName(String username){

        UserData userData = userDataRepo.getById(username);

        return userData.getName() + " " + userData.getSurname();
    }

    private List<StudentEnrollment> getAllStudentEnrollmentsEnrolledToCid(int cid){
        Course course = coursesRepo.getById(cid);
        return studentEnrollmentRepo.getAllStudentEnrollmentsForFidAndYear(course.getFid(), course.getYear());
    }

}
