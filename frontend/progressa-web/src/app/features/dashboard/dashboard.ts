import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { UpdateProgressModal } from './components/update-progress-modal/update-progress-modal';
import { AddNewLearningModal } from './components/add-new-learning-modal/add-new-learning-modal';

interface StatCard {
  icon: string;
  label: string;
  value: string;
  trend: string;
  trendType: 'positive' | 'neutral';
}

interface LearningTopic {
  icon: string;
  iconClass: string;
  name: string;
  percentage: number;
  completed: number;
  total: number;
}

interface Activity {
  icon: string;
  iconClass: string;
  text: string;
  time: string;
}

interface Reminder {
  month: string;
  day: string;
  title: string;
  description: string;
  time: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    RouterLinkActive,
    UpdateProgressModal,
    AddNewLearningModal
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  activePeriod: 'Daily' | 'Weekly' | 'Monthly' = 'Weekly';

  showUpdateProgressModal = false;
  showAddNewLearningModal = false;


  // =========================
  // Statistics
  // =========================

  stats: StatCard[] = [
    {
      icon: '▮',
      label: 'Topics Learned',
      value: '128',
      trend: '↑ 16 this week',
      trendType: 'positive'
    },
    {
      icon: '✓',
      label: 'Completed',
      value: '63%',
      trend: '↑ 8% vs last week',
      trendType: 'positive'
    },
    {
      icon: '♨',
      label: 'Current Streak',
      value: '12 days',
      trend: '🔥 Keep it up!',
      trendType: 'neutral'
    },
    {
      icon: '◷',
      label: 'Time Invested',
      value: '24h 35m',
      trend: '↑ 4h this week',
      trendType: 'positive'
    }
  ];


  // =========================
  // Continue Learning
  // =========================

  learningTopics: LearningTopic[] = [
    {
      icon: 'JS',
      iconClass: 'javascript',
      name: 'JavaScript Fundamentals',
      percentage: 75,
      completed: 15,
      total: 20
    },
    {
      icon: '◇',
      iconClass: 'structures',
      name: 'Data Structures',
      percentage: 60,
      completed: 18,
      total: 30
    },
    {
      icon: '⌘',
      iconClass: 'system-design',
      name: 'System Design Basics',
      percentage: 40,
      completed: 8,
      total: 20
    },
    {
      icon: '⚛',
      iconClass: 'react',
      name: 'React.js Basics',
      percentage: 30,
      completed: 6,
      total: 20
    }
  ];


  // =========================
  // Recent Activity
  // =========================

  activities: Activity[] = [
    {
      icon: '✓',
      iconClass: 'completed',
      text: 'Completed topic "Array Methods" in JavaScript',
      time: '2h ago'
    },
    {
      icon: '▣',
      iconClass: 'studied',
      text: 'Studied "React Components"',
      time: '4h ago'
    },
    {
      icon: '</>',
      iconClass: 'coding',
      text: 'Solved 2 problems on LeetCode',
      time: 'Yesterday'
    },
    {
      icon: '◎',
      iconClass: 'goal',
      text: 'Goal "Learn System Design" progress updated',
      time: '2 days ago'
    },
    {
      icon: '✓',
      iconClass: 'completed',
      text: 'Completed topic "Flexbox" in CSS',
      time: '2 days ago'
    }
  ];


  // =========================
  // Upcoming Reminders
  // =========================

  reminders: Reminder[] = [
    {
      month: 'MAY',
      day: '20',
      title: 'DSA Practice',
      description: 'Solve 3 problems',
      time: '10:00 AM'
    },
    {
      month: 'MAY',
      day: '21',
      title: 'System Design Study',
      description: 'Read and take notes',
      time: '02:00 PM'
    },
    {
      month: 'MAY',
      day: '23',
      title: 'Mock Interview',
      description: 'Frontend Developer',
      time: '11:00 AM'
    }
  ];


  // =========================
  // Topics Chart
  // =========================

  chartData = [
    {
      name: 'JavaScript',
      hours: 8.8
    },
    {
      name: 'React',
      hours: 6.2
    },
    {
      name: 'Java',
      hours: 4.1
    },
    {
      name: 'Data Structures',
      hours: 2.5
    },
    {
      name: 'System Design',
      hours: 1.8
    }
  ];


  // =========================
  // Chart Period
  // =========================

  setPeriod(
    period: 'Daily' | 'Weekly' | 'Monthly'
  ): void {

    this.activePeriod = period;
  }


  getBarHeight(hours: number): number {

    return (hours / 10) * 100;
  }


  // =========================
  // Update Progress Modal
  // =========================

  openUpdateProgress(): void {

    this.showUpdateProgressModal = true;
  }


  closeUpdateProgress(): void {

    this.showUpdateProgressModal = false;
  }


  handleProgressUpdate(data: {
    subject: string;
    topic: string;
    subtopic: string;
    status: string;
    startDateTime: string;
    endDateTime: string;
    notes: string;
  }): void {

    console.log('Progress update:', data);

    this.showUpdateProgressModal = false;
  }


openAddNewLearning(): void {
  this.showAddNewLearningModal = true;
}

closeAddNewLearning(): void {
  this.showAddNewLearningModal = false;
}

handleNewLearning(data: {
  subject: string;
  topic: string;
  subtopic: string;
  learningType: string;
  status: string;
  startDateTime: string;
  endDateTime: string;
  notes: string;
}): void {

  console.log('New learning:', data);

  this.showAddNewLearningModal = false;
}


  // =========================
  // Logout
  // =========================

  logout(): void {

    // We'll connect this to Auth.logout()
    // when we implement the complete logout flow.

    console.log('Logout clicked');
  }

}
