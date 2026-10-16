import { GoalPlan, GardenPlot, FlowerSpecies, GardenVisitor, FocusSessionLog, Companion } from '../types';

export const FLOWER_SPECIES: FlowerSpecies[] = [
  {
    id: 'sunflower',
    name: 'ทานตะวันใจสู้',
    meaning: 'หันหน้าเข้าหาแสงสว่าง ไม่ยอมแพ้ต่ออุปสรรค',
    icon: '🌻',
    colorHex: '#f59e0b',
    waterRequired: 60,
    sunRequired: 50,
  },
  {
    id: 'sakura',
    name: 'ซากุระสมาธิ',
    meaning: 'ความสงบนิ่ง สง่างาม และมีสติรู้ตัว',
    icon: '🌸',
    colorHex: '#ec4899',
    waterRequired: 50,
    sunRequired: 40,
  },
  {
    id: 'tulip',
    name: 'ทิวลิปพลังบวก',
    meaning: 'ความสดชื่น รอยยิ้ม และการเริ่มต้นใหม่',
    icon: '🌷',
    colorHex: '#ef4444',
    waterRequired: 45,
    sunRequired: 35,
  },
  {
    id: 'lotus',
    name: 'บัวแห่งความแจ่มใส',
    meaning: 'จิตใจที่ปลอดโปร่ง แม้รอบตัวจะวุ่นวาย',
    icon: '🪷',
    colorHex: '#a855f7',
    waterRequired: 70,
    sunRequired: 60,
  },
  {
    id: 'clover',
    name: 'โคลเวอร์ 4 แฉกนำโชค',
    meaning: 'สัญลักษณ์ของความพยายามที่นำพาความสำเร็จ',
    icon: '🍀',
    colorHex: '#10b981',
    waterRequired: 40,
    sunRequired: 30,
  },
];

export const COMPANIONS: Companion[] = [
  {
    id: 'somjeed',
    name: 'น้องส้มจี๊ด',
    title: 'จิ้งจอกน้อยนักสำรวจ',
    avatar: '🦊',
    personality: 'ร่าเริง กระตือรือร้น ให้กำลังใจเก่ง',
    routineAction: 'กำลังนั่งเปิดสมุดจดบันทึกข้างๆ เธอ',
    quote: 'สเต็ปแรกเริ่มง่ายนิดเดียว เราลุยไปด้วยกันนะ!',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'pui',
    name: 'เจ้าปุย',
    title: 'กระต่ายขาวสมาธินิ่ง',
    avatar: '🐰',
    personality: 'ใจเย็น อ่อนโยน ช่วยเตือนสติได้ดี',
    routineAction: 'กำลังตั้งใจอ่านหนังสือวิชาคณิตศาสตร์',
    quote: 'หายใจเข้าลึกๆ นะคนเก่ง ค่อยๆ ทำทีละข้อ สวนดอกไม้รอเราอยู่',
    color: 'from-pink-300 to-rose-400',
  },
  {
    id: 'brownie',
    name: 'พี่หมีบราวนี่',
    title: 'หมีใจดีจอมอดทน',
    avatar: '🐻',
    personality: 'อบอุ่น มั่นคง ปลอบใจเวลาเครียด',
    routineAction: 'กำลังนั่งเหลาดินสอและตรวจงานอย่างตั้งใจ',
    quote: 'ไม่ต้องรีบเลย ก้าวเล็กๆ ที่มั่นคงคือชัยชนะที่ยิ่งใหญ่นะ',
    color: 'from-amber-600 to-yellow-700',
  },
];

