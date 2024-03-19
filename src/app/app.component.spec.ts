import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {GetUserService} from "./Services/get-user-service";
import {MockGetUserService} from "./mocks/MockServices";

describe('AppComponent', () => {
  let getUserServiceMock: Partial<GetUserService>;
  beforeEach(async () => {
      getUserServiceMock = {
      getUserId: jest.fn().mockResolvedValue('MockUserID')
    };
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: GetUserService, useValue: getUserServiceMock }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set userExists to true if returns userId', async() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    await component.getUser();

    expect(getUserServiceMock.getUserId).toHaveBeenCalled();
    expect(component.userExists).toBe(true);
  })
});
