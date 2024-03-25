import {Component, OnInit, ViewChild} from '@angular/core';
import { LOGO_WIDTH, PAGE_PADDING, CONTENT_PADDING } from 'src/app/constants/sizes';
import {ApisService} from "../../../apis/apis.service";
import {DropdownComponent} from "../../dropdown/dropdown.component";
import {FacultyYear} from "../../../entities/facultyYear";
import {FacultyAndYearData} from "../../../entities/facultyAndYearData";
import {StudentAverage} from "../../../entities/studentAverage";
import {StaffFilter} from "../../../entities/staffFilter";
import {TableComponent} from "../../table/table.component";

@Component({
  selector: 'app-ask-print',
  templateUrl: './ask-print.component.html',
  styleUrls: ['./ask-print.component.css']
})
export class AskPrintComponent implements OnInit {
  logoWidth = LOGO_WIDTH
  pagePadding = PAGE_PADDING
  contentPadding = CONTENT_PADDING

  facultiesOptions: any = [];

  nameOfFPropertyToShow: string = "name";
  idFProperty: string = "name";

  yearsOptions: any = [];
  nameOfYPropertyToShow: string = "year";
  idYProperty: string = "year";

  groupsOptions: any = [];
  nameOfGPropertyToShow: string = "group";
  idGProperty: string = "group";

  @ViewChild('facultyDd ') facultyDd!: DropdownComponent;
  @ViewChild('yearDd ') yearDd!: DropdownComponent;
  @ViewChild('groupDd ') groupDd!: DropdownComponent;
  @ViewChild('groupTable') table!: TableComponent;

  groupsHeader: any = ["username", "name", "year", "group", "finalGrade", "scholarship"];
  tableData: StudentAverage[] = [];

  constructor(private apiService: ApisService) { }

  ngOnInit(): void {
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

    this.apiService.getStudentsFromFacultyYearGroup(new StaffFilter("", "", ""))
      .subscribe((s) => {
          s.forEach((value, index) =>{
            this.tableData.push(value);
            this.table.changeRowsData(this.tableData);
          })
        })
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

    this.tableData = [];
    this.apiService.getStudentsFromFacultyYearGroup(new StaffFilter(obj.name, "", ""))
      .subscribe((s) => {
        s.forEach((value, index) =>{
          this.tableData.push(value);
          this.table.changeRowsData(this.tableData);
        })
        console.log(s);
      })

    this.apiService.getGroupsFromFaculties(new FacultyYear(obj.name, ""))
      .subscribe((result: number[]) => {
        let array : any = [];
        // creating the array for the faculty dropdown element
        result.forEach((value, index) =>{
          let obj = {"id":index, "group": value};
          array.push(obj);
        })
        // setting the options for the dropdown faculty
        this.groupsOptions = array;
      })
  }

  onYearOptionChanged(){
    /**
     * @TO_DO
     * */
    let objFac = this.facultyDd.getSelectedObject()[0];
    try {
      let obj = this.yearDd.getSelectedObject()[0];
      this.apiService.getStudentsFromFacultyYearGroup(new StaffFilter(objFac.name, obj.year.toString(), ""))
        .subscribe((s) => {
          s.forEach((value, index) =>{
            this.tableData.push(value);
            this.table.changeRowsData(this.tableData);
          })
        })

      this.tableData = [];
      this.apiService.getGroupsFromFaculties(new FacultyYear(objFac.name, obj.year.toString()))
        .subscribe((result: number[]) => {
          let array : any = [];
          // creating the array for the faculty dropdown element
          result.forEach((value, index) =>{
            let obj = {"id":index, "group": value};
            array.push(obj);
          })
          // setting the options for the dropdown faculty
          this.groupsOptions = array;
        })
    }catch (e){
      this.apiService.getStudentsFromFacultyYearGroup(new StaffFilter(objFac.name, '', ""))
        .subscribe((s) => {
          s.forEach((value, index) =>{
            this.tableData.push(value);
            this.table.changeRowsData(this.tableData);
          })
        })

      this.tableData = [];
      this.apiService.getGroupsFromFaculties(new FacultyYear(objFac.name, ''))
        .subscribe((result: number[]) => {
          let array : any = [];
          // creating the array for the faculty dropdown element
          result.forEach((value, index) =>{
            let obj = {"id":index, "group": value};
            array.push(obj);
          })
          // setting the options for the dropdown faculty
          this.groupsOptions = array;
        })
    }
  }

  onGroupOptionChanged(){
    let objFac = this.facultyDd.getSelectedObject()[0];
    try {
      let objYear = this.yearDd.getSelectedObject()[0];
      try {
        let obj = this.groupDd.getSelectedObject()[0];

        this.tableData = [];
        this.apiService.getStudentsFromFacultyYearGroup(new StaffFilter(objFac.name, objYear.year.toString(), obj.group.toString()))
          .subscribe((s) => {
            s.forEach((value, index) => {
              this.tableData.push(value);
              this.table.changeRowsData(this.tableData);
            })
          })
      }
      catch (e){
        this.tableData = [];
        this.apiService.getStudentsFromFacultyYearGroup(new StaffFilter(objFac.name, objYear.year.toString(), ""))
          .subscribe((s) => {
            s.forEach((value, index) => {
              this.tableData.push(value);
              this.table.changeRowsData(this.tableData);
            })
          })
      }
    }
    catch(e){
      this.tableData = [];
      this.apiService.getStudentsFromFacultyYearGroup(new StaffFilter(objFac.name, "", ""))
        .subscribe((s) => {
          s.forEach((value, index) => {
            this.tableData.push(value);
            this.table.changeRowsData(this.tableData);
          })
        })
    }
  }


  print(){
    window.print();
  }
}
