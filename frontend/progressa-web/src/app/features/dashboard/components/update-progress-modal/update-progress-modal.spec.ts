import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProgressModal } from './update-progress-modal';

describe('UpdateProgressModal', () => {
  let component: UpdateProgressModal;
  let fixture: ComponentFixture<UpdateProgressModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProgressModal],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateProgressModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
