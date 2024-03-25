import { Component, OnInit, ViewChild } from '@angular/core';
import { ApisService } from 'src/app/apis/apis.service';
import { LOGO_WIDTH, PAGE_PADDING, CONTENT_PADDING } from 'src/app/constants/sizes';
import { FacultyAndYearData } from 'src/app/entities/facultyAndYearData';
import { TABLE_TEST_CURRICULUM_DATA } from 'src/app/testing-dashboard/testingData';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { TableComponent } from '../../table/table.component';
import { StudentData } from 'src/app/entities/studentData';
import { CookieService } from 'ngx-cookie-service';
import { Student } from 'src/app/entities/student';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})



export class EnrollComponent implements OnInit {
  logoWidth = LOGO_WIDTH
  pagePadding = PAGE_PADDING
  contentPadding = CONTENT_PADDING
  disableButtons : boolean = false;

  facultiesOptions: any = [];

  nameOfFPropertyToShow: string = "name";
  idFPropery: string = "name";

  yearsOptions: any = [];

  nameOfYPropertyToShow: string = "year";
  idYPropery: string = "year";

  @ViewChild('facultyTable') table!: TableComponent;
  @ViewChild('facultyDd ') facultyDd!: DropdownComponent;
  @ViewChild('yearDd ') yearDd!: DropdownComponent;

  enrollmentsHeader: any = ["name", "year"];
  tableData: FacultyAndYearData[] = [];

  constructor(private apiService: ApisService, private cookieService: CookieService) { }

  ngOnInit(): void {

    this.apiService.getStudentByUsername().subscribe((s) => {
      if(s.group1 != null){ //  this means he is already in a faculty
          this.apiService.getFacultiesAndYearsForStudent().subscribe((fac : FacultyAndYearData[]) =>{
            fac.forEach((value, index) =>{
              this.tableData.push(value);
              this.table.changeRowsData(this.tableData);
            })
          })
          this.disableButtons = true;
          this.alertUserThatHeIsDone();

      }
    })

    this.apiService.getAllFaculties().subscribe((result) => {
      let array : any = [];
      // creating the array for the faculty dropdown element
      result.forEach((value, index) =>{
        let obj = {"id":index, "name": value.name, "noOfYears": value.noyears};
        array.push(obj);
      })
      // setting the options for the dropdown faculty
      this.facultiesOptions = array;
    });
  }

  alertUserThatHeIsDone(){
    alert("You have already chosen your enrollments. If you want to change them, contact administration.")
  }

  onFacultyOptionChanged(){
    /**  
     * @TO_DO 
     * */
    let obj = this.facultyDd.getSelectedObject()[0];
    this.yearsOptions = [];
    let i = 0;
    for(i=1;i<=obj["noOfYears"];i++){
      let objYear = {"year": i};
      this.yearsOptions.push(objYear);
    }
  }

  onClickAddFacultyToTable(){
    /**  
     * @TO_DO 
     * */

    // cheking if there are already 2 faculties selected
    if(this.tableData.length == 2){
      alert("You can enroll to maximum 2 years.");
    }
    else{


      let objFac = this.facultyDd.getSelectedObject()[0];
      let objYear = this.yearDd.getSelectedObject()[0];
      
      // checking if the faculty selected isnt already in it
      let okayToInsert : number = 1;
      this.tableData.forEach((model) =>{
        if(model.name == objFac["name"] && model.year == objYear["year"]){
          okayToInsert = 0;
        }
      })
      
      if(okayToInsert == 0){
        alert("You already chose that faculty!");
      }
      else{
        if(objFac == undefined || objYear == undefined){
          alert("Please select a faculty and a year before adding it to the table of choices.");
        }
        else{
          let fac : FacultyAndYearData = new FacultyAndYearData(objFac["name"], objYear["year"])
          this.tableData.push(fac)
          this.table.changeRowsData(this.tableData);
        }
      }
  
    }

  }

  onClickClear(){
    this.tableData = [];
    this.table.changeRowsData([]);
  }

  onClickSend(){
    /**  
     * @TO_DO 
     * */
    let data = this.table.getAllRowsData();
    let studentData: StudentData = new StudentData(this.cookieService.get("username"), "", 0, "", 0);

    if(this.tableData.length == 0){
      alert("You haven't selected any faculties and years!");
    }
    else{
      if(this.tableData.length == 1){
        studentData = new StudentData(this.cookieService.get("username"), this.tableData[0].name, this.tableData[0].year, "", 0);
      }
      else{
        studentData = new StudentData(this.cookieService.get("username"), this.tableData[0].name, this.tableData[0].year, this.tableData[1].name, this.tableData[1].year);
      }
    }
    this.apiService.postEnrollStudent(studentData).subscribe();
    alert("Faculties sent for enrollment! If you want to change them, contact administration.")
    this.disableButtons = true;
  }

  


}
