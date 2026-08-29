import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

export interface RoadmapSubject {
  id: number;
  name: string;
  description: string;
  icon: string;
  iconClass: string;
  category: string;
  topicCount: number;
  subtopicCount: number;
  estimatedHours: number;
}

export interface RoadmapTopic {
  id: number;
  name: string;
  subtopicCount: number;
  estimatedHours: number;
}

export interface RoadmapSubtopic {
  id: number;
  topicId: number;
  name: string;
  estimatedMinutes: number;
}

export interface RoadmapData {
  subject: RoadmapSubject;
  topics: RoadmapTopic[];
  subtopics: RoadmapSubtopic[];
  planName: string;
  description: string;
  estimatedMinutes: number;
}

@Component({
  selector: 'app-create-roadmap',
  imports: [],
  templateUrl: './create-roadmap.html',
  styleUrl: './create-roadmap.scss'
})
export class CreateRoadmap {

  @Input() subjects: RoadmapSubject[] = [];

  @Output() closed = new EventEmitter<void>();

  @Output() next = new EventEmitter<RoadmapSubject>();

  @Output() back = new EventEmitter<void>();

  @Output() created = new EventEmitter<RoadmapData>();

  searchTerm = '';

  selectedCategory = 'All Categories';

  selectedSubjectId: number | null = null;

  selectedTopicIds = new Set<number>();

  selectedSubtopicIds = new Set<number>();

  currentStep = 1;

  planName = '';

  planDescription = '';

  categories: string[] = [
    'All Categories',
    'Programming',
    'Frontend',
    'Backend',
    'Data Structures',
    'System Design'
  ];

  topics: RoadmapTopic[] = [
    {
      id: 1,
      name: 'Java Fundamentals',
      subtopicCount: 12,
      estimatedHours: 10
    },
    {
      id: 2,
      name: 'OOP (Object Oriented Programming)',
      subtopicCount: 15,
      estimatedHours: 18
    },
    {
      id: 3,
      name: 'Collections Framework',
      subtopicCount: 10,
      estimatedHours: 12
    },
    {
      id: 4,
      name: 'Multithreading',
      subtopicCount: 8,
      estimatedHours: 10
    },
    {
      id: 5,
      name: 'Exception Handling',
      subtopicCount: 6,
      estimatedHours: 7
    },
    {
      id: 6,
      name: 'I/O and Files',
      subtopicCount: 6,
      estimatedHours: 6
    },
    {
      id: 7,
      name: 'Java 8 Features',
      subtopicCount: 9,
      estimatedHours: 9
    },
    {
      id: 8,
      name: 'Java Advanced',
      subtopicCount: 12,
      estimatedHours: 12
    }
  ];

  subtopics: RoadmapSubtopic[] = [
    {
      id: 1,
      topicId: 1,
      name: 'Introduction to Java',
      estimatedMinutes: 45
    },
    {
      id: 2,
      topicId: 1,
      name: 'Variables',
      estimatedMinutes: 45
    },
    {
      id: 3,
      topicId: 1,
      name: 'Data Types',
      estimatedMinutes: 60
    },
    {
      id: 4,
      topicId: 1,
      name: 'Type Casting',
      estimatedMinutes: 45
    },
    {
      id: 5,
      topicId: 1,
      name: 'Operators',
      estimatedMinutes: 60
    },
    {
      id: 6,
      topicId: 1,
      name: 'Control Flow',
      estimatedMinutes: 90
    },
    {
      id: 7,
      topicId: 1,
      name: 'Arrays',
      estimatedMinutes: 60
    },
    {
      id: 8,
      topicId: 1,
      name: 'Strings',
      estimatedMinutes: 60
    },

    {
      id: 9,
      topicId: 2,
      name: 'Classes and Objects',
      estimatedMinutes: 60
    },
    {
      id: 10,
      topicId: 2,
      name: 'Inheritance',
      estimatedMinutes: 75
    },
    {
      id: 11,
      topicId: 2,
      name: 'Polymorphism',
      estimatedMinutes: 60
    },
    {
      id: 12,
      topicId: 2,
      name: 'Abstraction',
      estimatedMinutes: 60
    },
    {
      id: 13,
      topicId: 2,
      name: 'Encapsulation',
      estimatedMinutes: 45
    }
  ];

