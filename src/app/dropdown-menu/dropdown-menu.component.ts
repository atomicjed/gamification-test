import {Component, EventEmitter, Output} from '@angular/core';
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons/faCircleXmark";

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css'
})
export class DropdownMenuComponent {
  @Output() optionSelected = new EventEmitter<any>();

  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;

  isOpen: boolean = false;
  options = [
    {name: 'Not Completed', isCompleted: false, isFuture: true, value: 'false'},
    {name: 'Completed!', isCompleted: true, isFuture: false, value: 'true'},
    {name: 'Skipped', isCompleted: false, isFuture: false, value: 'false'},
  ]
  selectedOption: any = this.options[0];

  constructor() {
  }


  onOpen() {
    this.isOpen = !this.isOpen;
    this.optionSelected.emit(this.selectedOption);
  }
}