export const GARDEN_VISITORS: GardenVisitor[] = [
  {
    id: 'butterfly',
    name: 'ผีเสื้อสีรุ้ง',
    avatar: '🦋',
    description: 'บินแวะมาชมดอกไม้เมื่อทำภารกิจสำเร็จต่อเนื่อง',
    unlocked: true,
    minGardenLevel: 1,
  },
  {
    id: 'bee',
    name: 'ผึ้งน้อยจอมขยัน',
    avatar: '🐝',
    description: 'มาช่วยผสมเกสรให้ดอกไม้โตเร็วขึ้น 10%',
    unlocked: true,
    minGardenLevel: 2,
  },
  {
    id: 'squirrel',
    name: 'กระรอกน้อยหางฟู',
    avatar: '🐿️',
    description: 'ชอบมาวิ่งเล่นใกล้ดอกทานตะวันที่บานแล้ว',
    unlocked: true,
    minGardenLevel: 3,
  },
  {
    id: 'cat',
    name: 'แมวส้มหลับปุ๋ย',
    avatar: '🐱',
    description: 'มานอนผึ่งแดดสบายใจ นำพาความสุขและลดความกังวล',
    unlocked: false,
    minGardenLevel: 4,
  },
  {
    id: 'owl',
    name: 'นกฮูกนักปราชญ์',
    avatar: '🦉',
    description: 'ให้บัฟพิเศษช่วงเย็น เพิ่มหยดน้ำโบนัส 2 เท่า',
    unlocked: false,
    minGardenLevel: 5,
  },
];

const INITIAL_PLOTS: GardenPlot[] = [
  {
    id: 1,
    flowerId: 'sunflower',
    flowerName: 'ทานตะวันใจสู้',
    speciesIcon: '🌻',
    stage: 4, // Blooming
    waterCurrent: 60,
    waterTarget: 60,
    sunCurrent: 50,
    sunTarget: 50,
    isUnlocked: true,
  },
  {
    id: 2,
    flowerId: 'sakura',
    flowerName: 'ซากุระสมาธิ',
    speciesIcon: '🌸',
    stage: 3, // Bud
    waterCurrent: 35,
    waterTarget: 50,
    sunCurrent: 28,
    sunTarget: 40,
    isUnlocked: true,
  },
  {
    id: 3,
    flowerId: 'tulip',
    flowerName: 'ทิวลิปพลังบวก',
    speciesIcon: '🌷',
    stage: 2, // Sprout
    waterCurrent: 15,
    waterTarget: 45,
    sunCurrent: 12,
    sunTarget: 35,
    isUnlocked: true,
  },
  {
    id: 4,
    flowerId: null,
    flowerName: '',
    speciesIcon: '',
    stage: 1,
    waterCurrent: 0,
    waterTarget: 40,
    sunCurrent: 0,
    sunTarget: 30,
    isUnlocked: true,
  },
  {
    id: 5,
    flowerId: null,
    flowerName: '',
    speciesIcon: '',
    stage: 1,
    waterCurrent: 0,
    waterTarget: 50,
    sunCurrent: 0,
    sunTarget: 40,
    isUnlocked: true,
  },
  {
    id: 6,
    flowerId: null,
    flowerName: '',
    speciesIcon: '',
    stage: 1,
    waterCurrent: 0,
    waterTarget: 60,
    sunCurrent: 0,
    sunTarget: 50,
    isUnlocked: false,
  },
];

