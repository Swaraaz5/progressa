import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  AddSubject,
  AddSubjectData
} from './add-subject/add-subject';

interface Subject {
  id: number;
  name: string;
  description: string;
  topicCount: number;
  completedTopics: number;
  colorClass: string;
}

@Component({
  selector: 'app-subjects',
  imports: [AddSubject],
  templateUrl: './subjects.html',
  styleUrl: './subjects.scss'
})
export class Subjects {

  private readonly router = inject(Router);

  searchTerm = signal('');
  showAddSubjectModal = false;

  subjects = signal<Subject[]>([
    {
      id: 1,
      name: 'JavaScript',
      description: 'Learn JavaScript fundamentals, ES6+, and modern development.',
      topicCount: 20,
      completedTopics: 15,
      colorClass: 'javascript'
    },
    {
      id: 2,
      name: 'React',
      description: 'Build modern user interfaces with React and its ecosystem.',
      topicCount: 18,
      completedTopics: 6,
      colorClass: 'react'
    },
    {
      id: 3,
      name: 'Java',
      description: 'Master Java programming, OOP, collections, and more.',
      topicCount: 25,
      completedTopics: 10,
      colorClass: 'java'
    },
    {
      id: 4,
      name: 'Data Structures & Algorithms',
      description: 'Strengthen problem solving with DSA concepts and patterns.',
      topicCount: 30,
      completedTopics: 18,
      colorClass: 'dsa'
    },
    {
      id: 5,
      name: 'System Design',
      description: 'Learn scalable architecture and distributed systems.',
      topicCount: 20,
      completedTopics: 8,
      colorClass: 'system-design'
    },
    {
      id: 6,
      name: 'CSS',
      description: 'Master layouts, responsive design, animations, and styling.',
      topicCount: 16,
      completedTopics: 12,
      colorClass: 'css'
    }
  ]);

  filteredSubjects = computed(() => {

    const search = this.searchTerm()
      .trim()
      .toLowerCase();

    if (!search) {
      return this.subjects();
    }

    return this.subjects().filter(subject =>
      subject.name.toLowerCase().includes(search) ||
      subject.description.toLowerCase().includes(search)
    );
  });

  onSearch(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.searchTerm.set(input.value);
  }

  openSubject(subject: Subject): void {

    this.router.navigate([
      '/subjects',
      subject.id
    ]);
  }

  addSubject(): void {
    this.showAddSubjectModal = true;
  }

  closeAddSubject(): void {
    this.showAddSubjectModal = false;
  }

  createSubject(data: AddSubjectData): void {
    const nextId = Math.max(...this.subjects().map(subject => subject.id), 0) + 1;

    this.subjects.update(subjects => [
      ...subjects,
      {
        id: nextId,
        name: data.name,
        description: data.description || 'No description added yet.',
        topicCount: 0,
        completedTopics: 0,
        colorClass: this.getColorClass(data.icon)
      }
    ]);

    this.closeAddSubject();
  }

  private getColorClass(icon: string): string {
    if (icon === 'design') {
      return 'system-design';
    }

    if (icon === 'book') {
      return 'dsa';
    }

    return 'javascript';
  }

  editSubject(subject: Subject, event: Event): void {

    event.stopPropagation();

    console.log('Edit subject:', subject);
  }

  deleteSubject(subject: Subject, event: Event): void {

    event.stopPropagation();

    console.log('Delete subject:', subject);
  }

  getCompletionPercentage(subject: Subject): number {

    if (subject.topicCount === 0) {
      return 0;
    }

    return Math.round(
      (subject.completedTopics / subject.topicCount) * 100
    );
  }
}
