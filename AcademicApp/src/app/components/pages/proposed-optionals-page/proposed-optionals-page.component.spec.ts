import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedOptionalsPageComponent } from './proposed-optionals-page.component';

describe('ProposedOptionalsPageComponent', () => {
  let component: ProposedOptionalsPageComponent;
  let fixture: ComponentFixture<ProposedOptionalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposedOptionalsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposedOptionalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