// Initial mock history logs for realistic 1-month analytics
const SEED_LOGS: FocusSessionLog[] = [
  {
    id: 'log-1',
    taskTitle: 'ทำการบ้านวิชาเลข 5 ข้อ',
    stepTitle: 'หยิบสมุดและทำข้อ 1-2',
    durationMinutes: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    timeOfDay: 'morning',
    emotion: 'happy',
    distractionRescuesUsed: 0,
    waterEarned: 25,
    sunEarned: 20,
  },
  {
    id: 'log-2',
    taskTitle: 'ทำการบ้านวิชาเลข 5 ข้อ',
    stepTitle: 'ทำข้อ 3-5 และตรวจทาน',
    durationMinutes: 15,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1 + 1000 * 60 * 30).toISOString(),
    timeOfDay: 'morning',
    emotion: 'happy',
    distractionRescuesUsed: 1,
    waterEarned: 30,
    sunEarned: 25,
  },
  {
    id: 'log-3',
    taskTitle: 'จัดกระเป๋านักเรียนตามตารางสอน',
    stepTitle: 'เปิดตารางสอนและหยิบสมุด 4 เล่ม',
    durationMinutes: 6,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    timeOfDay: 'afternoon',
    emotion: 'happy',
    distractionRescuesUsed: 0,
    waterEarned: 20,
    sunEarned: 15,
  },
  {
    id: 'log-4',
    taskTitle: 'อ่านหนังสือสังคม 2 หน้า',
    stepTitle: 'อ่านหน้า 1 และขีดเส้นใต้คำสำคัญ',
    durationMinutes: 10,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    timeOfDay: 'evening',
    emotion: 'stressed',
    distractionRescuesUsed: 2,
    waterEarned: 20,
    sunEarned: 10,
  },
  {
    id: 'log-5',
    taskTitle: 'เขียนคำศัพท์ภาษาอังกฤษ 5 คำ',
    stepTitle: 'คัดคำศัพท์ 3 คำแรก',
    durationMinutes: 8,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    timeOfDay: 'morning',
    emotion: 'happy',
    distractionRescuesUsed: 0,
    waterEarned: 25,
    sunEarned: 20,
  },
  {
    id: 'log-6',
    taskTitle: 'ทำแบบฝึกหัดวิทยาศาสตร์',
    stepTitle: 'ระบายสีส่วนประกอบของพืช',
    durationMinutes: 14,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    timeOfDay: 'afternoon',
    emotion: 'neutral',
    distractionRescuesUsed: 1,
    waterEarned: 25,
    sunEarned: 20,
  },
  {
    id: 'log-7',
    taskTitle: 'ทบทวนสูตรคูณแม่ 7',
    stepTitle: 'ท่องแม่ 7 ถึง 7x6',
    durationMinutes: 9,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    timeOfDay: 'evening',
    emotion: 'stressed',
    distractionRescuesUsed: 2,
    waterEarned: 15,
    sunEarned: 10,
  },
];

const INITIAL_GOAL_PLAN: GoalPlan = {
  id: 'goal-demo-1',
  title: 'ทำการบ้านวิชาเลข 5 ข้อ',
  description: 'ซอยย่อยงานเลขยากให้กลายเป็นสเต็ปแสนง่าย มีพี่เพื่อน AI คอยนั่งทำข้างๆ',
  estimatedTotalMinutes: 22,
  encouragement: 'ไม่ต้องรีบคิดทั้งหมดพร้อมกัน แค่หยิบดินสอทำทีละข้อ สวนดอกไม้จะได้รับหยดน้ำทันที!',
  createdAt: new Date().toISOString(),
  energyLevel: 'medium',
  steps: [
    {
      id: 'step-demo-1',
      title: 'หยิบสมุดเลขและเปิดหน้า 24 พร้อมเหลาดินสอ',
      detail: 'เตรียมอุปกรณ์ให้พร้อม วางสมุดไว้ตรงหน้า หายใจเข้าลึกๆ 1 ครั้ง',
      durationMinutes: 3,
      rewardWater: 20,
      rewardSun: 15,
      sensoryTip: 'จัดแสงโต๊ะให้สว่างกำลังดีและจิบน้ำ 1 อึก',
      completed: true,
      emotionLogged: 'happy',
    },
    {
      id: 'step-demo-2',
      title: 'ทำโจทย์ข้อที่ 1 และ 2',
      detail: 'อ่านโจทย์ช้าๆ ขีดเส้นใต้สิ่งที่โจทย์ถาม ค่อยๆ ทดเลขในกระดาษทด',
      durationMinutes: 8,
      rewardWater: 30,
      rewardSun: 20,
      sensoryTip: 'เปิดเสียงฝนตกเบาๆ ช่วยลดสิ่งเร้ารอบตัว',
      completed: true,
      emotionLogged: 'happy',
    },
    {
      id: 'step-demo-3',
      title: 'ทำโจทย์ข้อที่ 3 และ 4',
      detail: 'ผ่านมาครึ่งทางแล้ว! ทำต่ออีกแค่ 2 ข้อเท่านั้น น้องส้มจี๊ดส่งพลังให้!',
      durationMinutes: 8,
      rewardWater: 35,
      rewardSun: 25,
      sensoryTip: 'ยืดแขนบิดขี้เกียจ 5 วินาทีก่อนลุยต่อ',
      completed: false,
    },
    {
      id: 'step-demo-4',
      title: 'ลุยข้อ 5 ข้อสุดท้าย & ตรวจทานคำตอบ',
      detail: 'ข้อสุดท้ายแล้ว! ตรวจดูว่าเขียนชื่อครบไหม แล้วเก็บสมุดใส่กระเป๋า',
      durationMinutes: 3,
      rewardWater: 40,
      rewardSun: 30,
      sensoryTip: 'ชูสองนิ้วบอกตัวเองว่า "เราทำสำเร็จแล้ว!"',
      completed: false,
    },
  ],
};

