import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DprozExperienceComponent } from './dproz-experience.component';

describe('DprozExperienceComponent', () => {
  let component: DprozExperienceComponent;
  let fixture: ComponentFixture<DprozExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprozExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DprozExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
