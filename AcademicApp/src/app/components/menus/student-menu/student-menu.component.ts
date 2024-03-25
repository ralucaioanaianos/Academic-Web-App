import { Component, Input, OnInit } from '@angular/core';
import { studentMenuData } from './studentMenuData';
import { SIDEMENU_WIDTH, SIDEMENU_PADDING } from 'src/app/constants/sizes';
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {STUDENT_FULL_NAME_URL} from "../../../constants/url";
import {map, Observable} from "rxjs";
import {FullName} from "../../../entities/fullName";
import {UserData} from "../../../entities/userData";

@Component({
  selector: 'app-student-menu',
  templateUrl: './student-menu.component.html',
  styleUrls: ['./student-menu.component.css']
})

export class StudentMenuComponent implements OnInit {
  navData = studentMenuData;
  sidemenuWidth = SIDEMENU_WIDTH;
  sidemenuPadding = SIDEMENU_PADDING;
  name : string = '';



  constructor(private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getFullName();

  }

  getFullName(){
    this.http.get<FullName>("http://localhost:8080/userdata/" + this.cookieService.get("username") + "/" +
      this.cookieService.get("username"))
      .subscribe((response:FullName) => {
        console.log(response.fullname);
        this.name = response.fullname;
      });
  }



  logout(){
    console.log("button pressed");
    this.cookieService.delete('username');
    this.cookieService.delete('role');
  }
}
