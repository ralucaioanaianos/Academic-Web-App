import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LOGO_WIDTH, PAGE_PADDING, CONTENT_PADDING } from 'src/app/constants/sizes';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { FullName } from 'src/app/entities/fullName';
import { FacultyAndYearData } from 'src/app/entities/facultyAndYearData';
import { ApisService } from 'src/app/apis/apis.service';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { Course } from 'src/app/entities/course';
import { CourseGradeData } from 'src/app/entities/courseGradeData';
import { DragAndDropComponent } from '../../drag-and-drop/drag-and-drop.component';


@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.css']
})
export class DocumentsPageComponent implements OnInit {
  logoWidth = LOGO_WIDTH
  pagePadding = PAGE_PADDING
  contentPadding = CONTENT_PADDING
  coursesList : Course[] = [];
  @ViewChild('facultyDd') facultyDropdown!: DropdownComponent; // reference to dropdown
  @ViewChild('fileTable') fileTable!: DragAndDropComponent; // reference to dropdown

  facultiesOptions: any = [];
  options: FacultyAndYearData[] = [];
  name: string = '';
  faculty: string = '';
  yearOfStudy: string = '';
  courses = [

  ]

idFPropery: string = "name";
nameOfFPropertyToShow: string = "name";

headers=['cid', 'name', 'semester', 'priority', 'credits'];
exportAsPDF(divId: any) {
  // the content of the pdf
  const data = document.createElement('myContractDiv');
  // add data to html
  document.body.appendChild(data);
  
  let dataHtml = `
    <style>
    table, th, td {
    border:1px solid black;
    }
    </style>

    <h1>STUDIES KONTRACT</h1>
    <br>
    <p>Name of student: ${this.name}</p>
    <p>Faculty: ${this.faculty}</p>
    <p>Year of study: ${this.yearOfStudy}</p>
    <!--<app-table #table [headers]=headers [objectsFromDb]="coursesList" [hasCheckbox]="false" [hasAction]="false"></app-table>-->
    <!--<table>
      <tr>
        <th>cid</th>
        <th>name</th>
        <th>semester</th>
        <th>priority</th>
        <th>credits</th>
      </tr>
      
    </table>-->
    <table>
      <tr>
        <th>cid</th>
        <th>name</th>
        <th>semester</th>
        <th>priority</th>
        <th>credits</th>
      </tr>`

      for (let i = 0; i < this.coursesList.length; i++) {
        console.log(this.coursesList[i]);
        
        dataHtml += `
          <tr>
            <td>${this.coursesList[i].cid}</td>
            <td>${this.coursesList[i].name}</td>
            <td>${this.coursesList[i].semester}</td>
            <td>${this.coursesList[i].priority}</td>
            <td>${this.coursesList[i].credits}</td>
          </tr>
        `
      }
      dataHtml += `
      </table>

    <br><br><br><br>
    <p>Student signature:<br>_______________</p>
      `
    data.innerHTML = dataHtml;
    console.log(dataHtml);  
    this.coursesList = [];

    html2canvas(data).then(canvas => {
    const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
    let pdf = new jspdf.jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
    
    let pageHeight = 29.75;
    let imgHeight = 8 + (this.courses.length * 2.5);
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(contentDataURL, 'jpg', 2, position, 30, imgHeight);  
    heightLeft -= pageHeight;
    while(heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(contentDataURL, 'jpg', 2, position, 30, imgHeight);  
      heightLeft -= pageHeight;
    }
    // remove the html
    const e = document.querySelector("myContractDiv");
    if (e) {
      const pe = e.parentElement;
      if (pe) {
        pe.removeChild(e);
      } 
    }  
    pdf.save('Filename.pdf');
    });    
  }

  constructor(private cookieService: CookieService, private http: HttpClient, private apisService: ApisService) { }

  ngOnInit(): void {
    this.getFullName();
    this.apisService.getFacultiesAndYearsForStudent().subscribe((result) => {
      let array : any = [];
      // creating the array for the dropdown element
      result.forEach((value, index) =>{
        let obj = {"id":index, "name": value.name + " - Year " + value.year, "actualName": value.name, "actualYear": value.year};
        array.push(obj);
      })
      // setting the options for the dropdown
      this.options = array;
      // putting the data into the table for the first faculty that the guy/girl/non binary/etc is in
      if(result.length > 0){ // checking if the guy is enrolled at least in a faculty in the first place
          this.facultyDropdown.setOptions(this.options); // updating the options for the dropdown list
        
      }

    });

  }

