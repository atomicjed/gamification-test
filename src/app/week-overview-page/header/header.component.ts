import {Component, OnInit} from '@angular/core';
import {GetUserService} from "../../Services/get-user-service";
import {User} from "@auth0/auth0-angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  userName: string | undefined = '';
  firstName: string | undefined = '';
constructor(private _getUserService: GetUserService) {
}
ngOnInit() {
  this.getUser();
}

  async getUser() {
    try {
      this.userName = await this._getUserService.getUserName();
      const splitName = this.userName.split(' ');

      // Get the first name (if available)
      this.firstName = splitName.length > 0 ? splitName[0] : '';
    } catch (error) {
      console.error("Error:", error);
    }
  }

  protected readonly User = User;
}