  get filteredSubjects(): RoadmapSubject[] {

    const search = this.searchTerm
      .trim()
      .toLowerCase();

    return this.subjects.filter(subject => {

      const matchesSearch =
        !search ||
        subject.name.toLowerCase().includes(search) ||
        subject.description.toLowerCase().includes(search);

      const matchesCategory =
        this.selectedCategory === 'All Categories' ||
        subject.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  get filteredTopics(): RoadmapTopic[] {

    const search = this.searchTerm
      .trim()
      .toLowerCase();

    if (!search) {
      return this.topics;
    }

    return this.topics.filter(topic =>
      topic.name.toLowerCase().includes(search)
    );
  }

  get selectedSubject(): RoadmapSubject | undefined {

    return this.subjects.find(
      subject => subject.id === this.selectedSubjectId
    );
  }

  get selectedTopicCount(): number {
    return this.selectedTopicIds.size;
  }

  get selectedSubtopicCount(): number {
    return this.selectedSubtopicIds.size;
  }

  get selectedTopics(): RoadmapTopic[] {

    return this.topics.filter(topic =>
      this.selectedTopicIds.has(topic.id)
    );
  }

  /*
   * All subtopics belonging to all selected topics.
   */
  get filteredSubtopics(): RoadmapSubtopic[] {

    const search = this.searchTerm
      .trim()
      .toLowerCase();

    return this.subtopics.filter(subtopic => {

      const belongsToSelectedTopic =
        this.selectedTopicIds.has(subtopic.topicId);

      const matchesSearch =
        !search ||
        subtopic.name.toLowerCase().includes(search);

      return belongsToSelectedTopic && matchesSearch;
    });
  }

  /*
   * All selected subtopics for the final summary.
   */
  get selectedSubtopics(): RoadmapSubtopic[] {

    return this.subtopics.filter(subtopic =>
      this.selectedSubtopicIds.has(subtopic.id)
    );
  }

  /*
   * Total estimated learning time from selected subtopics.
   */
  get totalEstimatedMinutes(): number {

    return this.selectedSubtopics.reduce(
      (total, subtopic) =>
        total + subtopic.estimatedMinutes,
      0
    );
  }

  get totalEstimatedTime(): string {

    return this.formatEstimatedTime(
      this.totalEstimatedMinutes
    );
  }

  get defaultPlanName(): string {

    if (!this.selectedTopics.length) {
      return 'My Learning Plan';
    }

    return `${this.selectedTopics[0].name} Plan`;
  }

  onSearch(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.searchTerm = input.value;
  }

  onCategoryChange(event: Event): void {

    const select = event.target as HTMLSelectElement;

    this.selectedCategory = select.value;
  }

  selectSubject(subject: RoadmapSubject): void {

    this.selectedSubjectId = subject.id;

    this.selectedTopicIds.clear();

    this.selectedSubtopicIds.clear();

    this.planName = '';
    this.planDescription = '';
  }

  isSelected(subject: RoadmapSubject): boolean {

    return this.selectedSubjectId === subject.id;
  }

  toggleTopic(topic: RoadmapTopic): void {

    if (this.selectedTopicIds.has(topic.id)) {

      this.selectedTopicIds.delete(topic.id);

      /*
       * Remove subtopics belonging to the deselected topic.
       */
      const topicSubtopicIds = this.subtopics
        .filter(subtopic => subtopic.topicId === topic.id)
        .map(subtopic => subtopic.id);

      topicSubtopicIds.forEach(id =>
        this.selectedSubtopicIds.delete(id)
      );

    } else {

      this.selectedTopicIds.add(topic.id);
    }
  }

  isTopicSelected(topic: RoadmapTopic): boolean {

    return this.selectedTopicIds.has(topic.id);
  }

  toggleSubtopic(subtopic: RoadmapSubtopic): void {

    if (this.selectedSubtopicIds.has(subtopic.id)) {

      this.selectedSubtopicIds.delete(subtopic.id);

    } else {

      this.selectedSubtopicIds.add(subtopic.id);
    }
  }

  isSubtopicSelected(
    subtopic: RoadmapSubtopic
  ): boolean {

    return this.selectedSubtopicIds.has(
      subtopic.id
    );
  }

  goToTopics(): void {

    if (this.selectedSubjectId === null) {
      return;
    }

    this.currentStep = 2;

    this.searchTerm = '';

    this.next.emit(
      this.selectedSubject as RoadmapSubject
    );
  }

  goToSubtopics(): void {

    if (this.selectedTopicIds.size === 0) {
      return;
    }

    this.currentStep = 3;

    this.searchTerm = '';
  }

  goToSummary(): void {

    if (this.selectedSubtopicIds.size === 0) {
      return;
    }

    this.currentStep = 4;

    this.searchTerm = '';

    if (!this.planName) {
      this.planName = this.defaultPlanName;
    }
  }

  goBack(): void {

    if (this.currentStep === 4) {

      this.currentStep = 3;
      this.searchTerm = '';

      return;
    }

    if (this.currentStep === 3) {

      this.currentStep = 2;
      this.searchTerm = '';

      return;
    }

    if (this.currentStep === 2) {

      this.currentStep = 1;
      this.searchTerm = '';

      return;
    }

    this.back.emit();
  }

  onPlanNameChange(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.planName = input.value;
  }

  onPlanDescriptionChange(event: Event): void {

    const textarea = event.target as HTMLTextAreaElement;

    this.planDescription = textarea.value;
  }

  createRoadmap(): void {

    if (
      !this.selectedSubject ||
      !this.planName.trim() ||
      this.selectedSubtopicIds.size === 0
    ) {
      return;
    }

    const roadmap: RoadmapData = {
      subject: this.selectedSubject,
      topics: this.selectedTopics,
      subtopics: this.selectedSubtopics,
      planName: this.planName.trim(),
      description: this.planDescription.trim(),
      estimatedMinutes: this.totalEstimatedMinutes
    };

    this.created.emit(roadmap);
  }

  close(): void {
    this.closed.emit();
  }

  formatEstimatedTime(minutes: number): string {

    if (minutes < 60) {
      return `${minutes}m`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes}m`;
  }
}
