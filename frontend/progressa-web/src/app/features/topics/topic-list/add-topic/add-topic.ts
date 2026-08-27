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
}

@Component({
  selector: 'app-add-topic',
  imports: [ReactiveFormsModule],
  templateUrl: './add-topic.html',
  styleUrl: './add-topic.scss'
})
export class AddTopic {

  private readonly formBuilder = inject(FormBuilder);

  @Input({ required: true }) subjectId = '';
  @Input({ required: true }) subjectName = '';

  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<AddTopicData>();

  topicForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
  });

  close(): void {
    this.closed.emit();
  }

  submit(): void {
    if (this.topicForm.invalid) {
      this.topicForm.markAllAsTouched();
      return;
    }

    this.submitted.emit({
      subjectId: this.subjectId,
      ...this.topicForm.getRawValue()
    });
  }
}
