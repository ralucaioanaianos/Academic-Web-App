import { Component, Input, OnInit } from '@angular/core';
import { teacherMenuData, chiefMenuData } from './teacherMenuData';
import { SIDEMENU_WIDTH, SIDEMENU_PADDING } from 'src/app/constants/sizes';
import {CookieService} from "ngx-cookie-service";
import {FullName} from "../../../entities/fullName";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-teacher-menu',
  templateUrl: './teacher-menu.component.html',
  styleUrls: ['./teacher-menu.component.css']
})
export class TeacherMenuComponent implements OnInit {
  teacherData = teacherMenuData;
  chiefData = chiefMenuData;
  sidemenuWidth = SIDEMENU_WIDTH;
  sidemenuPadding = SIDEMENU_PADDING;
  style: string = ''
  name : string = '';
  role: string = '';
  chiefHidden: boolean = false;
  constructor(private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getFullName();

    if(this.cookieService.get("role") == 'teacher'){
       this.chiefHidden = true;
       this.style = "gap: 6rem"
    }
    else{
      this.style = "gap: 1.6rem"
    }

    this.role = this.cookieService.get("role");
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
