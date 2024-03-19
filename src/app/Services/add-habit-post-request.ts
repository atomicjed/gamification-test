import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddHabitPostRequestService {
  constructor(private http: HttpClient) {
  }

  postData(userId: string, day: string, weekName: string, formData: any): Observable<any> {
    const url = `https://localhost:5203/api/Habits/${userId}/add-activity/${day}/${weekName}`;

    return this.http.post(url, formData);
  }
}
