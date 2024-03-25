import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApisService } from 'src/app/apis/apis.service';
import { LOGO_WIDTH, PAGE_PADDING, CONTENT_PADDING } from 'src/app/constants/sizes';
import { TableComponent } from '../../table/table.component';
import { BLUE_TEXT } from 'src/app/constants/colors';
import { Course } from 'src/app/entities/course';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxMaxstudentsComponent } from '../../dialog-box-maxstudents/dialog-box-maxstudents.component';
import { DropdownComponent } from '../../dropdown/dropdown.component';
@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.css']
})
export class AddGradeComponent implements OnInit {
  logoWidth = LOGO_WIDTH
  pagePadding = PAGE_PADDING
  contentPadding = CONTENT_PADDING
  options: Course[] = [];
  nameOfPropertyToShow: string = "name";
 
  @ViewChild('table') table!: TableComponent;
  @ViewChild('coursesDd') coursesDropdown!: DropdownComponent; // reference to dropdown

  tableHeaders = ["Username", "Name", "Group",'Grade'];
  tableData: any[] = [];
  chiefFaculty : string = "";
  blueText = BLUE_TEXT;


  approveOptionalsButton() {
    /**
     * @TO_DO
     */

  }

  constructor(private apiService: ApisService, private cookieService: CookieService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.getCoursesOfTeacher().subscribe((courses) =>{
      this.options = courses;
    })
  }

  onOptionChanged(){
    this.table.changeRowsData([])
    let obj : Course = this.coursesDropdown.getSelectedObject()[0];
    this.apiService.getStudentGradesForCourse(obj).subscribe((studentGrades)=>{

      //this.tableData = studentGrades;
      for(let studentGrade of studentGrades){
        let o = {"Username": studentGrade.username, "Name": studentGrade.name, "Group": studentGrade.group, "Grade": studentGrade.gradeValue, "studentGrade": studentGrade};

        this.table.addRowData(o)
      }
    })
  }

}
