import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApisService } from 'src/app/apis/apis.service';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit{
  action: string;
  local_data: any;

  // for adding new course modal
  facultyOptionsDd : any[] = [];
  yearOptionsDd: number[] = [];
  semesterOptionsDd: number[] = [];
  creditsOptionsDd = [1, 2, 3, 4, 5, 6, 7];

  dropdownData = {
    'facultyOptions': this.facultyOptionsDd,
    'yearOptions': this.yearOptionsDd,
    'semesterOptions': this.semesterOptionsDd,
    'creditsOptions': this.creditsOptionsDd,
  }

  ngOnInit(): void {
    this.getFaculties();
  }

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private apiService: ApisService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,) {
        console.log(data);
        this.local_data = {...data};
        this.action = this.local_data.action;
  }

  getFaculties(): any{
    /**
     * @TO_DO
     */
    this.apiService.getAllFaculties().subscribe((faculties) =>{
        for(let faculty of faculties){
          let obj = {"value": faculty.fid, "viewValue": faculty.name}
          this.facultyOptionsDd.push(obj);
        }
    })

  }

  getYears(data:any){
    /**
     * @TO_DO
     */

    let facId : number = data.value;
    if(facId!=null){
      
      this.apiService.getFacultyByFid(facId).subscribe((fac) =>{
        let noOfYears = fac.noyears; // faculty id
        
        // here you get the years 
        let years:number[] = [];
    
        for(let i=1;i<=noOfYears;i++){
          years.push(i)
        }
    
        this.dropdownData['yearOptions'] = years;
  
      })
  
    }
  }

  getSemesters(year:any){

    let semesters : number[] = [2*(year)-1, 2*(year)];

    this.dropdownData['semesterOptions'] = semesters;
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
