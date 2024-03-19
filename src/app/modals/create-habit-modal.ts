import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {faPersonWalking} from "@fortawesome/free-solid-svg-icons/faPersonWalking";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {GetUserService} from "../Services/get-user-service";
import {AddHabitPostRequestService} from "../Services/add-habit-post-request";
import {AddToAllWeeksService} from "../Services/add-to-all-weeks";

interface ModalData {
  day: string,
  weekKeys: string[],
  weekIndex: number,
  currentDate: Date
}

@Component({
  selector: 'app-dialog',
  templateUrl: './create-habit-modal.html',
  styleUrl: './create-habit-modal.css'
})
export class CreateHabitModal implements OnInit {
  faPersonWalking = faPersonWalking;
  faCheck = faCheck;

  userId: string = '';
  isForEveryWeek: boolean = false;
  applyForm = this.formBuilder.group({
    activityName: [null, [Validators.required]],
    isForEveryWeek: [false]
  });

  constructor(private formBuilder: FormBuilder, private postToAllWeeksService: AddToAllWeeksService, private postService: AddHabitPostRequestService, private http: HttpClient, private getUserService: GetUserService, private dialog: MatDialog, private dialogRef: MatDialogRef<CreateHabitModal>, @Inject(MAT_DIALOG_DATA) public data: ModalData) {
  }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    try {
      this.userId = await this.getUserService.getUserId();
    } catch (error) {
      console.log("Error getting user ID", error)
    }
  }

  toggleIsForEveryWeek(): void {
    this.isForEveryWeek = !this.isForEveryWeek;
  }

onSubmit(day: string, userId: string) {
    const isPreviousDay = this.getPreviousDays(day);
    const weekName = `Week${this.data.weekIndex + 1}`;
    const activityNameControl = this.applyForm?.get('activityName')!;
    const isForEveryWeekNameControl = this.applyForm?.get('isForEveryWeek')!;
    const weekKeysString = JSON.stringify(this.data.weekKeys);
    const formData = {
      activityName: activityNameControl.value,
      completed: false,
      isForEveryWeek: isForEveryWeekNameControl.value
    }
    const formDataForAllWeeks = {
      WeekKeys: this.data.weekKeys,
      Activity: {
        activityName: activityNameControl.value,
        completed: false,
        isForEveryWeek: isForEveryWeekNameControl.value
      },
    }
    if (this.isForEveryWeek) {
      this.postToAllWeeksService.postDataToAllWeeks(userId, day, isPreviousDay, formDataForAllWeeks).subscribe(
        (response) => {
          console.log('POST to all request successful');
          this.dialogRef.close();
        }, (error) => {
          console.log('Error sending POST to all request:', error);
        }
      )
    } else {
      this.postService.postData(userId, day, weekName, formData).subscribe(
        (response) => {
          console.log('POST request successful');
          this.dialogRef.close();
        }, (error) => {
          console.log('Error sending POST request:', error);
        }
      )
    }
  }
  getPreviousDays(day: string) {
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const dayIndex: number = currentDate.getDay();
    console.log(dayIndex)
    const previousDays: string[] = days.filter((day, index) => index < dayIndex);
    return previousDays.includes(day);
  }
}

