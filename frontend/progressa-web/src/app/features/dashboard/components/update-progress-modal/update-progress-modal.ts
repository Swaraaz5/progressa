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
  selector: 'app-update-progress-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-progress-modal.html',
  styleUrl: './update-progress-modal.scss'
})
export class UpdateProgressModal {

  private readonly formBuilder = inject(FormBuilder);

  @Output() closed = new EventEmitter<void>();

  @Output() submitted = new EventEmitter<{
    subject: string;
    topic: string;
    subtopic: string;
    status: string;
    startDateTime: string;
    endDateTime: string;
    notes: string;
  }>();

  progressForm = this.formBuilder.nonNullable.group({
    subject: ['', Validators.required],
    topic: ['', Validators.required],
    subtopic: ['', Validators.required],
    status: ['Completed', Validators.required],
    startDateTime: ['', Validators.required],
    endDateTime: ['', Validators.required],
    notes: ['']
  });

  close(): void {
    this.closed.emit();
  }

  submit(): void {

    if (this.progressForm.invalid) {

      this.progressForm.markAllAsTouched();

      return;
    }

    this.submitted.emit(
      this.progressForm.getRawValue()
    );
  }
}
