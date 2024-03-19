import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateTemplateScheduleService {

  constructor(private http: HttpClient) {
  }

  templatePostRequest(userId: string, data: any): Observable<any> {
    const url = `https://localhost:5203/api/Habits/create-template/${userId}`;

    return this.http.post(url, data);
  }
}
