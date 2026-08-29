import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

export interface AddTopicData {
  subjectId: string;
  name: string;
  description: string;
  estimatedTime: string;
  displayOrder: number;
  status: string;
}

@Component({
  selector: 'app-add-topic',
  imports: [ReactiveFormsModule],
  templateUrl: './add-topic.html',
  styleUrl: './add-topic.scss'
})
export class AddTopic {

  private readonly formBuilder = inject(FormBuilder);

  @Input({ required: true })
  set subjectId(value: string) {
    this.topicForm.controls.subjectId.setValue(value);
  }

  @Input({ required: true }) subjectName = '';

  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<AddTopicData>();

  topicForm = this.formBuilder.nonNullable.group({
    subjectId: [{ value: '', disabled: true }, Validators.required],
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    estimatedTime: ['', Validators.required],
    displayOrder: [1, [Validators.required, Validators.min(1)]],
    status: ['Draft', Validators.required]
  });

  close(): void {
    this.closed.emit();
  }

  submit(): void {
    if (this.topicForm.invalid) {
      this.topicForm.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.topicForm.getRawValue());
  }
}
