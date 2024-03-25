import { Component, OnInit } from '@angular/core';
import { SIDEMENU_WIDTH } from 'src/app/constants/sizes';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  leftMargin = SIDEMENU_WIDTH;

  constructor() { }

  ngOnInit(): void {
  }

}
