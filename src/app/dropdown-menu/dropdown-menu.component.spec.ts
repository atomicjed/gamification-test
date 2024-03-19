// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { DropdownMenuComponent } from './dropdown-menu.component';
//
// describe('DropdownMenuComponent', () => {
//   let component: DropdownMenuComponent;
//   let fixture: ComponentFixture<DropdownMenuComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//     declarations: [DropdownMenuComponent]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(DropdownMenuComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('2+2=4', () => {
//     expect(2+2).toBe(4);
//   })
//   it('should set selected option when option is clicked', () => {
//     const optionIndex = 0;
//     const liElement = fixture.nativeElement.querySelector('.options-list li');
//
//     //liElement.dispatchEvent(new MouseEvent('click'));
//     expect(liElement).toBeTruthy();
//     //expect(component.selectedOption).toEqual(component.options[optionIndex]);
//   })
// });
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { By } from '@angular/platform-browser';

describe('DropDown Component', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownMenuComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    component.isOpen = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get ul element', async () => {
    const options = component.options;
    const liElements = fixture.debugElement.queryAll(By.css('ul li'));

    liElements[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedOption).toEqual(options[1]);
  });
});

