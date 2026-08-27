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

export interface AddSubjectData {
  name: string;
  description: string;
  icon: string;
  category: string;
  status: string;
}

@Component({
  selector: 'app-add-subject',
  imports: [ReactiveFormsModule],
  templateUrl: './add-subject.html',
  styleUrl: './add-subject.scss'
})
export class AddSubject {

  private readonly formBuilder = inject(FormBuilder);

  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<AddSubjectData>();

  subjectForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', Validators.maxLength(500)],
    icon: ['', Validators.required],
    category: [''],
    status: ['Draft', Validators.required]
  });

  close(): void {
    this.closed.emit();
  }

  submit(): void {
    if (this.subjectForm.invalid) {
      this.subjectForm.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.subjectForm.getRawValue());
  }
}
