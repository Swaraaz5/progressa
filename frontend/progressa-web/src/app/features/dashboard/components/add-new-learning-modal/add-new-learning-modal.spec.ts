import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewLearningModal } from './add-new-learning-modal';

describe('AddNewLearningModal', () => {
  let component: AddNewLearningModal;
  let fixture: ComponentFixture<AddNewLearningModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewLearningModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewLearningModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
