import {Component, Inject} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {DOCUMENT} from "@angular/common";


@Component({
  selector: 'app-log-out-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button class="py-4 px-6 bg-[#ff3e00] text-white rounded-lg"
              (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button class="py-6 px-8 bg-[#ff3e00] text-white rounded-lg text-[1.2rem]" (click)="auth.loginWithRedirect()">Log in
      </button>
    </ng-template>
  `,
  styleUrl: './log-out-button.component.css'
})
export class LogOutButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {
  }
}
