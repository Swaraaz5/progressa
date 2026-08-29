import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  CreateRoadmap,
  RoadmapSubject
} from './create-roadmap/create-roadmap';

interface EnrolledSubject {
  id: number;
  name: string;
  description: string;
  icon: string;
  iconClass: string;
  completedTopics: number;
  totalTopics: number;
}

@Component({
  selector: 'app-roadmap',
  imports: [CreateRoadmap],
  templateUrl: './roadmap.html',
  styleUrl: './roadmap.scss'
})
export class Roadmap {

  private readonly router = inject(Router);

showCreateRoadmapModal = false;

roadmapSubjects: RoadmapSubject[] = [
  {
    id: 1,
    name: 'JavaScript',
    description: 'Learn JavaScript fundamentals, ES6+, and modern development.',
    icon: 'JS',
    iconClass: 'javascript',
    category: 'Programming',
    topicCount: 20,
    subtopicCount: 156,
    estimatedHours: 120
  },
  {
    id: 2,
    name: 'React',
    description: 'Build modern user interfaces with React and its ecosystem.',
    icon: '⚛',
    iconClass: 'react',
    category: 'Frontend',
    topicCount: 18,
    subtopicCount: 92,
    estimatedHours: 85
  },
  {
    id: 3,
    name: 'Java',
    description: 'Master Java programming, OOP, collections, and more.',
    icon: '☕',
    iconClass: 'java',
    category: 'Programming',
    topicCount: 25,
    subtopicCount: 110,
    estimatedHours: 100
  },
  {
    id: 4,
    name: 'Data Structures & Algorithms',
    description: 'Strengthen problem solving with DSA concepts and patterns.',
    icon: 'DSA',
    iconClass: 'dsa',
    category: 'Data Structures',
    topicCount: 30,
    subtopicCount: 210,
    estimatedHours: 160
  },
  {
    id: 5,
    name: 'System Design',
    description: 'Learn scalable architecture and distributed systems.',
    icon: 'SD',
    iconClass: 'system-design',
    category: 'System Design',
    topicCount: 20,
    subtopicCount: 84,
    estimatedHours: 90
  }
];

  enrolledSubjects: EnrolledSubject[] = [
    {
      id: 1,
      name: 'JavaScript',
      description: 'Modern JavaScript development',
      icon: 'JS',
      iconClass: 'javascript',
      completedTopics: 15,
      totalTopics: 20
    },
    {
      id: 2,
      name: 'React',
      description: 'React fundamentals and ecosystem',
      icon: '⚛',
      iconClass: 'react',
      completedTopics: 8,
      totalTopics: 20
    },
    {
      id: 3,
      name: 'Java',
      description: 'Master Java programming and OOP concepts',
      icon: '☕',
      iconClass: 'java',
      completedTopics: 8,
      totalTopics: 25
    },
    {
      id: 4,
      name: 'Data Structures & Algorithms',
      description: 'Problem solving and algorithmic thinking',
      icon: 'DSA',
      iconClass: 'dsa',
      completedTopics: 16,
      totalTopics: 30
    }
  ];

  getCompletionPercentage(subject: EnrolledSubject): number {
    if (subject.totalTopics === 0) {
      return 0;
    }

    return Math.round(
      (subject.completedTopics / subject.totalTopics) * 100
    );
  }

  createRoadmap(): void {
    console.log('Create Roadmap clicked');
    this.showCreateRoadmapModal = true;

    // Creation flow will be connected next.
    // this.router.navigate(['/roadmap/create']);
  }

  viewRoadmap(subject: EnrolledSubject): void {
    console.log('View roadmap:', subject);

    // Roadmap detail page will be connected later.
    // this.router.navigate(['/roadmap', subject.id]);
  }

  closeCreateRoadmap(): void {
    this.showCreateRoadmapModal = false;
  }

  selectRoadmapSubject(subject: RoadmapSubject): void {
    console.log('Selected roadmap subject:', subject);

    // Step 2 will be connected here.
  }
}
