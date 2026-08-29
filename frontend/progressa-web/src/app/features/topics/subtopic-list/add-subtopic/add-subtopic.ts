import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  numberAttribute
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

export interface AddSubtopicData {
  subjectId: number;
  topicId: number;
  name: string;
  description: string;
  estimatedTime: string;
  displayOrder: number;
  status: 'Draft' | 'Published';
}

@Component({
  selector: 'app-add-subtopic',
  imports: [ReactiveFormsModule],
  templateUrl: './add-subtopic.html',
  styleUrl: './add-subtopic.scss'
})
export class AddSubtopic {

  private readonly formBuilder = inject(FormBuilder);

  @Input({ transform: numberAttribute })
  subjectId = 0;

  @Input()
  subjectName = '';

  @Input({ transform: numberAttribute })
  topicId = 0;

  @Input()
  topicName = '';

  @Output()
  closed = new EventEmitter<void>();

  @Output()
  submitted = new EventEmitter<AddSubtopicData>();

  subtopicForm = this.formBuilder.nonNullable.group({

    subject: [
      {
        value: '',
        disabled: true
      }
    ],

    topic: [
      {
        value: '',
        disabled: true
      }
    ],

    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    description: [
      '',
      [
        Validators.maxLength(500)
      ]
    ],

    estimatedTime: [
      '',
      [
        Validators.required
      ]
    ],

    displayOrder: [
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    status: [
      'Draft' as 'Draft' | 'Published',
      [
        Validators.required
      ]
    ]

  });

  ngOnInit(): void {

    this.subtopicForm.controls.subject.setValue(
      this.subjectName
    );

    this.subtopicForm.controls.topic.setValue(
      this.topicName
    );

  }

  close(): void {
    this.closed.emit();
  }

  submit(): void {

    if (this.subtopicForm.invalid) {

      this.subtopicForm.markAllAsTouched();

      return;
    }

    const formValue =
      this.subtopicForm.getRawValue();

    const data: AddSubtopicData = {

      subjectId: this.subjectId,

      topicId: this.topicId,

      name: formValue.name,

      description: formValue.description,

      estimatedTime: formValue.estimatedTime,

      displayOrder: formValue.displayOrder,

      status: formValue.status

    };

    this.submitted.emit(data);
  }
}
