import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusModal } from './update-status-modal';

describe('HabitDialogComponent', () => {
  let component: UpdateStatusModal;
  let fixture: ComponentFixture<UpdateStatusModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStatusModal]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStatusModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
