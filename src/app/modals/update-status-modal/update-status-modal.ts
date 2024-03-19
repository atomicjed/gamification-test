import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UpdateCompletedStatusService} from "../../Services/update-completed-status";

interface ModalData {
  day: string;
  activityName: string;
  userId: string;
  weekKeys: string[]
}

@Component({
  selector: 'app-habit-dialog',
  templateUrl: './update-status-modal.html',
  styleUrls: ['./update-status-modal.css']
})
export class UpdateStatusModal {
  userId: string = '';
  dayOfWeek: string = '';
  activityName: string = '';
  weekName: string = '';
  completedValue: boolean = false;

  constructor(private updateCompletedStatusService: UpdateCompletedStatusService, public dialogRef: MatDialogRef<UpdateStatusModal>, @Inject(MAT_DIALOG_DATA) public data: ModalData) {
  }

  handleOptionSelected(selectedOption: any) {
    this.completedValue = selectedOption.isCompleted;
  }

  onSubmit() {
    this.userId = this.data.userId;
    this.dayOfWeek = this.data.day;
    this.activityName = this.data.activityName;
    this.weekName = `Week${this.data.weekKeys.length - 1}`;

    this.updateCompletedStatusService.sendPutRequest(this.userId, this.dayOfWeek, this.weekName, this.activityName, this.completedValue).subscribe(
      (response) => {
        console.log('PUT request successful');
        this.dialogRef.close();
      }, (error) => {
        console.log('Error sending PUT request:', error);
      }
    )
  }

  close() {
    this.dialogRef.close();
  }
}
