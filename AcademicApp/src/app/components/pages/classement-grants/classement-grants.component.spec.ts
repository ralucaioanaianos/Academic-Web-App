import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementGrantsComponent } from './classement-grants.component';

describe('ClassementGrantsComponent', () => {
  let component: ClassementGrantsComponent;
  let fixture: ComponentFixture<ClassementGrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassementGrantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassementGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
