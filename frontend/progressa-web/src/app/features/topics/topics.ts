import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Subtopic {
  id: number;
  name: string;
  estimatedTime: string;
  order: number;
  status: 'Published' | 'Draft';
}

interface Topic {
  id: number;
  name: string;
  description: string;
  subtopics: Subtopic[];
  estimatedTime: string;
  order: number;
  status: 'Published' | 'Draft';
}

interface Subject {
  id: number;
  name: string;
  description: string;
  topics: Topic[];
  icon: string;
  iconClass: string;
  status: 'Published' | 'Draft';
}

@Component({
  selector: 'app-topics',
  imports: [RouterOutlet],
  templateUrl: './topics.html',
  styleUrl: './topics.scss'
})
export class Topics {

  selectedSubjectId = 1;

  selectedTopicId = 1;

  showSubjectForm = true;

  showTopicForm = true;

  showSubtopicForm = true;


  subjects: Subject[] = [

    {
      id: 1,
      name: 'Java',
      description: 'Core Java concepts, OOP, Collections and more.',
      icon: '☕',
      iconClass: 'java',
      status: 'Published',

      topics: [

        {
          id: 1,
          name: 'Java Fundamentals',
          description: 'Basic building blocks of Java programming.',
          estimatedTime: '10h',
          order: 1,
          status: 'Published',

          subtopics: [
            {
              id: 1,
              name: 'Introduction to Java',
              estimatedTime: '45m',
              order: 1,
              status: 'Published'
            },
            {
              id: 2,
              name: 'Variables',
              estimatedTime: '45m',
              order: 2,
              status: 'Published'
            },
            {
              id: 3,
              name: 'Data Types',
              estimatedTime: '1h',
              order: 3,
              status: 'Published'
            },
            {
              id: 4,
              name: 'Type Casting',
              estimatedTime: '45m',
              order: 4,
              status: 'Published'
            },
            {
              id: 5,
              name: 'Operators',
              estimatedTime: '1h',
              order: 5,
              status: 'Published'
            },
            {
              id: 6,
              name: 'Control Flow',
              estimatedTime: '1h 30m',
              order: 6,
              status: 'Published'
            }
          ]
        },

        {
          id: 2,
          name: 'OOP (Object Oriented Programming)',
          description: 'Object-oriented programming concepts.',
          estimatedTime: '18h',
          order: 2,
          status: 'Published',
          subtopics: []
        },

        {
          id: 3,
          name: 'Collections Framework',
          description: 'Java collections and data structures.',
          estimatedTime: '12h',
          order: 3,
          status: 'Published',
          subtopics: []
        },

        {
          id: 4,
          name: 'Multithreading',
          description: 'Threads, concurrency and synchronization.',
          estimatedTime: '10h',
          order: 4,
          status: 'Published',
          subtopics: []
        },

        {
          id: 5,
          name: 'Exception Handling',
          description: 'Handling exceptions in Java.',
          estimatedTime: '7h',
          order: 5,
          status: 'Published',
          subtopics: []
        }

      ]
    },


    {
      id: 2,
      name: 'Spring Boot',
      description: 'Spring Boot, REST APIs, Security and more.',
      icon: '◆',
      iconClass: 'spring',
      status: 'Published',
      topics: []
    },


    {
      id: 3,
      name: 'Angular',
      description: 'Components, Services, RxJS and more.',
      icon: 'A',
      iconClass: 'angular',
      status: 'Published',
      topics: []
    },


    {
      id: 4,
      name: 'AWS',
      description: 'AWS services, architecture and best practices.',
      icon: 'aws',
      iconClass: 'aws',
      status: 'Draft',
      topics: []
    },


    {
      id: 5,
      name: 'PostgreSQL',
      description: 'Database concepts, SQL, advanced queries.',
      icon: '🐘',
      iconClass: 'postgres',
      status: 'Published',
      topics: []
    }

  ];


  get selectedSubject(): Subject {

    return this.subjects.find(
      subject => subject.id === this.selectedSubjectId
    ) ?? this.subjects[0];

  }


  get selectedTopic(): Topic | null {

    return this.selectedSubject.topics.find(
      topic => topic.id === this.selectedTopicId
    ) ?? this.selectedSubject.topics[0] ?? null;

  }


  selectSubject(subject: Subject): void {

    this.selectedSubjectId = subject.id;

    this.selectedTopicId =
      subject.topics[0]?.id ?? 0;

  }


  selectTopic(topic: Topic): void {

    this.selectedTopicId = topic.id;

  }


  addSubject(): void {

    console.log('Add subject');

  }


  addTopic(): void {

    console.log('Add topic');

  }


  addSubtopic(): void {

    console.log('Add subtopic');

  }


  editSubject(subject: Subject): void {

    console.log('Edit subject:', subject);

  }


  editTopic(topic: Topic): void {

    console.log('Edit topic:', topic);

  }


  editSubtopic(subtopic: Subtopic): void {

    console.log('Edit subtopic:', subtopic);

  }


  deleteSubject(subject: Subject): void {

    console.log('Delete subject:', subject);

  }


  deleteTopic(topic: Topic): void {

    console.log('Delete topic:', topic);

  }


  deleteSubtopic(subtopic: Subtopic): void {

    console.log('Delete subtopic:', subtopic);

  }

getSubjectSubtopicCount(subject: Subject): number {

  return subject.topics.reduce(
    (total, topic) => total + topic.subtopics.length,
    0
  );

}


getSubjectTime(subject: Subject): string {

  const totalHours = subject.topics.reduce(
    (total, topic) => {
      const hours = Number.parseFloat(
        topic.estimatedTime.replace('h', '')
      );

      return total + (Number.isNaN(hours) ? 0 : hours);
    },
    0
  );

  return `${totalHours}h Est. Time`;
}
}
