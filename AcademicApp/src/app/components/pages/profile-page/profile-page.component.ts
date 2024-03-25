import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApisService } from 'src/app/apis/apis.service';
import { LOGO_WIDTH, PAGE_PADDING, CONTENT_PADDING } from 'src/app/constants/sizes';
import { UserData } from 'src/app/entities/userData';
import { StudentDashboardComponent } from 'src/app/student-dashboard/student-dashboard.component';
import { Student } from 'src/app/entities/student';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'src/app/entities/message';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {
  logoWidth = LOGO_WIDTH
  pagePadding = PAGE_PADDING
  contentPadding = CONTENT_PADDING

  namePlaceholder = 'Name...';
  surnamePlaceholder = 'Surname...';
  phonePlaceholder = 'Phone...';
  emailPlaceholder = 'Email...';
  cnpPlaceholder = 'Cnp...';
  homePlaceholder = 'Home...';
  bursierText: string = 'Not yet decided';

  nameValue = 'Name...';
  surnameValue = 'Surname...';
  phoneValue = 'Phone...';
  emailValue = 'Email...';
  cnpValue = 'Cnp...';
  homeValue= 'Home...';
  role : string = "";
  forScholarship: boolean = true;

  constructor(private apiService: ApisService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.fillForm();
    this.role = this.cookieService.get("role");

    if(this.role == "student"){
      this.forScholarship = false;
    }
  }

  onSubmit(f: NgForm) {
    /**
     * @TO_DO - add validations + backend
     */
    //console.log(f.value);  // here you get the values from the from
    //console.log(f.valid);  // check if form is valid

    let userdata: UserData = new UserData(this.cookieService.get("username"), this.nameValue, this.surnameValue, this.emailValue, this.phoneValue, this.homeValue, this.cnpValue)
    this.apiService.postUserData(userdata).subscribe( (message: Message) => {
        console.log(message.message)
    })

    // here send data to backend

    // TO DO: the modal where you confirm that the data was send + refresh page to see modifications
  }

  fillForm(){
    /** 
     * @TO_DO - Here get from backend to fill the profile.
     */

    this.apiService.getUserData().subscribe((userData: UserData) => {
      this.nameValue = userData.name
      this.surnameValue = userData.surname
      this.phoneValue = userData.phone_number
      this.emailValue = userData.email
      this.cnpValue = userData.cnp
      this.homeValue = userData.home_address
    })

    this.apiService.getStudentByUsername().subscribe((student: Student) => {
      if(student.scholarship == 0){
        this.bursierText = "Not yet decided";
      }
      else{
        this.bursierText = "You got a scholarship. It is: " + student.scholarship.toString();
      }
    })
  }

}
