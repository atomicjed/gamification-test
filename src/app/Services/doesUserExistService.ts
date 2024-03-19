import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoesUserExistService {

  constructor(private http: HttpClient) {
  }

  doesUserExistRequest(userId: string) {
    const url = `https://localhost:5203/api/Habits/does-user-exist/${userId}`;

    return this.http.get(url);
  }
}