  getFullName(){
    this.http.get<FullName>("http://localhost:8080/userdata/" + this.cookieService.get("username") + "/" +
      this.cookieService.get("username"))
      .subscribe((response:FullName) => {
        console.log(response.fullname);
        this.name = response.fullname;
      });
  }


  onOptionChanged() {
    /**
     * @TO_DO - when the dropdown selected option is changed, send request to backend to update the table.
     */
    //console.log(this.facultyDropdown.getSelectedObject()); // to get whole object
    //console.log((this.facultyDropdown.getSelectedValue())); // to get the id(index in list) of object

    // here we should send from dropdown and get the rows (replace this.tableDataAfter with your variables) 
    // selecting the full object from the drop down list
    let obj = this.facultyDropdown.getSelectedObject()[0];
    // creating the data to send for the api 
    let model : FacultyAndYearData = new FacultyAndYearData(obj["actualName"], obj["actualYear"]);
    
    this.faculty = model.name;
    this.yearOfStudy =`${model.year}`;

    // getting the faculties for student
    let facultiesAttended: FacultyAndYearData[] = [];

    this.apisService.getFacultiesAndYearsForStudent().subscribe((fac :FacultyAndYearData[]) =>{
      facultiesAttended = fac;

      // finding out which group (first or second) from student is the faculty for
    let indexOfGroup : number = 0;
    let index : number = 0;

    for(var value of facultiesAttended){
      index = index + 1;
      if(value.name == model.name){
        indexOfGroup = index;
      }

    }

    //getting the obligatory & facultative courses that the faculty and year selected has
    let coursesMust : Course[] = []
    
    if(indexOfGroup == 1){
      this.apisService.getCoursesForStudentFirstGroup().subscribe((result)=>{
        coursesMust = result;
        this.onOptionChangedNext(coursesMust);
      })
    }
    else{
      if(indexOfGroup == 2){
        this.apisService.getCoursesForStudentSecondGroup().subscribe((result)=>{
          coursesMust = result;
          this.onOptionChangedNext(coursesMust);
        })
      }
    }
    });


  }

  onOptionChangedNext(coursesMust : Course[]){


    let obj = this.facultyDropdown.getSelectedObject()[0];
    // creating the data to send for the api 
    let model : FacultyAndYearData = new FacultyAndYearData(obj["actualName"], obj["actualYear"]);

    // getting all the courses(bot faculties if he is enrolled in 2) with the optional
    let allCoursesWithOptionalForStudent : Course[] = [];

    console.log("ok1");

    this.apisService.getAllCoursesForWhichEnrolled().subscribe((result: Course[]) =>{
      allCoursesWithOptionalForStudent = result;
      // creating a CourseGradeData for the tabel where i select only the courses i need

      for(var course of allCoursesWithOptionalForStudent){
        
        let exists : boolean = false;

        for(var courseMust of coursesMust){
          if(course.cid == courseMust.cid){
            exists = true;
          }
        }

        if(exists){
            this.coursesList.push(new Course(course.cid, course.name, course.fid, course.year, course.teacher, course.semester, course.maxstudents, course.priority, course.credits))
        }
      }
      console.log("ok");
      console.log(this.coursesList);
      // getting the courses and grades that the student is enrolled in
      /*this.apisService.getGrades(model).subscribe((result) =>{

        for(var gradedCourse of result){
          for(var soonToBeGradedCourseMaybe of coursesAndGradesList){
            if(gradedCourse.course == soonToBeGradedCourseMaybe.course){
              soonToBeGradedCourseMaybe.grade = gradedCourse.grade
            }
          }
        }
        //this.table.changeRowsData(coursesAndGradesList)
      });*/
      // this.table.changeRowsData(this.apisService.getGrades()); // this is how you change it.
    })
  }

  onUpdateClicked(){
    this.fileTable.deleteAllFiles();
    alert("Uploaded successfully!");
  }
}
