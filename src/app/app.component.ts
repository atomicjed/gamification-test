import {Component, OnInit} from '@angular/core';
import {GetUserService} from "./Services/get-user-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'gamification-project';

  userExists: boolean = false;

  constructor(private getUserService: GetUserService) {
  }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    try {
      const userId = await this.getUserService.getUserId();
      if (userId)
        this.userExists = true;
    } catch (error) {
      this.userExists = false;
    }
  }
}
