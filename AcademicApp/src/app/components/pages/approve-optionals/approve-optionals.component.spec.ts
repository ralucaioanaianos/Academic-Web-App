import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOptionalsComponent } from './approve-optionals.component';

describe('ApproveOptionalsComponent', () => {
  let component: ApproveOptionalsComponent;
  let fixture: ComponentFixture<ApproveOptionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveOptionalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveOptionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
