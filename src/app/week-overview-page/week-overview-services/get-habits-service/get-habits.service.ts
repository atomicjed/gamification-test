import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GetRequestService} from "../../../Services/get-request-service";

interface WeekDates {
  [key: string]: string;
}

interface Habit {
  activityName: string;
  completed: boolean;
  isForEveryWeek: boolean;
}

interface WeekHabits {
  [week: string]: Habit[];
}

@Injectable({
  providedIn: 'root'
})
export class GetHabitsService {
  mondayHabitsSubject = new BehaviorSubject<WeekHabits>({});
  tuesdayHabitsSubject = new BehaviorSubject<WeekHabits>({});
  wednesdayHabitsSubject = new BehaviorSubject<WeekHabits>({});
  thursdayHabitsSubject = new BehaviorSubject<WeekHabits>({});
  fridayHabitsSubject = new BehaviorSubject<WeekHabits>({});
  saturdayHabitsSubject = new BehaviorSubject<WeekHabits>({});
  weekKeys: string[] = [];
  dates: WeekDates = {};

  constructor(private _getRequestService: GetRequestService,) {
  }

  async fetchWeekData(userId: string) {
    const data = await this._getRequestService.getRequest(userId).toPromise();
    this._updateHabitsData(data);
    return data;
  }


  private _updateHabitsData(data: any): void {
    this.weekKeys = Object.keys(data.monday);
    this.dates = data.dates;
    this.mondayHabitsSubject.next(data.monday);
    this.tuesdayHabitsSubject.next(data.tuesday);
    this.wednesdayHabitsSubject.next(data.wednesday);
    this.thursdayHabitsSubject.next(data.thursday);
    this.fridayHabitsSubject.next(data.friday);
    this.saturdayHabitsSubject.next(data.saturday);
  }
}
