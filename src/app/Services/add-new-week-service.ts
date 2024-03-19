import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

interface WeekActivities {
  monday: any[];
  tuesday: any[];
  wednesday: any[];
  thursday: any[];
  friday: any[];
  saturday: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AddNewWeekService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  addNewWeek(userId: string, weekName: string, bodyData: WeekActivities) {
    const url = `https://localhost:5203/api/Habits/${userId}/${weekName}/add-week`;
    const body = JSON.stringify(bodyData);
    return this.http.put(url, body, this.httpOptions).pipe(
      catchError(error => {
        console.log("Error adding new week:", error);
        return throwError(error);
      })
    );
  }
}
