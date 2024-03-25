import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LOGO_WIDTH, PAGE_PADDING, CONTENT_PADDING } from 'src/app/constants/sizes';
import { TABLE_TEST_DATA } from 'src/app/testing-dashboard/testingData';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { TableComponent } from '../../table/table.component';
import { BLUE, BLUE_TEXT } from 'src/app/constants/colors';
import { ButtonComponent } from '../../basic-components/button/button.component';
import { ApisService } from 'src/app/apis/apis.service';
import { Course } from 'src/app/entities/course';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-optionals',
  templateUrl: './add-optionals.component.html',
  styleUrls: ['./add-optionals.component.css']
})
export class AddOptionalsComponent implements OnInit {
  logoWidth = LOGO_WIDTH
  pagePadding = PAGE_PADDING
  contentPadding = CONTENT_PADDING
  blueText = BLUE_TEXT

  // din curs intreg eu le afisez numa pe alea de jos.
  // eu primesc un curs intreg dar folosesc numai: numele cursului, facultatea, semestrul, anul, nr de credite
  headers = ['name', 'facultyName', 'semester', 'year', 'credits'];
  tableData : any[] = [];

  constructor(public dialog: MatDialog, private apiService: ApisService, private cookieService: CookieService) {}

  @ViewChild('addOptionalBtn') addBtn!: ButtonComponent;
  @ViewChild(TableComponent,{static:true}) table!: TableComponent; // reference to table


  ngOnInit(): void {
   // this.tableData = this.getOptionals();
   this.getOptionals();
  }

  sendOptionals(){
    /** @TO_DO : send to backendnumele facultatii, numele cursuluianul in care se face, teacherul, semestrul, priority e mereu 2, nr credits */
    
    let data = this.table.getAllRowsData();
    if(data.length == 0){
      alert("You did not create any optionals");
    }
    let opCourse : Course;
    for(let optional of data){
      if(!optional.hasOwnProperty("course")){
          opCourse = new Course(-1, optional.name, optional.fid, optional.year, optional.teacher, optional.semester, optional.max_students, optional.priority, optional.credits);
      } 
      else{
        opCourse = new Course(optional.course["cid"], optional.name, optional.fid, optional.year, optional.course["teacher"], optional.semester, optional.max_students, optional.priority, optional.credits)
      }

      this.apiService.postProposeOptional(opCourse).subscribe((message)=>{
        console.log(message.message)
      });
    }
  }

  getOptionals() {
    /** @TO_DO : send to backendnumele facultatii, numele cursuluianul in care se face, teacherul, semestrul, priority e mereu 2, nr credits */

    this.apiService.getOptionalCoursesOfTeacher().subscribe((courses) =>{
      let array : any[] = [];
      console.log("COURSEEEEEES", courses)
      for(let course of courses){
        this.apiService.getFacultyByFid(course.fid).subscribe((faculty) => {
          let obj = {"cid":course.cid, "name": course.name, "facultyName": faculty.name, "semester": course.semester, "year": course.year, "credits": course.credits, "course": course, "priority": 2, "max_students":20, "teacher": course.teacher, "fid":course.fid}
          //this.tableData.push(obj)
          this.table.addRowData(obj)
        })
      }
    })
    return []
  }

  openDialog(action: string, obj:any) {
    obj.action = action;
    if(action == 'Add') {
      let nrOptionals = this.table.getAllRowsData().length;
      if(nrOptionals == 2) {
        alert("You can add at most 2 optionals...edit or delete existing ones");
        return;
      }
    }

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '650px',
      data:obj,
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result.event == 'Add'){
          this.addRowData(result.data);
      }
    });
  }


  /** if you press on add button */
  addRowData(row_obj:any){
    if(this.validateNewOptional(row_obj)) {
      this.apiService.getFacultyByFid(row_obj.fid).subscribe((faculty)=>{
        delete row_obj["action"];
        row_obj["facultyName"] = faculty.name
        row_obj["cid"] = -1;//this.table.getAllRowsData().length + 1; // in case you also need id = here for experimental purposes
        row_obj["max_students"] = 20; // default value for max students
        row_obj["priority"] = 2; 
        row_obj["teacher"] = this.cookieService.get("username"); // here you need to get full name.. 
        row_obj = {...row_obj};
  
        this.table.addRowData(row_obj);
      })
    }
  }

  validateNewOptional(optional:any): boolean{
    if(!optional.hasOwnProperty("name")){
      alert("Error! Please input a name...");
      return false;
    } 
    if(!optional.hasOwnProperty("fid")){
      alert("Error! Please input a faculty...");
      return false;
    } 
    if (!optional.hasOwnProperty("year")){
      alert("Error! Please input a year...");
      return false;
    }
    if (!optional.hasOwnProperty("semester")){
      alert("Error! Please input a semester...");
      return false;
    }
    if (!optional.hasOwnProperty("credits")){
      alert("Error! Please input nr credits...")
      return false;
    }

    return true;
  }
}
