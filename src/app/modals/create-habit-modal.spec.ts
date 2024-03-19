import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHabitModal } from './create-habit-modal';
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {GetUserService} from "../Services/get-user-service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

describe('DialogComponent', () => {
  let component: CreateHabitModal;
  let fixture: ComponentFixture<CreateHabitModal>;

  let getUserServiceMock: Partial<GetUserService>;
  let dialogRefMock = {
    open: () => ({})
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateHabitModal
      ],
      providers: [
        { provide: GetUserService, useValue: getUserServiceMock },
        { provide: MatDialogRef, useValue: {open: dialogRefMock}},
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHabitModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display error message when activityName is invalid and touched', () => {
    component.applyForm.controls['activityName'].setErrors({ 'required': true });
    component.applyForm.controls['activityName'].markAsTouched();

    fixture.detectChanges();

    const smallTag = fixture.debugElement.query(By.css('small'));

    expect(smallTag.nativeElement.textContent.trim()).toBe('*Activity name cannot be empty');
  });
});

