import {Component, OnInit, ViewChild} from '@angular/core';
import { LOGO_WIDTH, PAGE_PADDING, CONTENT_PADDING } from 'src/app/constants/sizes';
import {ApisService} from "../../../apis/apis.service";
import {FoundingData} from "../../../entities/foundingData";
import {TableComponent} from "../../table/table.component";
import {StudentAverage} from "../../../entities/studentAverage";
import {StudentGradeStaff} from "../../../entities/studentGradeStaff";
import {Message} from "../../../entities/message";

@Component({
  selector: 'app-classement-grants',
  templateUrl: './classement-grants.component.html',
  styleUrls: ['./classement-grants.component.css']
})
export class ClassementGrantsComponent implements OnInit {
  logoWidth = LOGO_WIDTH
  pagePadding = PAGE_PADDING
  contentPadding = CONTENT_PADDING

  @ViewChild('groupTable') table!: TableComponent;

  tableHeaders: any = ["username", "gradeValue"];
  studentsData: StudentGradeStaff[] = [];

  gradePlaceholder = 'Input value';
  moneyPlaceholder = 'Input value';
  gradeValue = 0;
  moneyValue = 0;

  hiddenButton: boolean = false;

  constructor(private apisService: ApisService) { }

  ngOnInit(): void {
    this.apisService.getStudentGrades()
      .subscribe((sgs) => {
        sgs.forEach((value, index) =>{
          console.log(value)
          this.studentsData.push(value);
          this.table.changeRowsData(this.studentsData);
        })
      })
    this.apisService.checkIfAssignEnabled()
      .subscribe((n) => {
        if (n == 0){
          this.hiddenButton = true;
        }
      })
  }

  fillForm() {
    let obj = new FoundingData(this.gradeValue, this.moneyValue)
    this.apisService.postSetScholarships(obj)
      .subscribe((result: number) => {
        alert("The scholarship fund was set to " + result + "!");
      })
  }

  assignStudents() {
    this.apisService.postAssignStudentToOptionals()
      .subscribe((m: Message) => {
        alert("All students were assigned to optionals!");
        this.apisService.checkIfAssignEnabled()
          .subscribe((n) => {
            if (n == 0){
              this.hiddenButton = true;
            }
          })
      })
  }
}
