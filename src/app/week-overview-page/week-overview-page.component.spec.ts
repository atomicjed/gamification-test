import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeekOverviewPageComponent } from './week-overview-page.component';
import {GetUserService} from "../Services/get-user-service";
import {DoesUserExistService} from "../Services/doesUserExistService";
import {DoesUserExistMock} from "../mocks/MockServices";
import {AppComponent} from "../app.component";
import {Observable, of} from "rxjs";

describe('WeekOverviewPageComponent', () => {
  let component: WeekOverviewPageComponent;
  let fixture: ComponentFixture<WeekOverviewPageComponent>;
  let getUserServiceMock: Partial<GetUserService>;
  let doesUserExistService: DoesUserExistService;
  let getHabitsSpy: jest.SpyInstance;
  let getUserSpy: jest.SpyInstance;
  beforeEach(async () => {
      getUserServiceMock = {
        getUserId: jest.fn().mockResolvedValue('MockUserID')
      };
    await TestBed.configureTestingModule({
      declarations: [WeekOverviewPageComponent],
      providers: [
        { provide: GetUserService, useValue: getUserServiceMock },
        DoesUserExistService
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekOverviewPageComponent);
    component = fixture.componentInstance;
    doesUserExistService = TestBed.inject(DoesUserExistService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set userExists to true if returns userId', async() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    await component.getUser();

    expect(getUserServiceMock.getUserId).toHaveBeenCalled();
    expect(component.userExists).toBe(true);
  })
  it('if user does exist should call getHabits', async () => {
    const spy = jest.spyOn(doesUserExistService, 'doesUserExistRequest').mockReturnValue(of(true));
    getHabitsSpy = jest.spyOn(component, 'getHabits').mockResolvedValue();
    await component.getUserAndHabits();
    expect(getHabitsSpy).toHaveBeenCalled();

    spy.mockRestore();
  })
  it('if user does not exist should call getUser', async () => {
    const spy = jest.spyOn(doesUserExistService, 'doesUserExistRequest').mockReturnValue(of(false));
    const getHabitsMock = jest.fn();
    const addNewWeekMock = jest.fn();
    const createScheduleTemplateMock = jest.fn();
    component.createScheduleTemplate = createScheduleTemplateMock;
    component.getHabits = getHabitsMock;
    component.addNewWeek = addNewWeekMock;
    await component.getUserAndHabits();
    expect(createScheduleTemplateMock).toHaveBeenCalled();
    expect(getHabitsMock).toHaveBeenCalled()
    expect(addNewWeekMock).toHaveBeenCalled();
    expect(getHabitsMock).toHaveBeenCalled();
  })
});
