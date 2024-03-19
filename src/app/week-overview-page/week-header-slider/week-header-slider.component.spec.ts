import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekHeaderSliderComponent } from './week-header-slider.component';

describe('WeekHeaderSliderComponent', () => {
  let component: WeekHeaderSliderComponent;
  let fixture: ComponentFixture<WeekHeaderSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekHeaderSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekHeaderSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
