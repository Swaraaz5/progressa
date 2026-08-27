import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Subtopic {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-subtopic-list',
  imports: [],
  templateUrl: './subtopic-list.html',
  styleUrl: './subtopic-list.scss'
})
export class SubtopicList {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  subjectId = '';
  topicId = '';

  subjectName = 'JavaScript';
  topicName = 'JavaScript Basics';

  searchTerm = '';

  subtopics: Subtopic[] = [
    {
      id: 1,
      name: 'Variables',
      description: 'var, let, const and variable declarations.',
      completed: true
    },
    {
      id: 2,
      name: 'Data Types',
      description: 'Primitive and reference data types in JavaScript.',
      completed: true
    },
    {
      id: 3,
      name: 'Operators',
      description: 'Arithmetic, comparison, logical and assignment operators.',
      completed: true
    },
    {
      id: 4,
      name: 'Conditional Statements',
      description: 'if, else, else-if and switch statements.',
      completed: true
    },
    {
      id: 5,
      name: 'Loops',
      description: 'for, while, do-while and loop control statements.',
      completed: false
    },
    {
      id: 6,
      name: 'Template Literals',
      description: 'Using template strings and interpolation.',
      completed: false
    },
    {
      id: 7,
      name: 'Destructuring',
      description: 'Array and object destructuring techniques.',
      completed: false
    },
    {
      id: 8,
      name: 'Spread and Rest',
      description: 'Using spread and rest syntax with arrays and objects.',
      completed: false
    }
  ];

  constructor() {
    this.subjectId =
      this.route.snapshot.paramMap.get('subjectId') ?? '';

    this.topicId =
      this.route.snapshot.paramMap.get('topicId') ?? '';
  }

  get filteredSubtopics(): Subtopic[] {
    const search = this.searchTerm.trim().toLowerCase();

    if (!search) {
      return this.subtopics;
    }

    return this.subtopics.filter(subtopic =>
      subtopic.name.toLowerCase().includes(search) ||
      subtopic.description.toLowerCase().includes(search)
    );
  }

  get completedCount(): number {
    return this.subtopics.filter(
      subtopic => subtopic.completed
    ).length;
  }

  get completionPercentage(): number {
    if (this.subtopics.length === 0) {
      return 0;
    }

    return Math.round(
      (this.completedCount / this.subtopics.length) * 100
    );
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  toggleCompleted(
    subtopic: Subtopic,
    event: Event
  ): void {
    event.stopPropagation();
    subtopic.completed = !subtopic.completed;
  }

  addSubtopic(): void {
    console.log('Add subtopic clicked');
  }

  editSubtopic(
    subtopic: Subtopic,
    event: Event
  ): void {
    event.stopPropagation();
    console.log('Edit subtopic:', subtopic);
  }

  deleteSubtopic(
    subtopic: Subtopic,
    event: Event
  ): void {
    event.stopPropagation();
    console.log('Delete subtopic:', subtopic);
  }

  goToSubjects(): void {
    this.router.navigate(['/topics']);
  }

  goToTopics(): void {
    this.router.navigate([
      '/topics',
      this.subjectId
    ]);
  }
}
