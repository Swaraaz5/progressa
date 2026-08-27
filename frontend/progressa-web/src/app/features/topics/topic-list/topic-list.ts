import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddTopic,
  AddTopicData
} from './add-topic/add-topic';

interface Topic {
  id: number;
  name: string;
  description: string;
  subtopicCount: number;
  completedSubtopics: number;
}

@Component({
  selector: 'app-topic-list',
  imports: [AddTopic],
  templateUrl: './topic-list.html',
  styleUrl: './topic-list.scss'
})
export class TopicList {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  subjectId = '';

  subjectName = 'JavaScript';

  searchTerm = '';
  showAddTopicModal = false;

  topics: Topic[] = [
    {
      id: 1,
      name: 'JavaScript Basics',
      description: 'Variables, data types, operators and basic syntax.',
      subtopicCount: 8,
      completedSubtopics: 8
    },
    {
      id: 2,
      name: 'Functions',
      description: 'Function declarations, expressions, callbacks and scope.',
      subtopicCount: 7,
      completedSubtopics: 5
    },
    {
      id: 3,
      name: 'Arrays',
      description: 'Array methods, iteration, manipulation and destructuring.',
      subtopicCount: 10,
      completedSubtopics: 6
    },
    {
      id: 4,
      name: 'Objects',
      description: 'Objects, properties, methods and object manipulation.',
      subtopicCount: 8,
      completedSubtopics: 4
    },
    {
      id: 5,
      name: 'ES6+ Features',
      description: 'Modern JavaScript features introduced in ES6 and beyond.',
      subtopicCount: 12,
      completedSubtopics: 7
    },
    {
      id: 6,
      name: 'Asynchronous JavaScript',
      description: 'Promises, async/await, callbacks and event loop.',
      subtopicCount: 9,
      completedSubtopics: 3
    }
  ];

  constructor() {
    this.subjectId =
      this.route.snapshot.paramMap.get('subjectId') ?? '';
  }

  get filteredTopics(): Topic[] {

    const search = this.searchTerm
      .trim()
      .toLowerCase();

    if (!search) {
      return this.topics;
    }

    return this.topics.filter(topic =>
      topic.name.toLowerCase().includes(search) ||
      topic.description.toLowerCase().includes(search)
    );
  }

  onSearch(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.searchTerm = input.value;
  }

  openTopic(topic: Topic): void {

    this.router.navigate([
      '/topics',
      this.subjectId,
      topic.id
    ]);
  }

  addTopic(): void {
    this.showAddTopicModal = true;
  }

  closeAddTopic(): void {
    this.showAddTopicModal = false;
  }

  createTopic(data: AddTopicData): void {
    if (data.subjectId !== this.subjectId) {
      return;
    }

    const nextId = Math.max(...this.topics.map(topic => topic.id), 0) + 1;

    this.topics = [
      ...this.topics,
      {
        id: nextId,
        name: data.name,
        description: data.description,
        subtopicCount: 0,
        completedSubtopics: 0
      }
    ];

    this.closeAddTopic();
  }

  editTopic(topic: Topic, event: Event): void {

    event.stopPropagation();

    console.log('Edit topic:', topic);
  }

  deleteTopic(topic: Topic, event: Event): void {

    event.stopPropagation();

    console.log('Delete topic:', topic);
  }

  getCompletionPercentage(topic: Topic): number {

    if (topic.subtopicCount === 0) {
      return 0;
    }

    return Math.round(
      (topic.completedSubtopics / topic.subtopicCount) * 100
    );
  }

  goBack(): void {
    this.router.navigate(['/subjects']);
  }
}
