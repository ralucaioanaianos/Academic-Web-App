import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOptionalsComponent } from './add-optionals.component';

describe('AddOptionalsComponent', () => {
  let component: AddOptionalsComponent;
  let fixture: ComponentFixture<AddOptionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOptionalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOptionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
