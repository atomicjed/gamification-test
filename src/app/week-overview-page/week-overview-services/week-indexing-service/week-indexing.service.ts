import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeekIndexingService {
  private _weekKeysSubject = new BehaviorSubject<string[]>([]);
  weekKeys$ = this._weekKeysSubject.asObservable();
  private _weekIndexSubject = new BehaviorSubject<number>(0);
  weekIndex$ = this._weekIndexSubject.asObservable();

  constructor() {
  }

  setWeekKeys(weekKeys: string[]) {
    this._weekKeysSubject.next(weekKeys);
  }

  setWeekIndex(index: number) {
    this._weekIndexSubject.next(index);
  }

}
