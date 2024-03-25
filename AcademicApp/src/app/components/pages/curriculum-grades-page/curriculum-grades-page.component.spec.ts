import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumGradesPageComponent } from './curriculum-grades-page.component';

describe('CurriculumGradesPageComponent', () => {
  let component: CurriculumGradesPageComponent;
  let fixture: ComponentFixture<CurriculumGradesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumGradesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumGradesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
