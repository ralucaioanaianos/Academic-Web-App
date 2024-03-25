import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApisService } from 'src/app/apis/apis.service';


@Component({
  selector: 'app-dialog-box-maxstudents',
  templateUrl: './dialog-box-maxstudents.component.html',
  styleUrls: ['./dialog-box-maxstudents.component.css']
})
export class DialogBoxMaxstudentsComponent implements OnInit {
  action: string;
  local_data: any;
  local_data_maxstudents: any;
  ngOnInit(): void {
  
  }

  constructor(
    public dialogRef: MatDialogRef<DialogBoxMaxstudentsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,) {
        this.local_data = {...data};
        this.action = this.local_data.action;
  }

  setMaxStudents(){
    this.dialogRef.close({event:this.action,data:this.local_data_maxstudents});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
