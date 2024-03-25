import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxMaxstudentsComponent } from './dialog-box-maxstudents.component';

describe('DialogBoxMaxstudentsComponent', () => {
  let component: DialogBoxMaxstudentsComponent;
  let fixture: ComponentFixture<DialogBoxMaxstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxMaxstudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxMaxstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
