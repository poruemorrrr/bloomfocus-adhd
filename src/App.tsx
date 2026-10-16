import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TaskInputModal } from './components/TaskInputModal';
import { MicroTaskList } from './components/MicroTaskList';
import { FocusModeModal } from './components/FocusModeModal';
import { EmotionCheckInModal } from './components/EmotionCheckInModal';
import { BloomGarden } from './components/BloomGarden';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CompanionRoom } from './components/CompanionRoom';
import { ConceptExplainer } from './components/ConceptExplainer';
import { GoalPlan, MicroStep, EmotionType, GardenPlot, Companion, FocusSessionLog } from './types';
import {
  getStoredPlans,
  savePlans,
  getStoredPlots,
  savePlots,
  getStoredWater,
  saveWater,
  getStoredSun,
  saveSun,
  getStoredGardenLevel,
  saveGardenLevel,
  getStoredCompanionId,
  saveCompanionId,
  getStoredLogs,
  saveLogs,
  getStoredStreak,
  saveStreak,
  getStoredChildName,
  saveChildName,
  COMPANIONS,
  FLOWER_SPECIES,
} from './utils/storage';
import { sounds } from './utils/soundEffects';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'app' | 'garden' | 'analytics' | 'concept'>('app');

  // Core Data State
  const [plans, setPlans] = useState<GoalPlan[]>(getStoredPlans);
  const [activePlanId, setActivePlanId] = useState<string>(() => plans[0]?.id || '');
  const [plots, setPlots] = useState<GardenPlot[]>(getStoredPlots);
  const [water, setWater] = useState<number>(getStoredWater);
  const [sun, setSun] = useState<number>(getStoredSun);
  const [gardenLevel, setGardenLevel] = useState<number>(getStoredGardenLevel);
  const [streak, setStreak] = useState<number>(getStoredStreak);
  const [childName, setChildName] = useState<string>(getStoredChildName);
  const [isMuted, setIsMuted] = useState<boolean>(sounds.isMuted);

  // Companion State
  const [companionId, setCompanionId] = useState<string>(getStoredCompanionId);
  const selectedCompanion = COMPANIONS.find((c) => c.id === companionId) || COMPANIONS[0];

  // Logs for Analytics
  const [logs, setLogs] = useState<FocusSessionLog[]>(getStoredLogs);

  // Modals State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [focusingStep, setFocusingStep] = useState<MicroStep | null>(null);
  const [completingStep, setCompletingStep] = useState<MicroStep | null>(null);
  const [lastRescuesUsed, setLastRescuesUsed] = useState(0);

  // Sync to localStorage
  useEffect(() => {
    savePlans(plans);
  }, [plans]);

  useEffect(() => {
    savePlots(plots);
  }, [plots]);

  useEffect(() => {
    saveWater(water);
  }, [water]);

  useEffect(() => {
    saveSun(sun);
  }, [sun]);

  useEffect(() => {
    saveGardenLevel(gardenLevel);
  }, [gardenLevel]);

  useEffect(() => {
    saveCompanionId(companionId);
  }, [companionId]);

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  useEffect(() => {
    saveStreak(streak);
  }, [streak]);

  useEffect(() => {
    saveChildName(childName);
  }, [childName]);

  // Current Active Plan
  const currentPlan = plans.find((p) => p.id === activePlanId) || plans[0] || null;

  // Handlers for Plan & Micro-Tasks
  const handleSaveNewPlan = (newPlan: GoalPlan) => {
    const updated = [newPlan, ...plans];
    setPlans(updated);
    setActivePlanId(newPlan.id);
  };

  const handleStartFocus = (step: MicroStep) => {
    setFocusingStep(step);
  };

  const handleFinishFocus = (step: MicroStep, rescuesUsed: number) => {
    setLastRescuesUsed(rescuesUsed);
    setFocusingStep(null);
    setCompletingStep(step);
  };

  const handleToggleCompleteManual = (stepId: string) => {
    if (!currentPlan) return;
    const targetStep = currentPlan.steps.find((s) => s.id === stepId);
    if (!targetStep) return;

    if (!targetStep.completed) {
      // Prompt emotion check-in for manual complete too!
      setLastRescuesUsed(0);
      setCompletingStep(targetStep);
    } else {
      // Toggle back to incomplete
      const updatedSteps = currentPlan.steps.map((s) =>
        s.id === stepId ? { ...s, completed: false, emotionLogged: undefined } : s
      );
      const updatedPlan = { ...currentPlan, steps: updatedSteps };
      setPlans(plans.map((p) => (p.id === currentPlan.id ? updatedPlan : p)));
    }
  };

  // Handlers for Emotion Check-in & Dopamine Rewards
  const handleSaveEmotion = (emotion: EmotionType, _tags: string[]) => {
    if (!completingStep || !currentPlan) return;

    // 1. Mark step as completed
    const updatedSteps = currentPlan.steps.map((s) =>
      s.id === completingStep.id
        ? { ...s, completed: true, completedAt: new Date().toISOString(), emotionLogged: emotion }
        : s
    );
    const updatedPlan = { ...currentPlan, steps: updatedSteps };
    setPlans(plans.map((p) => (p.id === currentPlan.id ? updatedPlan : p)));

    // 2. Award Dopamine Currencies (Immediate Reward)
    setWater((prev) => prev + completingStep.rewardWater);
    setSun((prev) => prev + completingStep.rewardSun);

    // 3. Log session for Monthly Analytics
    const hours = new Date().getHours();
    let timeOfDay: FocusSessionLog['timeOfDay'] = 'morning';
    if (hours >= 12 && hours < 17) timeOfDay = 'afternoon';
    else if (hours >= 17 && hours < 21) timeOfDay = 'evening';
    else if (hours >= 21 || hours < 6) timeOfDay = 'night';

    const newLog: FocusSessionLog = {
      id: `log-${Date.now()}`,
      taskTitle: currentPlan.title,
      stepTitle: completingStep.title,
      durationMinutes: completingStep.durationMinutes,
      timestamp: new Date().toISOString(),
      timeOfDay,
      emotion,
      distractionRescuesUsed: lastRescuesUsed,
      waterEarned: completingStep.rewardWater,
      sunEarned: completingStep.rewardSun,
    };
    setLogs([newLog, ...logs]);

    // Close modal
    setCompletingStep(null);
  };

  // Garden Handlers
  const handleWaterPlot = (plotId: number) => {
    if (water < 10) return;
    setWater((prev) => prev - 10);
    setPlots((prev) =>
      prev.map((plot) => {
        if (plot.id !== plotId) return plot;
        const nextWater = plot.waterCurrent + 10;
        let nextStage = plot.stage;
        if (nextWater >= plot.waterTarget && plot.sunCurrent >= plot.sunTarget && plot.stage < 4) {
          nextStage = 4; // Full Bloom!
          sounds.playBloom();
        } else if (nextWater >= Math.floor(plot.waterTarget * 0.6) && plot.stage < 3) {
          nextStage = 3;
        } else if (nextWater >= Math.floor(plot.waterTarget * 0.3) && plot.stage < 2) {
          nextStage = 2;
        }
        return {
          ...plot,
          waterCurrent: Math.min(plot.waterTarget, nextWater),
          stage: nextStage,
        };
      })
    );
  };

  const handleSunPlot = (plotId: number) => {
    if (sun < 10) return;
    setSun((prev) => prev - 10);
    setPlots((prev) =>
      prev.map((plot) => {
        if (plot.id !== plotId) return plot;
        const nextSun = plot.sunCurrent + 10;
        let nextStage = plot.stage;
        if (plot.waterCurrent >= plot.waterTarget && nextSun >= plot.sunTarget && plot.stage < 4) {
          nextStage = 4; // Full Bloom!
          sounds.playBloom();
        } else if (nextSun >= Math.floor(plot.sunTarget * 0.6) && plot.stage < 3) {
          nextStage = 3;
        } else if (nextSun >= Math.floor(plot.sunTarget * 0.3) && plot.stage < 2) {
          nextStage = 2;
        }
        return {
          ...plot,
          sunCurrent: Math.min(plot.sunTarget, nextSun),
          stage: nextStage,
        };
      })
    );
  };

  const handlePlantSeed = (plotId: number, speciesId: string) => {
    const species = FLOWER_SPECIES.find((s) => s.id === speciesId);
    if (!species) return;

    setPlots((prev) =>
      prev.map((plot) => {
        if (plot.id !== plotId) return plot;
        return {
          ...plot,
          flowerId: species.id,
          flowerName: species.name,
          speciesIcon: species.icon,
          stage: 1, // Seed stage
          waterCurrent: 0,
          waterTarget: species.waterRequired,
          sunCurrent: 0,
          sunTarget: species.sunRequired,
          plantedAt: new Date().toISOString(),
        };
      })
    );
  };

  const handleUnlockPlot = (plotId: number) => {
    if (water < 50) {
      alert('ต้องการ 50 หยดน้ำเพื่อปลดล็อกแปลงใหม่!');
      return;
    }
    setWater((prev) => prev - 50);
    setPlots((prev) =>
      prev.map((plot) => (plot.id === plotId ? { ...plot, isUnlocked: true } : plot))
    );
    setGardenLevel((prev) => prev + 1);
    sounds.playBloom();
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 selection:bg-amber-200">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        water={water}
        sun={sun}
        streak={streak}
        childName={childName}
        onOpenTaskModal={() => setIsTaskModalOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Tab 1: AI Input & Micro-Tasking + Companion Room */}
        {activeTab === 'app' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Micro Tasks */}
            <div className="lg:col-span-8 space-y-6">
              <MicroTaskList
                plan={currentPlan}
                onStartFocus={handleStartFocus}
                onOpenTaskModal={() => setIsTaskModalOpen(true)}
                onToggleCompleteManual={handleToggleCompleteManual}
              />
            </div>

            {/* Right Column: Companion Role Model Room */}
            <div className="lg:col-span-4 space-y-6">
              <CompanionRoom
                selectedCompanion={selectedCompanion}
                onSelectCompanion={(c) => setCompanionId(c.id)}
                childName={childName}
                onUpdateChildName={(name) => setChildName(name)}
              />

              {/* Quick Garden Teaser Card */}
              <div
                onClick={() => {
                  sounds.playSoftClick();
                  setActiveTab('garden');
                }}
                className="bg-gradient-to-tr from-emerald-50 to-teal-50 border-2 border-emerald-200/80 rounded-3xl p-5 shadow-xs cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform">
                      🌸
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">สวนดอกไม้กำลังรออยู่</h4>
                      <p className="text-xs text-slate-500">มี {water} หยดน้ำ พร้อมรดต้นไม้</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full group-hover:bg-emerald-200 transition-colors">
                    ไปที่สวน →
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Gamification Bloom Garden */}
        {activeTab === 'garden' && (
          <BloomGarden
            plots={plots}
            water={water}
            sun={sun}
            gardenLevel={gardenLevel}
            onWaterPlot={handleWaterPlot}
            onSunPlot={handleSunPlot}
            onPlantSeed={handlePlantSeed}
            onUnlockPlot={handleUnlockPlot}
          />
        )}

        {/* Tab 3: Monthly Emotional & Focus Analytics for Parents */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard
            logs={logs}
            childName={childName}
          />
        )}

        {/* Tab 4: Concept & Innovation Explainer */}
        {activeTab === 'concept' && (
          <ConceptExplainer
            onStartMicroTask={() => {
              setActiveTab('app');
              setIsTaskModalOpen(true);
            }}
            onGoToGarden={() => setActiveTab('garden')}
          />
        )}
      </main>

      {/* Footer Info */}
      <footer className="mt-auto border-t border-amber-100 bg-white/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🌸</span>
            <span className="font-bold text-slate-700">BloomFocus ADHD</span>
            <span>— เพื่อพัฒนาการและการจัดการเวลาอย่างยั่งยืนด้วยพลังเชิงบวก</span>
          </div>
          <div className="text-[11px] text-slate-400">
            ระบบ 4 เสาหลัก: AI Micro-Tasking • Companion Focus Mode • Dopamine Garden • Emotional Analytics
          </div>
        </div>
      </footer>

      {/* Task Input Modal */}
      <TaskInputModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSavePlan={handleSaveNewPlan}
      />

      {/* Focus Mode Fullscreen Modal */}
      {focusingStep && (
        <FocusModeModal
          step={focusingStep}
          companion={selectedCompanion}
          onFinishStep={handleFinishFocus}
          onCancel={() => setFocusingStep(null)}
        />
      )}

      {/* Emotion Check-In Modal */}
      {completingStep && (
        <EmotionCheckInModal
          step={completingStep}
          isOpen={true}
          onSaveEmotion={handleSaveEmotion}
        />
      )}
    </div>
  );
}
