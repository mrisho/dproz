import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DprozAboutUsComponent } from './dproz-about-us.component';

describe('DprozAboutUsComponent', () => {
  let component: DprozAboutUsComponent;
  let fixture: ComponentFixture<DprozAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprozAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DprozAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
