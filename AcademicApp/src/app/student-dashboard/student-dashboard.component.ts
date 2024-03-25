import { Component, OnInit } from '@angular/core';
import { SIDEMENU_WIDTH } from '../constants/sizes';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  leftMargin = SIDEMENU_WIDTH;

  constructor() { }

  ngOnInit(): void {
    // aici a scris field urile
  }

}
