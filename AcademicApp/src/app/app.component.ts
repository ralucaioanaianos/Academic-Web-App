import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AcademicApp';
}
