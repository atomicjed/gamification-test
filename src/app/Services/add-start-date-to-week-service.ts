import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddStartDateToWeekService {
  constructor(private http: HttpClient) {
  }

  addNewWeek(userId: string, weekName: string, startDate: string) {
    const url = `https://localhost:5203/api/Habits/${userId}/${weekName}/add-to-start-dates/${startDate}`;
    return this.http.put(url, null);
  }
}
