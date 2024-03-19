import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateHabitButtonComponent} from './create-habit-button.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {GetUserService} from "../../Services/get-user-service";
import {MatDialog} from "@angular/material/dialog";

describe('CreateHabitButtonComponent', () => {
  let component: CreateHabitButtonComponent;
  let fixture: ComponentFixture<CreateHabitButtonComponent>;
  let getUserServiceMock: Partial<GetUserService>;
  let dialogOpenMock: jest.Mock;
  beforeEach(async () => {
    getUserServiceMock = {
      getUserId: jest.fn().mockResolvedValue('MockUserID')
    };

    dialogOpenMock = jest.fn(() => {
      return {
        afterClosed: () => {
          return { subscribe: jest.fn() };
        }
      };
    });

    await TestBed.configureTestingModule({
      declarations: [CreateHabitButtonComponent],
      providers: [
        { provide: MatDialog, useValue: {open: dialogOpenMock}},
        { provide: GetUserService, useValue: getUserServiceMock }],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateHabitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open dialog with correct modal data', () => {
    const day = 'Monday';
    const weekKeys = ['Week1', 'Week2', 'Week3'];
    const weekIndex = 1;
    const currentDate = new Date('2024-03-14');

    // Call the method
    component.openCreateHabitDialog(day, weekKeys, weekIndex, currentDate);

    // Check if MatDialog's open method was called with the correct modal data
    expect(dialogOpenMock).toHaveBeenCalledWith(
      expect.any(Function),
      {
        data: {
          day: day,
          weekKeys: weekKeys,
          weekIndex: weekIndex
        }
      }
    );
  });
});
