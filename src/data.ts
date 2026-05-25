/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Employee, Badge, RewardItem, Challenge, Course, FeedItem, JobPosting, OnboardingTask } from './types';

export const SAMPLE_BADGES: Badge[] = [
  {
    id: 'streak_3',
    name: 'Habit Hero',
    description: 'Maintained a 3-day attendance check-in streak.',
    iconName: 'Flame',
    rarity: 'common'
  },
  {
    id: 'streak_10',
    name: 'Dedicated Titan',
    description: 'Checked into the HRMS for 10 consecutive working days.',
    iconName: 'Crown',
    rarity: 'rare'
  },
  {
    id: 'course_master',
    name: 'Syllabus Slayer',
    description: 'Completed any professional development module with 100% quiz scores.',
    iconName: 'BookOpen',
    rarity: 'rare'
  },
  {
    id: 'spin_jackpot',
    name: 'Luck Vanguard',
    description: 'Uncovered a rare discount prize from the Gamified Wheel.',
    iconName: 'Sparkles',
    rarity: 'epic'
  },
  {
    id: 'team_catalyst',
    name: 'Synergy Core',
    description: 'Aided 5 remote coworkers in collaborative quests.',
    iconName: 'Users',
    rarity: 'epic'
  },
  {
    id: 'gemini_oracle',
    name: 'AI Elite Pioneer',
    description: 'Unlocked customized workplace growth suggestions powered by Gemini.',
    iconName: 'BrainCircuit',
    rarity: 'legendary'
  }
];

export const SAMPLE_REWARDS: RewardItem[] = [
  {
    id: 'pizza_voucher',
    name: 'Mega Pan Pizza 50% Off Voucher',
    brand: 'Pizza Hub',
    category: 'food',
    pointsCost: 300,
    discountValue: '50% Off Dual-Toppings Pan Pizza',
    image: '🍕',
    description: 'Treat your department or family. Enjoy the gold standard of sourdough crust crusts.',
    popularity: 9
  },
  {
    id: 'coffee_espresso',
    name: 'Free Artisan Blend Macchiato',
    brand: 'StarBrew Coffee',
    category: 'food',
    pointsCost: 150,
    discountValue: '1 Free Espresso-based Beverage',
    image: '☕',
    description: 'Double shot of organic espresso paired with standard dynamic foam.',
    popularity: 10
  },
  {
    id: 'ott_sub_month',
    name: '1-Month Standard Subscription',
    brand: 'CinemaFlix',
    category: 'ott',
    pointsCost: 650,
    discountValue: '1 Month Standard HD Playback',
    image: '📺',
    description: 'Stream unlimited movies, SaaS tutorials, and world documentaries.',
    popularity: 8
  },
  {
    id: 'fitness_pass',
    name: '7-Day Unlimited Studio Pass',
    brand: 'GoldPulse Gym',
    category: 'fitness',
    pointsCost: 450,
    discountValue: '7 Days Access & Steam Bath',
    image: '💪',
    description: 'Complete workout tracking. Access state-of-the-art weights and visual trainer guides.',
    popularity: 7
  },
  {
    id: 'shopping_discount',
    name: '$25 Sitewide Gift Card',
    brand: 'AuraMarket',
    category: 'shopping',
    pointsCost: 1000,
    discountValue: '$25 Flat Off All Essentials',
    image: '🛍️',
    description: 'Upgrade your home office tools. Redeem across electronic brackets or clothing collections.',
    popularity: 9
  },
  {
    id: 'burger_combo',
    name: 'Free Gourmet Cheese Burger & Fries',
    brand: 'Charcoal Flames',
    category: 'food',
    pointsCost: 250,
    discountValue: 'Free Double Patty Cheese Meal',
    image: '🍔',
    description: 'Flame-broiled beef patty packed with fresh cheddar and special HR secret sauce.',
    popularity: 8
  },
  {
    id: 'gym_membership_month',
    name: '30% Off Monthly Premium Enlistment',
    brand: 'ZenYoga & Pilates',
    category: 'fitness',
    pointsCost: 500,
    discountValue: '30% Discount on Group Sprints',
    image: '🧘‍♀️',
    description: 'Unlock cognitive alignment. Includes full locker privileges and online video resources.',
    popularity: 6
  }
];

export const SAMPLE_CHALLENGES: Challenge[] = [
  {
    id: 'daily_checkin',
    title: 'Workplace Sync Up',
    description: 'Clock-in using Employee Self Service prior to 9:00 AM local time.',
    pointsReward: 50,
    xpReward: 100,
    category: 'productivity',
    deadline: 'Daily Goal',
    progress: 100,
    completed: true
  },
  {
    id: 'learn_micro',
    title: 'Micro-Learning Sprint',
    description: 'Complete at least 2 quick lessons of any active professional training module.',
    pointsReward: 120,
    xpReward: 250,
    category: 'learning',
    deadline: 'Expires in 3 days',
    progress: 50,
    completed: false
  },
  {
    id: 'wellness_step',
    title: 'Mental Recharge Intermission',
    description: 'Record a 15-minute eye-strain mindfulness or posture break during standby.',
    pointsReward: 80,
    xpReward: 150,
    category: 'wellbeing',
    deadline: 'Weekly Sprint',
    progress: 0,
    completed: false
  },
  {
    id: 'peer_review_syncs',
    title: 'Synergy Feedback Loop',
    description: 'Examine and rate 2 collaborative milestones submitted in peer modules.',
    pointsReward: 150,
    xpReward: 300,
    category: 'collaboration',
    deadline: 'Expires in 5 days',
    progress: 100,
    completed: true
  }
];

