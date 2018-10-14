import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DprozCredentialsComponent } from './dproz-credentials.component';

describe('DprozCredentialsComponent', () => {
  let component: DprozCredentialsComponent;
  let fixture: ComponentFixture<DprozCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprozCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DprozCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
