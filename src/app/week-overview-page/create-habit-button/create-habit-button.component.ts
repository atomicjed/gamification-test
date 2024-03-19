import {Component, Input, OnInit} from '@angular/core';
import {CreateHabitModal} from "../../modals/create-habit-modal";
import {MatDialog} from "@angular/material/dialog";
import {GetHabitsService} from "../week-overview-services/get-habits-service/get-habits.service";
import {GetUserService} from "../../Services/get-user-service";
import {WeekIndexingService} from "../week-overview-services/week-indexing-service/week-indexing.service";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

interface CreateHabitModalData {
  day: string;
  weekKeys: string[];
  weekIndex: number;
}

@Component({
  selector: 'app-create-habit-button',
  templateUrl: './create-habit-button.component.html',
  styleUrl: './create-habit-button.component.css'
})
export class CreateHabitButtonComponent implements OnInit {
  @Input() day!: string;
  @Input() currentDay!: string;
  @Input() currentDate!: Date;
  @Input() currentWeek!: number;

  faPlus = faPlus;
  userId: string = '';
  weekKeys: string[] = [];
  weekIndex: number = 0;

  constructor(private _dialog: MatDialog, private _getHabitsService: GetHabitsService, private _getUserService: GetUserService, private _weekIndexService: WeekIndexingService) {
  }

  ngOnInit() {
    this._weekIndexService.weekIndex$.subscribe(index => {
      this.weekIndex = index;
    })
    this._weekIndexService.weekKeys$.subscribe(weeks => {
      this.weekKeys = weeks;
    })
  }

 openCreateHabitDialog(day: string, weekKeys: string[], weekIndex: number, currentDate: Date) {
    const modalData: CreateHabitModalData = {
      day: day,
      weekKeys: weekKeys,
      weekIndex: weekIndex
    };
    const dialogRef = this._dialog.open(CreateHabitModal, {
      data: modalData
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getUserAndHabits();
    })
  }

  async getUserAndHabits() {
    await this.getUser();
    await this.getHabits();
  }

  async getUser() {
    try {
      this.userId = await this._getUserService.getUserId();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getHabits() {
    try {
      await this._getHabitsService.fetchWeekData(this.userId);
      this.weekKeys = this._getHabitsService.weekKeys;
    } catch (error) {
      console.error('Error fetching habits data:', error);
    }
  }

  //sort days logic
  getFutureDays(day: string) {
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex: number = this.currentDate.getDay();
    const futureDays: string[] = days.filter((day, index) => index >= dayIndex);
    return futureDays.includes(day);
  }

  isCurrentWeek() {
    return ((this.weekIndex - this.currentWeek) + 1) == 0;
  }

  isLastWeek() {
    return ((this.weekIndex - this.weekKeys.length) + 1) == 0;
  }
}
