import { Component, Input, OnInit } from '@angular/core';
import { adminMenuData } from './adminMenuData';
import { SIDEMENU_WIDTH, SIDEMENU_PADDING } from 'src/app/constants/sizes';
import {CookieService} from "ngx-cookie-service";
import {FullName} from "../../../entities/fullName";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  navData = adminMenuData;
  sidemenuWidth = SIDEMENU_WIDTH;
  sidemenuPadding = SIDEMENU_PADDING;

  @Input() name : string = '';


  constructor(private cookieService: CookieService, private http:HttpClient) { }

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
