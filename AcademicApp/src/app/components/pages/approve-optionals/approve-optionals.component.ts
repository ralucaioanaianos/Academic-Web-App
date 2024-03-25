import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApisService } from 'src/app/apis/apis.service';
import { LOGO_WIDTH, PAGE_PADDING, CONTENT_PADDING } from 'src/app/constants/sizes';
import { TableComponent } from '../../table/table.component';
import { BLUE_TEXT } from 'src/app/constants/colors';
import { Course } from 'src/app/entities/course';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxMaxstudentsComponent } from '../../dialog-box-maxstudents/dialog-box-maxstudents.component';
@Component({
  selector: 'app-approve-optionals',
  templateUrl: './approve-optionals.component.html',
  styleUrls: ['./approve-optionals.component.css']
})

export class ApproveOptionalsComponent implements OnInit {
  logoWidth = LOGO_WIDTH
  pagePadding = PAGE_PADDING
  contentPadding = CONTENT_PADDING
 
  @ViewChild('table') table!: TableComponent;

  tableHeaders = ["Year - semester", "Teacher", 'Optional name', "Credits", 'Max students'];
  tableData: any[] = []; 
  chiefFaculty : string = "";
  blueText = BLUE_TEXT;
  coursesData = [
  ]

  approveOptionalsButton() {
    /**
     * @TO_DO
     */
    console.log(this.table.getSelectedRowsData());

    let rowObjs = this.table.getSelectedRowsData();
    let array : Course[] = [];
    for(let row_obj of rowObjs){
        row_obj.course["maxstudents"] = row_obj["Max students"]
        array.push(row_obj.course);
    }

    this.apiService.postApproveOptionals(array).subscribe((message) =>{
      alert(message.message)
    })

  }

  constructor(private apiService: ApisService, private cookieService: CookieService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.getAllOptionalsForApproval().subscribe((courses) =>{
      if(courses.length > 1){
        this.apiService.getFacultyByFid(courses[0].fid).subscribe((fac) =>{
          this.chiefFaculty = fac.name;
        })
      }

      for(let course of courses){
        this.apiService.getFullName(course.teacher).subscribe((fullName) =>{
          console.log("CURSUUU",course);
            let obj = {
              "Year - semester": course.year + " - " + course.semester,
              "Teacher": fullName.fullname,
              'Optional name': course.name,
              "Credits": course.credits,
              "Max students": course.maxstudents,
              "course": course
            }

            this.table.addRowData(obj);
          })
      }

    })
  }

  openDialogMaxStudents(action: string, obj:any) {
    obj.action = action;
   
    const dialogRef = this.dialog.open(DialogBoxMaxstudentsComponent, {
      width: '650px',
      data:obj,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setMaxStudents(result);
      console.log(obj)
    });
  }


  setMaxStudents(max: any){
    
  }
}
