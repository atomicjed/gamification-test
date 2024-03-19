import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UpdateCompletedStatusService {
  constructor(private http: HttpClient) {
  }

  sendPutRequest(userId: string, dayOfWeek: string, weekName: string, activityName: string, completedValue: boolean) {
    const url = `https://localhost:5203/api/Habits/${userId}/${dayOfWeek}/${weekName}/update-status/${activityName}/${completedValue}`;

    return this.http.put(url, null);
  }
}
