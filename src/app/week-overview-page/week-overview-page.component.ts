import {Component, OnInit} from '@angular/core';
import {DoesUserExistService} from "../Services/doesUserExistService";
import {GetUserService} from "../Services/get-user-service";
import {GetHabitsService} from "./week-overview-services/get-habits-service/get-habits.service";
import {AddNewWeekService} from "../Services/add-new-week-service";
import {WeekIndexingService} from "./week-overview-services/week-indexing-service/week-indexing.service";
import {AddStartDateToWeekService} from "../Services/add-start-date-to-week-service";
import {CreateTemplateScheduleService} from "../Services/create-template-schedule-service";
import {faFire} from "@fortawesome/free-solid-svg-icons/faFire";


interface WeekActivities {
  monday: any[];
  tuesday: any[];
  wednesday: any[];
  thursday: any[];
  friday: any[];
  saturday: any[];
}

@Component({
  selector: 'app-week-overview-page',
  templateUrl: './week-overview-page.component.html',
  styleUrl: './week-overview-page.component.css'
})
export class WeekOverviewPageComponent implements OnInit {
  faFire = faFire;

  daysOfTheWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  userId: string = '';
  weekKeys: string[] = [];
  fakeWeekKeys: string[] = [];
  currentWeek: number = 0;
  weekIndex: number = 0;
  lastWeekStartDate: string = '';
  nextWeekActivities: WeekActivities = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  };

  constructor(private _doesUserExistService: DoesUserExistService, private _getUserService: GetUserService, private _getHabitsService: GetHabitsService, private _addNewWeekService: AddNewWeekService, private _weekIndexService: WeekIndexingService, private _addStartDateService: AddStartDateToWeekService, private _createTemplateService: CreateTemplateScheduleService) {
  }

  ngOnInit() {
    this._weekIndexService.weekIndex$.subscribe(index => {
      this.weekIndex = index;
    })
    this._weekIndexService.weekKeys$.subscribe(weeks => {
      this.weekKeys = weeks;
      this.fakeWeekKeys = weeks;
    })
    this.getUserAndHabits();
  }

  async getUserAndHabits(): Promise<void> {
    await this.getUser();
    const userExists = await this._doesUserExistService.doesUserExistRequest(this.userId).toPromise();
    if (!userExists) {
      await this.createScheduleTemplate();
      await this.getHabits();
      await this.addNewWeek();
      await this.getHabits();
    } else {
      await this.getHabits().then(() => {
        this.weekIndex = this.weekKeys.length - 2;
        this._weekIndexService.setWeekIndex(this.weekIndex)
      })
    }
  }

  async getUser() {
    try {
      this.userId = await this._getUserService.getUserId();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getHabits() {
    try {
      await this._getHabitsService.fetchWeekData(this.userId);
      this.weekKeys = this._getHabitsService.weekKeys;
      this._weekIndexService.setWeekKeys(this.weekKeys);
    } catch (error) {
    }
  }

  //Adding a new week array when date is in lastWeek
  async addNewWeek() {
    const weekName = `Week${this.weekKeys.length + 1}`;
    const lastWeekStartDate = this._getHabitsService.dates[`Week${this.weekKeys.length}`]
    const lastWeekDate = new Date(lastWeekStartDate);
    const currentDate = new Date();
    if (currentDate >= lastWeekDate) {
      await this.filterForEveryWeek();
      const bodyData = this.nextWeekActivities;
      this._addNewWeekService.addNewWeek(this.userId, weekName, bodyData)
        .subscribe(
          () => {
            console.log("New week added successfully.");
            const weekName = `Week${this.weekKeys.length + 1}`;
            const newDate = new Date(lastWeekDate);
            newDate.setDate(lastWeekDate.getDate() + 7);

            const newWeekStartDate = newDate.toISOString();
            this._addStartDateService.addNewWeek(this.userId, weekName, newWeekStartDate).subscribe(() => {
              console.log("Start Date added successfully")
              this.getUserAndHabits();
            }, error => {
              console.log("Error adding start date", error)
            })
          },
          error => {
            console.log("Error adding new week:", error);
          }
        );
    } else
      console.log("Not into last week yet")
  }

  async addNewWeekPractise() {
    const weekName = `Week${this.weekKeys.length + 1}`;
    const lastWeekStartDate = this._getHabitsService.dates[`Week${this.weekKeys.length}`]
    const lastWeekDate = new Date(lastWeekStartDate);
    const currentDate = new Date();
    await this.filterForEveryWeek();
    const bodyData = this.nextWeekActivities;
    this._addNewWeekService.addNewWeek(this.userId, weekName, bodyData)
      .subscribe(
        () => {
          console.log("New week added successfully.");
          const weekName = `Week${this.weekKeys.length + 1}`;
          const newDate = new Date(lastWeekDate);
          newDate.setDate(lastWeekDate.getDate() + 7);

          const newWeekStartDate = newDate.toISOString();
          this._addStartDateService.addNewWeek(this.userId, weekName, newWeekStartDate).subscribe(() => {
            console.log("Start Date added successfully")
            this.getUserAndHabits().then(() => {
              this.weekIndex = this.weekKeys.length - 2;
              this._weekIndexService.setWeekIndex(this.weekIndex)
            })
          }, error => {
            console.log("Error adding start date", error)
          })
        },
        error => {
          console.log("Error adding new week:", error);
        }
      );
  }

//Finds habits to add to new week
  async filterForEveryWeek() {
    try {
      const data = await this._getHabitsService.fetchWeekData(this.userId);
      const daysOfWeek: (keyof WeekActivities)[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

      for (let day of daysOfWeek) {
        const lastWeekActivities = data[day][`Week${this.weekKeys.length}`];
        const everyWeekActivities = lastWeekActivities.filter((activity: any) => activity.isForEveryWeek);
        this.nextWeekActivities[day] = everyWeekActivities;
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

//Creating a new user and setting up a
  async postData(): Promise<void> {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const daysUntilNextMonday = dayOfWeek === 1 ? 7 : (1 + 7 - dayOfWeek);
    const nextMonday = new Date(currentDate);
    nextMonday.setDate(currentDate.getDate() + daysUntilNextMonday);

    try {
      const data = {
        UserId: this.userId,
        Dates: {
          Week1: currentDate,
          Week2: nextMonday
        },
        Monday: {
          Week1: [],
          Week2: []
        },
        Tuesday: {
          Week1: [],
          Week2: []
        },
        Wednesday: {
          Week1: [],
          Week2: []
        },
        Thursday: {
          Week1: [],
          Week2: []
        },
        Friday: {
          Week1: [],
          Week2: []
        },
        Saturday: {
          Week1: [],
          Week2: []
        }
      };

      await this._createTemplateService.templatePostRequest(this.userId, data).toPromise();
      const userExists = await this._doesUserExistService.doesUserExistRequest(this.userId).toPromise();
      await this.getHabits();
      console.log("User exist after posted data?", userExists)
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  async createScheduleTemplate() {
    await this.postData();
  }

}
