import {Component, Input, OnInit} from '@angular/core';
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons/faArrowRightLong";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons/faArrowLeftLong";
import {WeekIndexingService} from "../week-overview-services/week-indexing-service/week-indexing.service";
import {GetHabitsService} from "../week-overview-services/get-habits-service/get-habits.service";
import {DatePipe} from "@angular/common";
import {GetUserService} from "../../Services/get-user-service";
import * as jwt_decode from "jwt-decode";
@Component({
  selector: 'app-week-header-slider',
  templateUrl: './week-header-slider.component.html',
  styleUrl: './week-header-slider.component.css'
})
export class WeekHeaderSliderComponent implements OnInit {
  @Input() userId: string = '';
  @Input() fakeWeekKeys: string[] = [];

  faArrowRightLong = faArrowRightLong;
  faArrowLeftLong = faArrowLeftLong;

  formatStartOfFirstWeek: string | undefined | null;
  formatStartOfWeek: string | null = '';
  formatEndOfWeek: string | null = '';
  formatEndOfFirstWeek: string | null = '';
  weekKeys: string[] = this.fakeWeekKeys;
  weekIndex: number = this.weekKeys.length - 2;



  constructor(private _weekIndexService: WeekIndexingService, private _getHabitsService: GetHabitsService, private _getUserService: GetUserService, private _datePipe: DatePipe) {
  }

  ngOnInit() {
    this._weekIndexService.weekIndex$.subscribe(index => {
      this.weekIndex = index;
    })
    this._weekIndexService.weekKeys$.subscribe(weeks => {
      this.weekKeys = weeks;
    })
    this.formatDate();
    this.getHabits();
  }



  incrementWeekIndex() {
    if (this.weekIndex < this.weekKeys.length - 1) {
      this.weekIndex++;
      this._weekIndexService.setWeekIndex(this.weekIndex);
      this.getHabits();
    }
  }

  decrementWeekIndex() {
    if (this.weekIndex >= 1) {
      this.weekIndex--;
      this._weekIndexService.setWeekIndex(this.weekIndex);
      this.getHabits();
    }
  }

  async getHabits() {
    try {
      await this._getHabitsService.fetchWeekData(this.userId);
      await this.formatDate();
      this.weekKeys = this._getHabitsService.weekKeys;
      this._weekIndexService.setWeekKeys(this.weekKeys);
    } catch (error) {
      if (this.userId)
        console.error('Error fetching habits data:', error);
      else
        console.log("No userId")
    }
  }

  async formatDate() {
    if (this.weekIndex == 0) {
      const startOfFirstWeekString = this._getHabitsService.dates[`Week${this.weekIndex + 1}`];
      const startOfFirstWeekDate = new Date(startOfFirstWeekString);
      this.formatStartOfFirstWeek = this._datePipe.transform(startOfFirstWeekDate, 'dd/MM');
      const daysTillSunday = 7 - startOfFirstWeekDate.getDay();
      const endOfFirstWeekDate = new Date(startOfFirstWeekDate);
      endOfFirstWeekDate.setDate(startOfFirstWeekDate.getDate() + daysTillSunday);
      this.formatEndOfFirstWeek = this._datePipe.transform(endOfFirstWeekDate, 'dd/MM');
    } else {
      const startOfWeekString = this._getHabitsService.dates[`Week${this.weekIndex + 1}`];
      const startOfWeekDate = new Date(startOfWeekString);
      this.formatStartOfWeek = this._datePipe.transform(startOfWeekDate, 'dd/MM');
      const endOfWeekDate = new Date(startOfWeekDate);
      endOfWeekDate.setDate(endOfWeekDate.getDate() + 7);
      this.formatEndOfWeek = this._datePipe.transform(endOfWeekDate, 'dd/MM');
    }
  }
}
