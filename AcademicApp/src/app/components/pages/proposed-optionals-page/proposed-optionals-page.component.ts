import {Component, OnInit} from '@angular/core';
import {LOGO_WIDTH, PAGE_PADDING, CONTENT_PADDING} from 'src/app/constants/sizes';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TABLE_TEST_DATA} from 'src/app/testing-dashboard/testingData';
import {Course} from "../../../entities/course";
import {ApisService} from "../../../apis/apis.service";

@Component({
  selector: 'app-proposed-optionals-page',
  templateUrl: './proposed-optionals-page.component.html',
  styleUrls: ['./proposed-optionals-page.component.css']
})
export class ProposedOptionalsPageComponent implements OnInit {
  logoWidth = LOGO_WIDTH
  pagePadding = PAGE_PADDING
  contentPadding = CONTENT_PADDING

  constructor(private apisService: ApisService) {
  }

  ngOnInit(): void {
    this.getOptionals();
    this.checkIfBtnGottaBeDisabled();
  }

  optionals: Course[] = []
  chosenOptionals: Course[] = []

  entities: any = [];
  disabledButton: boolean = false;
  disabled: boolean = false;

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.optionals, event.previousIndex, event.currentIndex);
  // }

  getOptionals() {
    /**
     * @TO_DO - send to backend the list of optionals
     * */
    this.apisService.getAllOptionals()
      .subscribe((c: Course[]) => {
        c.forEach((value, index) => {
          this.optionals.push(value)
        })
      })
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.optionals = [...this.optionals];
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.chosenOptionals = [...this.chosenOptionals];
    }
  }

  eventPredicate() {
    return this.chosenOptionals && this.chosenOptionals.length < 5;
  }

  eventFirstPredicate() {
    return this.optionals && this.optionals.length < 1000;
  }

  chosenOptionalsPredicate = (): boolean => {
    return this.eventPredicate();
  }

  optionalsPredicate = (): boolean => {
    return this.eventFirstPredicate();
  }



  sendOptionals() {
    /**
     * @TO_DO - send to backend the list of optionals
     * */

    // you get them in the right order (based on what the student wanted)

    // decide what you exactly need to send to db..if you only send the first one or idk

    // TO DO: disable the button... + modal to confirm that the optionals were send.
    this.apisService.postOptionalsPreferences(this.chosenOptionals)
      .subscribe((m: any) => {
        if (m == null)
          alert("You cannot add more optionals!")
        else{
          alert("Your optionals have been set!");
        }
      })
  }

  checkIfBtnGottaBeDisabled() {
    this.apisService.checkIfAssignEnabledForEveryone()
      .subscribe((n) => {
        if (n == 0){
          this.disabled = true;
          alert("You have been assigned to an optional! You cannot send anymore.")
        }
      })
}


}
