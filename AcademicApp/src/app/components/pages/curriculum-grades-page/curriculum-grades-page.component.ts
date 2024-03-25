import { Component, OnInit, ViewChild } from '@angular/core';
import { LOGO_WIDTH, PAGE_PADDING, CONTENT_PADDING } from 'src/app/constants/sizes';
import { TABLE_TEST_CURRICULUM_DATA, TABLE_TEST_CURRICULUM_DATA_AFTER } from 'src/app/testing-dashboard/testingData';
import { BLUE_TEXT } from 'src/app/constants/colors';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { TableComponent, } from '../../table/table.component';
import { ApisService } from 'src/app/apis/apis.service';
import { FacultyAndYearData } from 'src/app/entities/facultyAndYearData';
import { Course } from 'src/app/entities/course';
import { Faculty } from 'src/app/entities/faculty';
import { CourseGradeData } from 'src/app/entities/courseGradeData';

@Component({
  selector: 'app-curriculum-grades-page',
  templateUrl: './curriculum-grades-page.component.html',
  styleUrls: ['./curriculum-grades-page.component.css']
})
export class CurriculumGradesPageComponent implements OnInit {
  logoWidth = LOGO_WIDTH
  pagePadding = PAGE_PADDING
  contentPadding = CONTENT_PADDING
  blueText = BLUE_TEXT
  options: FacultyAndYearData[] = [];
  nameOfPropertyToShow: string = "name";

  @ViewChild('facultyDd') facultyDropdown!: DropdownComponent; // reference to dropdown
  @ViewChild('table') table!: TableComponent; // reference to dropdown

  headers = ['course', 'grade'];
  tableData = [];
  tableDataAfter = [];

  constructor(private apisService: ApisService) {

  }

  ngOnInit(): void {
    facultyAndYear: Array<FacultyAndYearData>();

    // getting the faculties and years that the student is enrolled in
    this.apisService.getFacultiesAndYearsForStudent().subscribe((result) => {
      let array : any = [];
      // creating the array for the dropdown element
      result.forEach((value, index) =>{
        let obj = {"id":index, "name": value.name + " - Year " + value.year, "actualName": value.name, "actualYear": value.year};
        array.push(obj);
      })
      // setting the options for the dropdown
      this.options = array;
    });
  }


  onOptionChanged() {
    // selecting the full object from the drop down list
    let obj = this.facultyDropdown.getSelectedObject()[0];
    // creating the data to send for the api 
    let model : FacultyAndYearData = new FacultyAndYearData(obj["actualName"], obj["actualYear"]);

    // getting the faculties for student
    let facultiesAttended: FacultyAndYearData[] = [];

    this.apisService.getFacultiesAndYearsForStudent().subscribe((fac :FacultyAndYearData[]) =>{
      facultiesAttended = fac;

      // finding out which group (first or second) from student is the faculty for
    let indexOfGroup : number = 0;
    let index : number = 0;

    for(var value of facultiesAttended){
      index = index + 1;
      if(value.name == model.name && value.year == model.year){
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

    this.apisService.getAllCoursesForWhichEnrolled().subscribe((result: Course[]) =>{
      allCoursesWithOptionalForStudent = result;
      // creating a CourseGradeData for the tabel where i select only the courses i need
      let coursesAndGradesList : CourseGradeData[] = [];

      for(var course of allCoursesWithOptionalForStudent){
        
        let exists : boolean = false;

        for(var courseMust of coursesMust){
          if(course.cid == courseMust.cid){
            exists = true;
          }
          else{
            if(course.priority == 2){
              exists = true;
            }
          }
        }

        if(exists){
            coursesAndGradesList.push(new CourseGradeData(course.name, -1))
        }
      }
      // getting the courses and grades that the student is enrolled in
      this.apisService.getGrades(model).subscribe((result) =>{

        for(var gradedCourse of result){
          for(var soonToBeGradedCourseMaybe of coursesAndGradesList){
            if(gradedCourse.course == soonToBeGradedCourseMaybe.course){
              soonToBeGradedCourseMaybe.grade = gradedCourse.grade
            }
          }
        }
        this.table.changeRowsData(coursesAndGradesList)
      });
      // this.table.changeRowsData(this.apisService.getGrades()); // this is how you change it.
    })
  }

}
