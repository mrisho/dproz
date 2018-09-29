import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DprozProfProfileComponent } from './dproz-prof-profile.component';

describe('DprozProfProfileComponent', () => {
  let component: DprozProfProfileComponent;
  let fixture: ComponentFixture<DprozProfProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprozProfProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DprozProfProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
