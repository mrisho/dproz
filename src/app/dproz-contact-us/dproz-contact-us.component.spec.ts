import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DprozContactUsComponent } from './dproz-contact-us.component';

describe('DprozContactUsComponent', () => {
  let component: DprozContactUsComponent;
  let fixture: ComponentFixture<DprozContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprozContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DprozContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
