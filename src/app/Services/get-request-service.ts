import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetRequestService {
  constructor(private http: HttpClient) {
  }

  getRequest(userId: string): Observable<any> {
    const url = `https://localhost:5203/api/Habits/${userId}`;
    return this.http.get(url);
  }
}
