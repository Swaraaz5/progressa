import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-topic',
  imports: [ReactiveFormsModule],
  templateUrl: './add-topic.html',
  styleUrl: './add-topic.scss'
})
export class AddTopic {

  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  subjectId = this.route.snapshot.paramMap.get('subjectId') ?? '';

  isSubmitting = false;

  topicForm = this.formBuilder.nonNullable.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    description: ['', [
      Validators.required,
      Validators.minLength(10)
    ]]
  });

  onSubmit(): void {

    if (this.topicForm.invalid) {
      this.topicForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const topic = {
      subjectId: this.subjectId,
      ...this.topicForm.getRawValue()
    };

    console.log('Topic:', topic);

    setTimeout(() => {

      this.isSubmitting = false;

      this.router.navigate([
        '/subjects',
        this.subjectId
      ]);

    }, 500);
  }

  cancel(): void {
    this.router.navigate([
      '/subjects',
      this.subjectId
    ]);
  }
}
