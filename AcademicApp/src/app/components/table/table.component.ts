import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { TABLE_WIDTH } from 'src/app/constants/sizes';
import { ApisService } from 'src/app/apis/apis.service';
import { DialogBoxMaxstudentsComponent } from '../dialog-box-maxstudents/dialog-box-maxstudents.component';
import { Message } from 'src/app/entities/message';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  
  dataSource = new MatTableDataSource<any>();  // our table
  selection = new SelectionModel<any>(true, []);  // for checkboxes, here we save the data regarding the checkboxes
  displayColumns: string[] = [];  // headers - {edit, selected} (basically only stuff regarding objects)

  @Input() tableWidth: string = TABLE_WIDTH
  @Input() headers: string[] = [];  // headers of table
  @Input() objectsFromDb: any[] = [];  // the objects that are shown in table and are taken from the db
  @Input() pageSize: number = 5;  // how many objects per page
  @Input() hasCheckbox: boolean = false;  // you specify if the table can have a checkbox option
  @Input() hasAction: boolean = false;   // if you want to add/update/delete
  @Input() hasUpdate: boolean = false;
  @Input() hasSee: boolean = false;
  @Input() hasDelete: boolean = false;
  @Input() hasMaximum: boolean = false;
  @Input() hasGrade: boolean = false;

  @ViewChild(MatTableDataSource,{static:true}) table!: MatTableDataSource<any>; // reference to table
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // reference to paginator

  constructor(public dialog: MatDialog, private apiService: ApisService) {}

  ngOnInit(): void {
    // our table data will be the objects from db
    this.dataSource.data = this.objectsFromDb;

    // we decide the headers 
    this.displayColumns = this.headers;
    if (this.hasCheckbox) {
      this.headers = ['select'].concat(this.headers);
    }
    if (this.hasAction) {
      this.headers = this.headers.concat(['action']);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** for checkboxes -> Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** for checkboxes -> Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /* get all oobjects from table */
  getAllRowsData() {
    return this.dataSource.data;
  }

  /** for checkboxes -> Get the objects that were selected */
  getSelectedRowsData() {
    return this.selection.selected;
  }

  /** for edit/show -> opens a dialog with what we want to update/see */
  openDialog(action: string, obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '650px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  /** for edit/show -> opens a dialog with what we want to update/see */
  openDialogMaxStudents(action: string, obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxMaxstudentsComponent, {
      width: '650px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'SetMaxStudents'){
        //this.updateRowData(result.data);
        
        this.setMaxStudents(result.data, obj)
      }
      else if(result.event == "SetGrade") {
        this.setGrades(result.data, obj)
      }
    });
  }
  
  addRowData(row_obj:any){
    this.dataSource.data.push(row_obj);
    this.dataSource.data = [...this.dataSource.data]; //refresh the dataSource
    
  }

  updateRowData(row_obj:any){
    this.dataSource.data = this.dataSource.data.filter((value:any,key:any)=>{
      
      if(value.cid == row_obj.cid){
        for(let attribute of Object.keys(value)){
          value[attribute] = row_obj[attribute];
        }
        
        this.apiService.getFacultyByFid(value.fid).subscribe((fac)=>{
          value["facultyName"] = fac.name;
        })
        
      }
      return true;
    }
    
    );

  }

  setMaxStudents(max: any, course : any) {
    this.dataSource.data = this.dataSource.data.filter((value:any,key:any)=>{
      
      if(value.cid == course.cid){
        course["Max students"] = max;
      }
      return true;
    }
    
    );
  }

  setGrades(grade: any, course : any) {
    this.dataSource.data = this.dataSource.data.filter((value:any,key:any)=>{
      
      if(value["Username"] == course["Username"]){
        if(Number(grade)){
            if(Number(grade) >= 1 && Number(grade) <= 10){
              course["Grade"] = grade;
              course["studentGrade"].gradeValue = grade;
              this.apiService.postStudentsGrades([course["studentGrade"]]).subscribe((message: Message)=>{
                console.log(message.message)
              })
            }
            else{
              alert("Please enter a grade between 1 and 10.")
            }
        }
        else{
          alert("Please enter a number.")
        }
      }
      return true;
    }
    
    );
  }

  deleteRowData(row_obj:any){
    this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      if(value.cid == row_obj.cid){
        
          if(value.cid != -1){
            this.apiService.deleteOptionalCourseByCid(value.cid).subscribe((message)=>{
              alert(message.message);
            })
          }
          return false;
      }
      else{
        return true;
      }
    });

  }

  changeRowsData(newRows: any){
    this.dataSource.data = newRows;
  }

}