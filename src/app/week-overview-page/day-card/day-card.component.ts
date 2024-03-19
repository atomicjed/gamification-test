import {Component, Input, OnInit} from '@angular/core';
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import {WeekIndexingService} from "../week-overview-services/week-indexing-service/week-indexing.service";
import {GetUserService} from "../../Services/get-user-service";
import {GetHabitsService} from "../week-overview-services/get-habits-service/get-habits.service";
import {CreateTemplateScheduleService} from "../../Services/create-template-schedule-service";
import {AddNewWeekService} from "../../Services/add-new-week-service";
import {AddStartDateToWeekService} from "../../Services/add-start-date-to-week-service";
import {MatDialog} from "@angular/material/dialog";
import {DoesUserExistService} from "../../Services/doesUserExistService";

interface WeekActivities {
  monday: any[];
  tuesday: any[];
  wednesday: any[];
  thursday: any[];
  friday: any[];
  saturday: any[];
}

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrl: './day-card.component.css'
})
export class DayCardComponent implements OnInit {
  @Input() day!: string;
  @Input() currentWeek!: number;
  @Input() userId!: string;

  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;

  currentDate: Date = new Date();
  currentDay: string = this.getCurrentDay();
  weekKeys: string[] = [];
  weekIndex: number = this.weekKeys.length - 2;
  userExists: boolean = false;
  lastWeekStartDate: string = '';
  nextWeekActivities: WeekActivities = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  };

  private _getUserAndHabitsInProgress: boolean = false;


  constructor(private _weekIndexService: WeekIndexingService, private _getUserService: GetUserService, private _getHabitsService: GetHabitsService, private _createTemplateService: CreateTemplateScheduleService, private _addNewWeekService: AddNewWeekService, private _addStartDateService: AddStartDateToWeekService, private _dialog: MatDialog, private _doesUserExistService: DoesUserExistService) {
  }

  ngOnInit() {
    this._weekIndexService.weekIndex$.subscribe(index => {
      this.weekIndex = index;
    })
    this._weekIndexService.weekKeys$.subscribe(weeks => {
      this.weekKeys = weeks;
      this.currentWeek = weeks.length - 1;

    })
  }

  getHabitsForDay(day: string) {
    const mondayData = this._getHabitsService.mondayHabitsSubject.getValue()[this.weekKeys[this.weekIndex]];
    const tuesdayData = this._getHabitsService.tuesdayHabitsSubject.getValue()[this.weekKeys[this.weekIndex]];
    const wednesdayData = this._getHabitsService.wednesdayHabitsSubject.getValue()[this.weekKeys[this.weekIndex]];
    const thursdayData = this._getHabitsService.thursdayHabitsSubject.getValue()[this.weekKeys[this.weekIndex]];
    const fridayData = this._getHabitsService.fridayHabitsSubject.getValue()[this.weekKeys[this.weekIndex]];
    const saturdayData = this._getHabitsService.saturdayHabitsSubject.getValue()[this.weekKeys[this.weekIndex]];

    if (day === 'Monday')
      return mondayData;
    if (day === 'Tuesday')
      return tuesdayData;
    if (day === 'Wednesday')
      return wednesdayData;
    if (day === 'Thursday')
      return thursdayData;
    if (day === 'Friday')
      return fridayData;
    if (day === 'Saturday')
      return saturdayData;
    else {
      return;
    }
  }

  //Sorting days logic
  isCurrentWeek() {
    return ((this.weekIndex - this.currentWeek) + 1) == 0;
  }

  getCurrentDay(): string {
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex: number = this.currentDate.getDay();
    return days[dayIndex];
  }
}
