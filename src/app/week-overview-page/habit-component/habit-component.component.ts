import {Component, Input, OnInit} from '@angular/core';
import {faBarsStaggered} from "@fortawesome/free-solid-svg-icons/faBarsStaggered";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import {WeekIndexingService} from "../week-overview-services/week-indexing-service/week-indexing.service";
import {UpdateStatusModal} from "../../modals/update-status-modal/update-status-modal";
import {MatDialog} from "@angular/material/dialog";
import {GetHabitsService} from "../week-overview-services/get-habits-service/get-habits.service";

interface HabitStatusModalData {
  day: string;
  activityName: string;
  userId: string;
  weekKeys: string[]
}

interface Habit {
  activityName: string,
  completed: boolean,
  isForEveryWeek: boolean
}

@Component({
  selector: 'app-habit-component',
  templateUrl: './habit-component.component.html',
  styleUrl: './habit-component.component.css'
})
export class HabitComponentComponent implements OnInit {
  @Input() habit!: Habit;
  @Input() day!: string;
  @Input() currentDate!: Date;
  @Input() currentDay!: string;
  @Input() currentWeek!: number;
  @Input() userId!: string;

  faStaggered = faBarsStaggered;
  faCircleXmark = faCircleXmark;
  faCircleCheck = faCircleCheck;

  weekIndex: number = 0;
  weekKeys: string[] = [];

  constructor(private _weekIndexService: WeekIndexingService, private _dialog: MatDialog, private _getHabitsService: GetHabitsService) {
  }

  ngOnInit() {
    this._weekIndexService.weekIndex$.subscribe(index => {
      this.weekIndex = index
    })
    this._weekIndexService.weekKeys$.subscribe(weeks => {
      this.weekKeys = weeks
    })
  }

  getFutureDays(day: string) {
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex: number = this.currentDate.getDay();
    const futureDays: string[] = days.filter((day, index) => index >= dayIndex);
    return futureDays.includes(day);
  }

  getPreviousDays(day: string) {
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex: number = this.currentDate.getDay();
    const previousDays: string[] = days.filter((day, index) => index < dayIndex);
    return previousDays.includes(day);
  }

  async getHabits() {
    try {
      await this._getHabitsService.fetchWeekData(this.userId);
      this.weekKeys = this._getHabitsService.weekKeys;
      this._weekIndexService.setWeekKeys(this.weekKeys);
    } catch (error) {
      console.log("Error fetching habits", error)
    }
  }

  openHabitStatusDialog(day: string, activityName: string): void {
    const modalData: HabitStatusModalData = {
      day: day,
      activityName: activityName,
      userId: this.userId,
      weekKeys: this.weekKeys
    };
    if (day == this.currentDay) {
      const dialogRef = this._dialog.open(UpdateStatusModal, {
        data: modalData
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getHabits();
      })
    }
  }

//Sorting days logic
  isCurrentWeek() {
    return ((this.weekIndex - this.currentWeek) + 1) == 0;
  }

  isCurrentOrLaterWeek() {
    return ((this.weekIndex - this.currentWeek) + 1) >= 0
  }

  isLaterWeek() {
    return ((this.weekIndex - this.currentWeek) + 1) > 0
  }
}
