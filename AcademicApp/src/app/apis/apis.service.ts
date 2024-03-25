import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FullName} from "../entities/fullName";
import {CookieService} from "ngx-cookie-service";
import {map, Observable} from "rxjs";
import {UserData} from "../entities/userData";
import {Message} from "../entities/message";
import {Faculty} from "../entities/faculty";
import {CourseGradeData} from "../entities/courseGradeData";
import {FacultyAndYearData} from "../entities/facultyAndYearData";
import {Course} from "../entities/course";
import {OptionalCourseEnrollment} from "../entities/optionalCourseEnrollment";
import {Student} from "../entities/student";
import {StudentGrade} from "../entities/studentGrade";
import {TeacherStatistics} from "../entities/teacherStatistics";
import {StaffFilter} from "../entities/staffFilter";
import {StudentAverage} from "../entities/studentAverage";
import {FacultyYear} from "../entities/facultyYear";
import {FoundingData} from "../entities/foundingData";
import {StudentGradeStaff} from "../entities/studentGradeStaff";
import { StudentData } from '../entities/studentData';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http : HttpClient, private cookieService: CookieService) { }

  //user data apis
  getFullName(name: string): Observable<FullName>{
    return this.http.get<FullName>("http://localhost:8080/userdata/" + this.cookieService.get("username") + "/" +
      name);
  }

  getUserData(): Observable<UserData>{
    return this.http.get<UserData>("http://localhost:8080/userdata/" + this.cookieService.get("username"));
  }


  postUserData(userData: UserData) {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(userData);
    console.log(body);
    return this.http.post<Message>("http://localhost:8080/userdata/" + this.cookieService.get("username"), body,{'headers':headers})
      .pipe(
        map((message: Message) => {
          return message;
        })
      )
  }


  //student apis
  //enroll page
  getAllFaculties(): Observable<Faculty[]>{
    return this.http.get<Faculty[]>("http://localhost:8080/student/getFaculties");
  }


  postEnrollStudent(studentData: StudentData): Observable<Student>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(studentData);
    console.log(body);
    return this.http.post<Student>("http://localhost:8080/student/add", body,{'headers':headers})
      .pipe(
        map((student: Student) => {
          return student;
        })
      )
  }

  //view grades page
  getGrades(facultyAndYearData: FacultyAndYearData): Observable<CourseGradeData[]>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(facultyAndYearData);
    return this.http.post<CourseGradeData[]>("http://localhost:8080/student/getGrades/" + this.cookieService.get("username"), body,{'headers':headers})
      .pipe(
        map((courseGradeData:CourseGradeData[]) => {
          return courseGradeData;
        })
      )
  }

  //for each enrolled student, get the faculties and years
  getFacultiesAndYearsForStudent(): Observable<FacultyAndYearData[]>{
    return this.http.get<FacultyAndYearData[]>("http://localhost:8080/student/getFacultiesAndYears/" + this.cookieService.get("username"));
  }

  //we'll find out later
  getAllCoursesForWhichEnrolled(): Observable<Course[]>{
    return this.http.get<Course[]>("http://localhost:8080/student/getAllCoursesForWhichEnrolled/" + this.cookieService.get("username"));
  }

  postOptionalsPreferences(courses: Course[]): Observable<OptionalCourseEnrollment[]>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(courses);
    return this.http.post<OptionalCourseEnrollment[]>("http://localhost:8080/student/sendOptionalsPreferences/" + this.cookieService.get("username"), body,{'headers':headers})
      .pipe(
        map((optionalCourseEnrollments:OptionalCourseEnrollment[]) => {
          return optionalCourseEnrollments;
        })
      )
  }

  getOptionalsByFacultyAndYear(): Observable<Course[]>{
    return this.http.get<Course[]>("http://localhost:8080/student/getOptionalsByFacultyAndYear/" + this.cookieService.get("username"));
  }


  getCoursesForStudentSecondGroup(): Observable<Course[]>{
    return this.http.get<Course[]>("http://localhost:8080/student/getCoursesSecondGroup/" + this.cookieService.get("username"));
  }

  getCoursesForStudentFirstGroup(): Observable<Course[]>{
    return this.http.get<Course[]>("http://localhost:8080/student/getCoursesFirstGroup/" + this.cookieService.get("username"));
  }

  getStudentByUsername(): Observable<Student>{
    return this.http.get<Student>("http://localhost:8080/student/" + this.cookieService.get("username"));
  }


  //teacher apis
  getOptionalCoursesOfTeacher(): Observable<Course[]>{
    return this.http.get<Course[]>("http://localhost:8080/teacher/getOptionalsForTeacher/" + this.cookieService.get("username"));
  }

  getFacultyByFid(fid : number): Observable<Faculty>{
    return this.http.get<Faculty>("http://localhost:8080/teacher/getFaculty/" + this.cookieService.get("username") + "/" + fid);
  }

  //gets courses that belong to teacher
  getCoursesOfTeacher(): Observable<Course[]>{
    return this.http.get<Course[]>("http://localhost:8080/teacher/getAllCourses/" + this.cookieService.get("username"));
  }

  //gets student grades for course that belongs to teacher
  getStudentGradesForCourse(course: Course): Observable<StudentGrade[]>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(course);
    return this.http.post<StudentGrade[]>("http://localhost:8080/teacher/getStudentsGradesForCourse/" + this.cookieService.get("username"), body,{'headers':headers})
      .pipe(
        map((stud: StudentGrade[]) => {
          return stud;
        })
      )
  }

  // deletes the optional course with that cid
  deleteOptionalCourseByCid(cid:number): Observable<Message>{
    return this.http.get<Message>("http://localhost:8080/teacher/deleteOptionalCourse/" + this.cookieService.get("username") + "/" + cid);
  }

  postProposeOptional(course: Course){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(course);
    console.log(body);
    return this.http.post<Message>("http://localhost:8080/teacher/proposeOptional/" + this.cookieService.get("username"), body,{'headers':headers})
      .pipe(
        map((message: Message) => {
          return message;
        })
      )
  }

  postStudentsGrades(studentGrades: StudentGrade[]){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(studentGrades);
    console.log(body);
    return this.http.post<Message>("http://localhost:8080/teacher/addStudentsGrades/" + this.cookieService.get("username"), body,{'headers':headers})
      .pipe(
        map((message: Message) => {
          return message;
        })
      )
  }

  //chief apis
  getAllOptionalsForApproval(): Observable<Course[]>{
    return this.http.get<Course[]>("http://localhost:8080/chief/getAllOptionalsForApproval/" + this.cookieService.get("username"));
  }

  getTeacherStatistics(): Observable<TeacherStatistics[]>{
    return this.http.get<TeacherStatistics[]>("http://localhost:8080/chief/getTeacherStatistics/" + this.cookieService.get("username"));
  }

  postApproveOptionals(approvedOptionals: Course[]){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(approvedOptionals);
    return this.http.post<Message>("http://localhost:8080/chief/approveOptionals/" + this.cookieService.get("username"), body,{'headers':headers})
      .pipe(
        map((message: Message) => {
          return message;
        })
      )
  }

  //se fol doar o data, nu ar trb folosita de mai multe ori bc se strica baza de date :(
  postAssignStudentToOptionals(){
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify('');
    return this.http.post<Message>("http://localhost:8080/assignStudentsToOptionals/" + this.cookieService.get("username"), body,{'headers':headers})
      .pipe(
        map((message: Message) => {
          return message;
        })
      )
  }

  //staff apis
  getStudentsFromFacultyYearGroup(staffFilter: StaffFilter): Observable<StudentAverage[]>{
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(staffFilter);
    return this.http.post<StudentAverage[]>("http://localhost:8080/staff/faculty/students/" + this.cookieService.get("username"), body,{'headers':headers})
      .pipe(
        map((studentAverage: StudentAverage[]) => {
          return studentAverage;
        })
      )
  }

  getGroupsFromFaculties(facultyYear: FacultyYear): Observable<number[]>{
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(facultyYear);
    return this.http.post<number[]>("http://localhost:8080/staff/faculty/getGroups/" + this.cookieService.get("username"), body,{'headers':headers})
      .pipe(
        map((nrList: number[]) => {
          return nrList;
        })
      )
  }

  postSetScholarships(foundingData: FoundingData): Observable<number>{
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(foundingData);
    return this.http.post<number>("http://localhost:8080/staff/founding/set/" + this.cookieService.get("username"), body,{'headers':headers})
      .pipe(
        map((nr: number) => {
          return nr;
        })
      )
  }

  //get students with average grade
  getStudentGrades(): Observable<StudentGradeStaff[]>{
    return this.http.get<StudentGradeStaff[]>("http://localhost:8080/staff/founding/" + this.cookieService.get("username"));
  }

  getAllOptionals(): Observable<Course[]>{
    return this.http.get<Course[]>("http://localhost:8080/student/getAllOptionals");
  }

  checkIfAssignEnabled(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/checkIfAssignToOptionalsEnabled/" + this.cookieService.get("username"));
  }

  checkIfAssignEnabledForEveryone(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/checkIfAssignToOptionalsEnabled/cathygeorge");
  }









}
