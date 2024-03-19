import { NgModule } from '@angular/core';
import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LogOutButtonComponent} from "./navbar/log-out-button/log-out-button.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogModule} from "@angular/material/dialog";
import {CreateHabitModal} from "./modals/create-habit-modal";
import {MatButtonModule} from "@angular/material/button";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {LogInPageComponent} from "./log-in-page/log-in-page.component";
import {UpdateStatusModal} from "./modals/update-status-modal/update-status-modal";
import {DropdownMenuComponent} from "./dropdown-menu/dropdown-menu.component";
import {DatePipe} from "@angular/common";
import {WeekOverviewPageComponent} from "./week-overview-page/week-overview-page.component";
import {WeekHeaderSliderComponent} from "./week-overview-page/week-header-slider/week-header-slider.component";
import {DayCardComponent} from "./week-overview-page/day-card/day-card.component";
import {CreateHabitButtonComponent} from "./week-overview-page/create-habit-button/create-habit-button.component";
import {HabitComponentComponent} from "./week-overview-page/habit-component/habit-component.component";
import {HeaderComponent} from "./week-overview-page/header/header.component";

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LogOutButtonComponent,
        CreateHabitModal,
        LogInPageComponent,
        UpdateStatusModal,
        DropdownMenuComponent,
        WeekOverviewPageComponent,
        WeekHeaderSliderComponent,
        DayCardComponent,
        CreateHabitButtonComponent,
        HabitComponentComponent,
        HeaderComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    AuthModule.forRoot({
      domain: 'dev-48g61kzgfmzsou0c.us.auth0.com',
      clientId: 'tGLyoj5CMNYCv3JXH7HJiOHnDK79DdqZ',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-48g61kzgfmzsou0c.us.auth0.com/api/v2/',
        scope: 'openid profile email'
      },
      httpInterceptor: {
        allowedList: [
          '*'
        ]
      }
    }),
    FontAwesomeModule,
  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
        provideAnimationsAsync(),
        DatePipe,
    ],
    exports: [
        LogOutButtonComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
