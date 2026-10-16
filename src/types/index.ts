export type EnergyLevel = 'high' | 'medium' | 'low';

export type EmotionType = 'happy' | 'neutral' | 'stressed' | 'tired';

export interface MicroStep {
  id: string;
  title: string;
  detail: string;
  durationMinutes: number;
  rewardWater: number;
  rewardSun: number;
  sensoryTip: string;
  completed?: boolean;
  completedAt?: string;
  emotionLogged?: EmotionType;
}

export interface GoalPlan {
  id: string;
  title: string;
  description: string;
  estimatedTotalMinutes: number;
  encouragement: string;
  steps: MicroStep[];
  createdAt: string;
  energyLevel: EnergyLevel;
}

export interface Companion {
  id: string;
  name: string;
  title: string;
  avatar: string;
  personality: string;
  routineAction: string;
  quote: string;
  color: string;
}

export type FlowerStage = 1 | 2 | 3 | 4 | 5; // 1: Seed, 2: Sprout, 3: Bud, 4: Blooming, 5: Golden

export interface FlowerSpecies {
  id: string;
  name: string;
  meaning: string;
  icon: string;
  colorHex: string;
  waterRequired: number;
  sunRequired: number;
}

export interface GardenPlot {
  id: number;
  flowerId: string | null;
  flowerName: string;
  speciesIcon: string;
  stage: FlowerStage;
  waterCurrent: number;
  waterTarget: number;
  sunCurrent: number;
  sunTarget: number;
  plantedAt?: string;
  isUnlocked: boolean;
}

export interface GardenVisitor {
  id: string;
  name: string;
  avatar: string;
  description: string;
  unlocked: boolean;
  minGardenLevel: number;
}

export interface FocusSessionLog {
  id: string;
  taskTitle: string;
  stepTitle: string;
  durationMinutes: number;
  timestamp: string; // ISO string
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  emotion: EmotionType;
  distractionRescuesUsed: number;
  waterEarned: number;
  sunEarned: number;
}

export interface KeyFinding {
  topic: string;
  finding: string;
  severity: 'positive' | 'warning' | 'info';
}

export interface AnalyticsReport {
  summary: string;
  keyFindings: KeyFinding[];
  actionableAdviceForParents: string[];
  emotionalDistribution: {
    happy: number;
    neutral: number;
    stressed: number;
  };
  executiveFunctionScore: {
    taskInitiation: number;
    sustainedAttention: number;
    emotionalRegulation: number;
    organization: number;
  };
}