export const SAMPLE_COURSES: Course[] = [
  {
    id: 'security_compliance',
    title: 'Modern Workspace Data Safety & AI Governance',
    description: 'Essential compliance rules around enterprise information, API endpoints, and safe workspace practices.',
    duration: '1h 15m',
    category: 'Security & Compliance',
    lessons: 4,
    pointsValue: 200,
    progress: 75,
    instructor: 'Regina Miller (Global CISO)',
    unlocked: true
  },
  {
    id: 'eng_culture',
    title: 'High-Performance Team Collaboration Patterns',
    description: 'Harness interactive tools, dynamic checklists, and communication triggers to excel as a developer or designer.',
    duration: '2h 30m',
    category: 'Leadership & Soft Skills',
    lessons: 6,
    pointsValue: 350,
    progress: 33,
    instructor: 'Darnell Vance (Culture VP)',
    unlocked: true
  },
  {
    id: 'genai_prompting',
    title: 'SaaS Productivity: Prompting & Engineering with Gemini',
    description: 'Deep-dive into writing highly structured, grounding instructions to leverage Gemini models safely for enterprise workflows.',
    duration: '3h 10m',
    category: 'AI & Engineering',
    lessons: 8,
    pointsValue: 500,
    progress: 0,
    instructor: 'Google Developers Core Team',
    unlocked: false
  }
];

export const SAMPLE_EMPLOYEES: Employee[] = [
  {
    id: 'emp_101',
    name: 'Elena Rostova',
    email: 'elena.r@moderntech.co',
    role: 'Lead Full-Stack Developer',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    level: 5,
    points: 1250,
    xpNeeded: 1500,
    streak: 11,
    attendanceRate: 98,
    leavesTaken: 3,
    leavesBalance: 15,
    salary: 8200,
    badges: ['streak_3', 'streak_10', 'team_catalyst'],
    engagementScore: 92,
    performanceRating: 4.8,
    status: 'active',
    recentActivity: [
      'Clocked in at 8:43 AM (On Time)',
      'Completed course module: Modern Workspace Data Safety',
      'Unlocked Badge: Dedicated Titan (10-day streak)',
      'Purchased Custom OTT Voucher with 650 points'
    ]
  },
  {
    id: 'emp_102',
    name: 'Marcus Sterling',
    email: 'm.sterling@moderntech.co',
    role: 'Product Lead',
    department: 'Product Management',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    level: 3,
    points: 320,
    xpNeeded: 1000,
    streak: 4,
    attendanceRate: 94,
    leavesTaken: 5,
    leavesBalance: 13,
    salary: 7600,
    badges: ['streak_3'],
    engagementScore: 78,
    performanceRating: 4.2,
    status: 'remote',
    recentActivity: [
      'Clocked in at 8:58 AM (Remote Active)',
      'Finished Quiz: Team Collaboration Guidelines',
      'Exchanged feedback with Elena Rostova',
      'Requested leaves for Annual Wellness Week'
    ]
  },
  {
    id: 'emp_103',
    name: 'Jordan Finch',
    email: 'jordan.f@moderntech.co',
    role: 'SaaS Customer Success Specialist',
    department: 'Support & Ops',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    level: 1,
    points: 120,
    xpNeeded: 500,
    streak: 1,
    attendanceRate: 88,
    leavesTaken: 8,
    leavesBalance: 10,
    salary: 5200,
    badges: [],
    engagementScore: 59,
    performanceRating: 3.5,
    status: 'onboarding',
    recentActivity: [
      'Joined corporate workspace and started standard checklist',
      'Clocked in at 9:11 AM (Grace Period Applied)',
      'Enrolled in security compliance training'
    ]
  }
];

export const SAMPLE_ONBOARDING_CHECKLIST: OnboardingTask[] = [
  { id: 't1', title: 'Register profile avatar & complete tax forms', role: 'All Roles', status: 'completed' },
  { id: 't2', title: 'Conduct introductory call with Department VP', role: 'All Roles', status: 'completed' },
  { id: 't3', title: 'Secure initial 200 points on compliance quizzes', role: 'All Roles', status: 'pending' },
  { id: 't4', title: 'Configure local safe keys & IDE developer licenses', role: 'Engineering', status: 'completed' },
  { id: 't5', title: 'Setup first customer standby calendar rotation', role: 'Support & Ops', status: 'pending' }
];

export const SAMPLE_JOBS: JobPosting[] = [
  { id: 'j1', role: 'Senior UX Architect', department: 'Design', type: 'Full-time', applications: 24, status: 'Active', salaryRange: '$90k - $120k' },
  { id: 'j2', role: 'Senior backend dev (Rust/Node)', department: 'Engineering', type: 'Full-time', applications: 48, status: 'Active', salaryRange: '$120k - $150k' },
  { id: 'j3', role: 'Enterprise Sales Manager', department: 'Sales', type: 'On-Commission Base', applications: 9, status: 'Draft', salaryRange: '$80K Base + Cap' }
];

export const SAMPLE_FEED: FeedItem[] = [
  {
    id: 'f1',
    employeeName: 'Elena Rostova',
    employeeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    type: 'badge',
    content: "unlocked the Legendary 'AI Elite Pioneer' badge by optimizing prompts with Gemini!",
    timestamp: '2 hours ago',
    likes: 12
  },
  {
    id: 'f2',
    employeeName: 'Marcus Sterling',
    employeeAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    type: 'purchase',
    content: "redeemed 'Mega Pan Pizza 50% Off Voucher' from Pizza Hub for the Product Team lunch!",
    timestamp: '4 hours ago',
    likes: 8
  },
  {
    id: 'f3',
    employeeName: 'Jordan Finch',
    employeeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    type: 'level-up',
    content: "reached Level 2 by completing Core HRMS compliance onboarding checklists!",
    timestamp: 'Yesterday',
    likes: 4
  }
];
