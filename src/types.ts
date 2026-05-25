/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Shared TypeScript declarations for the Gamified HRMS SaaS platform

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
  level: number;
  points: number;
  xpNeeded: number;
  streak: number;
  attendanceRate: number;
  leavesTaken: number;
  leavesBalance: number;
  salary: number;
  badges: string[]; // Badge IDs
  engagementScore: number;
  performanceRating: number;
  status: 'active' | 'onboarding' | 'remote' | 'on-leave';
  recentActivity: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string; // lucide icon identifier
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export interface RewardItem {
  id: string;
  name: string;
  brand: string;
  category: 'food' | 'dining' | 'lifestyle' | 'fitness' | 'ott' | 'shopping' | 'voucher';
  pointsCost: number;
  discountValue: string;
  image: string; // descriptive fallback URL
  description: string;
  popularity: number; // 1-10 rating for AI recommendations
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  pointsReward: number;
  xpReward: number;
  category: 'wellbeing' | 'learning' | 'productivity' | 'collaboration';
  deadline: string;
  progress: number; // 0 to 100
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  lessons: number;
  pointsValue: number;
  progress: number; // 0 to 100
  instructor: string;
  unlocked: boolean;
}

export interface PayrollPayslip {
  id: string;
  month: string;
  year: number;
  baseSalary: number;
  allowances: number;
  gamifiedBonus: number; // point redemptions/completions bonus
  deductions: number;
  netPay: number;
  status: 'Published' | 'Pending';
}

export interface JobPosting {
  id: string;
  role: string;
  department: string;
  type: string;
  applications: number;
  status: 'Active' | 'Filled' | 'Draft';
  salaryRange: string;
}

export interface OnboardingTask {
  id: string;
  title: string;
  description?: string;
  role: string;
  status: 'completed' | 'pending';
}

export interface FeedItem {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  type: 'badge' | 'challenge' | 'level-up' | 'purchase';
  content: string;
  timestamp: string;
  likes: number;
}

export interface AIAnalysisRequest {
  type: 'engagement'| 'rewards' | 'performance' | 'trial-behavior' | 'employee-growth' | 'summary';
  employeeId?: string;
  employeeData?: any;
}

export interface AIAnalysisResponse {
  score?: number;
  suggestions: string[];
  strengths?: string[];
  coachingTips?: string[];
  summaryText: string;
  recommendedRewards?: RewardItem[];
  metricsAnalysis?: {
    metric: string;
    score: number;
    evaluation: string;
  }[];
}
