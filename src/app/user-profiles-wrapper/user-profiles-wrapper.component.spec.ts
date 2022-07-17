import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilesWrapperComponent } from './user-profiles-wrapper.component';

describe('UserProfilesWrapperComponent', () => {
  let component: UserProfilesWrapperComponent;
  let fixture: ComponentFixture<UserProfilesWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfilesWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfilesWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
