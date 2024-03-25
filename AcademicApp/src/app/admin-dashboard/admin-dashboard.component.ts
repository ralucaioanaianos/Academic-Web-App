import { Component, OnInit } from '@angular/core';
import { SIDEMENU_WIDTH } from '../constants/sizes';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  leftMargin = SIDEMENU_WIDTH;

  constructor() { }

  ngOnInit(): void {
  }

}
