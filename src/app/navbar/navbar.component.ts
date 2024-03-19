import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userId: string = '';

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user && user.sub) {
        this.userId = user.sub!;
      }
    })
  }
}
