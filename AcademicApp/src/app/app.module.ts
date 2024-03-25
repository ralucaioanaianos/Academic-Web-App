import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TestingDashboardComponent } from './testing-dashboard/testing-dashboard.component';
import { StudentMenuComponent } from './components/menus/student-menu/student-menu.component';
import { TeacherMenuComponent } from './components/menus/teacher-menu/teacher-menu.component';
import { AdminMenuComponent } from './components/menus/admin-menu/admin-menu.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { DocumentsPageComponent } from './components/pages/documents-page/documents-page.component';
import { CurriculumGradesPageComponent } from './components/pages/curriculum-grades-page/curriculum-grades-page.component';
import { ProposedOptionalsPageComponent } from './components/pages/proposed-optionals-page/proposed-optionals-page.component';
import { EnrollComponent } from './components/pages/enroll/enroll.component';
import { AddGradeComponent } from './components/pages/add-grade/add-grade.component';
import { ApproveOptionalsComponent } from './components/pages/approve-optionals/approve-optionals.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';
import { AskPrintComponent } from './components/pages/ask-print/ask-print.component';
import { ClassementGrantsComponent } from './components/pages/classement-grants/classement-grants.component';
import { BodyComponent } from './components/pages/body/body.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ButtonComponent } from './components/basic-components/button/button.component';
import {DragAndDropComponent} from "./components/drag-and-drop/drag-and-drop.component";
import {DragAndDropDirective} from "./components/drag-and-drop/drag-and-drop.directive";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {DropdownComponent} from "./components/dropdown/dropdown.component";
import { AddOptionalsComponent } from './components/pages/add-optionals/add-optionals.component';
import { TableComponent } from './components/table/table.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { MatSelectModule } from '@angular/material/select';
import {CookieService} from "ngx-cookie-service";
import {ApisService} from "./apis/apis.service";
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatChipsModule} from "@angular/material/chips";
import { DialogBoxMaxstudentsComponent } from './components/dialog-box-maxstudents/dialog-box-maxstudents.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentDashboardComponent,
    LoginComponent,
    TeacherDashboardComponent,
    AdminDashboardComponent,
    TestingDashboardComponent,
    StudentMenuComponent,
    TeacherMenuComponent,
    AdminMenuComponent,
    ProfilePageComponent,
    DocumentsPageComponent,
    CurriculumGradesPageComponent,
    ProposedOptionalsPageComponent,
    EnrollComponent,
    AddGradeComponent,
    ApproveOptionalsComponent,
    StatisticsComponent,
    AskPrintComponent,
    ClassementGrantsComponent,
    BodyComponent,
    HomeComponent,
    ButtonComponent,
    DragAndDropComponent,
    DragAndDropDirective,
    DropdownComponent,
    AddOptionalsComponent,
    TableComponent,
    DialogBoxComponent,
    DialogBoxMaxstudentsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ScrollingModule,
    MatChipsModule
  ],
  providers: [CookieService, ApisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
