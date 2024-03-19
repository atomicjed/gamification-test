import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToAllWeeksService {
  constructor(private http: HttpClient) {
  }

  postDataToAllWeeks(userId: string, day: string, isPreviousDay: boolean, formDataForAllWeeks: any): Observable<any> {
    const url = `https://localhost:5203/api/Habits/${userId}/add-activity-to-all-weeks/${day}/${isPreviousDay}`;

    return this.http.post(url, formDataForAllWeeks);
  }
}
