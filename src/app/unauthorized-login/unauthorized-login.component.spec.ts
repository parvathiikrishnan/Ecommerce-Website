import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedLoginComponent } from './unauthorized-login.component';

describe('UnauthorizedLoginComponent', () => {
  let component: UnauthorizedLoginComponent;
  let fixture: ComponentFixture<UnauthorizedLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthorizedLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
