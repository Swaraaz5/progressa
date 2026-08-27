import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Subject {
  id: number;
  name: string;
  description: string;
  topics: number;
  subtopics: number;
  estimatedTime: string;
  status: 'Published' | 'Draft';
  icon: string;
  iconClass: string;
}

@Component({
  selector: 'app-subjects',
  imports: [FormsModule],
  templateUrl: './subjects.html',
  styleUrl: './subjects.scss'
})
export class Subjects {

  private readonly router = inject(Router);

  searchTerm = '';
  selectedStatus = 'All Status';

  subjects: Subject[] = [
    {
      id: 1,
      name: 'Java',
      description: 'Core Java concepts, OOP, Collections and more.',
      topics: 28,
      subtopics: 156,
      estimatedTime: '120h',
      status: 'Published',
      icon: '☕',
      iconClass: 'java'
    },
    {
      id: 2,
      name: 'Spring Boot',
      description: 'Spring Boot, REST APIs, Security and more.',
      topics: 18,
      subtopics: 92,
      estimatedTime: '85h',
      status: 'Published',
      icon: '◆',
      iconClass: 'spring'
    },
    {
      id: 3,
      name: 'Angular',
      description: 'Components, Services, RxJS and more.',
      topics: 22,
      subtopics: 134,
      estimatedTime: '110h',
      status: 'Published',
      icon: 'A',
      iconClass: 'angular'
    },
    {
      id: 4,
      name: 'AWS',
      description: 'AWS services, architecture and best practices.',
      topics: 24,
      subtopics: 210,
      estimatedTime: '160h',
      status: 'Draft',
      icon: 'AWS',
      iconClass: 'aws'
    },
    {
      id: 5,
      name: 'PostgreSQL',
      description: 'Database concepts, SQL, advanced queries.',
      topics: 16,
      subtopics: 84,
      estimatedTime: '90h',
      status: 'Published',
      icon: '🐘',
      iconClass: 'postgres'
    }
  ];

  get filteredSubjects(): Subject[] {
    return this.subjects.filter((subject) => {

      const matchesSearch =
        subject.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        this.selectedStatus === 'All Status' ||
        subject.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  openSubject(subject: Subject): void {
    this.router.navigate(['/topics', subject.id]);
  }

  addSubject(): void {
    console.log('Add Subject clicked');
  }
}