const STORAGE_KEYS = {
  PLANS: 'bloomfocus_plans',
  ACTIVE_PLAN_ID: 'bloomfocus_active_plan_id',
  WATER: 'bloomfocus_water_balance',
  SUN: 'bloomfocus_sun_balance',
  GARDEN_LEVEL: 'bloomfocus_garden_level',
  PLOTS: 'bloomfocus_garden_plots',
  SELECTED_COMPANION: 'bloomfocus_companion_id',
  SESSION_LOGS: 'bloomfocus_session_logs',
  STREAK_DAYS: 'bloomfocus_streak_days',
  CHILD_NAME: 'bloomfocus_child_name',
};

export const getStoredPlans = (): GoalPlan[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLANS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [INITIAL_GOAL_PLAN];
};

export const savePlans = (plans: GoalPlan[]) => {
  localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
};

export const getStoredPlots = (): GardenPlot[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLOTS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_PLOTS;
};

export const savePlots = (plots: GardenPlot[]) => {
  localStorage.setItem(STORAGE_KEYS.PLOTS, JSON.stringify(plots));
};

export const getStoredWater = (): number => {
  const val = localStorage.getItem(STORAGE_KEYS.WATER);
  return val ? Number(val) : 85;
};

export const saveWater = (val: number) => {
  localStorage.setItem(STORAGE_KEYS.WATER, String(val));
};

export const getStoredSun = (): number => {
  const val = localStorage.getItem(STORAGE_KEYS.SUN);
  return val ? Number(val) : 60;
};

export const saveSun = (val: number) => {
  localStorage.setItem(STORAGE_KEYS.SUN, String(val));
};

export const getStoredGardenLevel = (): number => {
  const val = localStorage.getItem(STORAGE_KEYS.GARDEN_LEVEL);
  return val ? Number(val) : 2;
};

export const saveGardenLevel = (val: number) => {
  localStorage.setItem(STORAGE_KEYS.GARDEN_LEVEL, String(val));
};

export const getStoredCompanionId = (): string => {
  return localStorage.getItem(STORAGE_KEYS.SELECTED_COMPANION) || 'somjeed';
};

export const saveCompanionId = (id: string) => {
  localStorage.setItem(STORAGE_KEYS.SELECTED_COMPANION, id);
};

export const getStoredLogs = (): FocusSessionLog[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION_LOGS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return SEED_LOGS;
};

export const saveLogs = (logs: FocusSessionLog[]) => {
  localStorage.setItem(STORAGE_KEYS.SESSION_LOGS, JSON.stringify(logs));
};

export const getStoredStreak = (): number => {
  const val = localStorage.getItem(STORAGE_KEYS.STREAK_DAYS);
  return val ? Number(val) : 5;
};

export const saveStreak = (streak: number) => {
  localStorage.setItem(STORAGE_KEYS.STREAK_DAYS, String(streak));
};

export const getStoredChildName = (): string => {
  return localStorage.getItem(STORAGE_KEYS.CHILD_NAME) || 'น้องต้นกล้า';
};

export const saveChildName = (name: string) => {
  localStorage.setItem(STORAGE_KEYS.CHILD_NAME, name);
};
