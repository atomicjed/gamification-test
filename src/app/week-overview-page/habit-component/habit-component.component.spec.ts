import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitComponentComponent } from './habit-component.component';

describe('HabitComponentComponent', () => {
  let component: HabitComponentComponent;
  let fixture: ComponentFixture<HabitComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
