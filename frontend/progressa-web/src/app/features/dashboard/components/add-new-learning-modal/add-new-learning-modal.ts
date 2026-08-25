import {
  Component,
  EventEmitter,
  Output,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-add-new-learning-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-learning-modal.html',
  styleUrl: './add-new-learning-modal.scss'
})
export class AddNewLearningModal {

  private readonly formBuilder = inject(FormBuilder);

  @Output() closed = new EventEmitter<void>();

  @Output() submitted = new EventEmitter<{
    subject: string;
    topic: string;
    subtopic: string;
    learningType: string;
    status: string;
    startDateTime: string;
    endDateTime: string;
    notes: string;
  }>();

  learningForm = this.formBuilder.nonNullable.group({
    subject: ['', Validators.required],
    topic: ['', Validators.required],
    subtopic: [''],
    learningType: ['Self Learning', Validators.required],
    status: ['Completed', Validators.required],
    startDateTime: ['', Validators.required],
    endDateTime: ['', Validators.required],
    notes: ['']
  });

  close(): void {
    this.closed.emit();
  }

  submit(): void {

    if (this.learningForm.invalid) {
      this.learningForm.markAllAsTouched();
      return;
    }

    this.submitted.emit(
      this.learningForm.getRawValue()
    );
  }
}
