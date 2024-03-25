import { Component, OnInit } from '@angular/core';
import { SIDEMENU_WIDTH } from '../constants/sizes';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  leftMargin = SIDEMENU_WIDTH;

  constructor() { }

  ngOnInit(): void {
  }

}
