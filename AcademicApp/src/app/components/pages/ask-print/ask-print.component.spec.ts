import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPrintComponent } from './ask-print.component';

describe('AskPrintComponent', () => {
  let component: AskPrintComponent;
  let fixture: ComponentFixture<AskPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
