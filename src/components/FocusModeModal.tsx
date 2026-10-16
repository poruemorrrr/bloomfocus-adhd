import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check, ShieldCheck, Heart, Sparkles, Volume2, X, AlertTriangle, ArrowRight, Wind } from 'lucide-react';
import { Companion, MicroStep } from '../types';
import { sounds } from '../utils/soundEffects';

interface FocusModeModalProps {
  step: MicroStep;
  companion: Companion;
  onFinishStep: (step: MicroStep, rescuesUsed: number) => void;
  onCancel: () => void;
}

export const FocusModeModal: React.FC<FocusModeModalProps> = ({
  step,
  companion,
  onFinishStep,
  onCancel,
}) => {
  // Timer state (seconds)
  const totalSeconds = step.durationMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(true);
  const [rescuesUsed, setRescuesUsed] = useState(0);

  // Companion dialogue & state
  const [companionCheer, setCompanionCheer] = useState<string>(
    `เรากำลังนั่งทำไปด้วยกันนะ! ทำตามจังหวะของตัวเองเลย ไม่ต้องรีบ`
  );
  const [companionAction, setCompanionAction] = useState<string>(companion.routineAction);
  const [isAiCheering, setIsAiCheering] = useState(false);

  // Ambient sound selector
  const [ambientType, setAmbientType] = useState<'rain' | 'breeze' | 'whitenoise' | 'none'>('rain');

  // Distraction Rescue modal state
  const [showRescueModal, setShowRescueModal] = useState(false);
  const [rescueTimer, setRescueTimer] = useState(60);
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('in');

  // Start ambient sound on mount
  useEffect(() => {
    sounds.startAmbient(ambientType);
    return () => {
      sounds.stopAmbient();
    };
  }, [ambientType]);

  // Main countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            sounds.playTimerDing();
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  // Fetch companion encouraging cheer periodically
  const fetchCheer = async (state: 'working' | 'distracted' | 'completed' = 'working') => {
    setIsAiCheering(true);
    try {
      const res = await fetch('/api/gemini/companion-cheer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companionName: companion.name,
          companionPersonality: companion.personality,
          taskTitle: step.title,
          state,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.cheer) setCompanionCheer(data.cheer);
        if (data.companionAction) setCompanionAction(data.companionAction);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiCheering(false);
    }
  };

  // Breathing rescue cycle
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showRescueModal && rescueTimer > 0) {
      interval = setInterval(() => {
        setRescueTimer((prev) => {
          const next = prev - 1;
          const cycle = (60 - next) % 12;
          if (cycle < 4) setBreathPhase('in');
          else if (cycle < 8) setBreathPhase('hold');
          else setBreathPhase('out');
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showRescueModal, rescueTimer]);

  const handleOpenRescue = () => {
    sounds.playSoftClick();
    setIsActive(false);
    setRescuesUsed((prev) => prev + 1);
    setRescueTimer(60);
    setBreathPhase('in');
    setShowRescueModal(true);
    fetchCheer('distracted');
  };

  const handleCloseRescue = () => {
    sounds.playSoftClick();
    setShowRescueModal(false);
    setIsActive(true);
    setCompanionCheer('หายใจสดชื่นแล้ว ลุยต่อแบบชิลล์ๆ ได้เลยนะ!');
  };

  const handleComplete = () => {
    sounds.playChime();
    onFinishStep(step, rescuesUsed);
  };

  // Format time mm:ss
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressRatio = totalSeconds > 0 ? (totalSeconds - secondsLeft) / totalSeconds : 1;
  const strokeDashoffset = 565 - 565 * progressRatio;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-4">
      
      {/* Top Bar inside Focus Screen */}
      <div className="w-full max-w-4xl flex items-center justify-between text-white/80 py-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Focus Mode เปิดทำงาน • สิ่งเร้าถูกล็อกไว้</span>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors flex items-center gap-1.5"
        >
          <X className="w-4 h-4" />
          <span>ออกจากโหมดโฟกัส</span>
        </button>
      </div>

      {/* Main Focus Container */}
      <div className="w-full max-w-3xl bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Current Task Banner */}
        <div className="relative z-10 max-w-xl mx-auto mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block mb-2">
            กำลังโฟกัสสเต็ปนี้
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            {step.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {step.detail}
          </p>
        </div>

        {/* AI Companion Role Model Avatar & Speech */}
        <div className="relative z-10 my-4 flex flex-col items-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-5xl sm:text-6xl shadow-xl shadow-amber-500/20 animate-float border-2 border-white/20">
              {companion.avatar}
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-xs">
              เพื่อนคู่คิด
            </div>
          </div>

          <div className="mt-3 text-xs font-semibold text-amber-300/90 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{companion.name}: {companionAction}</span>
          </div>

          {/* Speech Bubble */}
          <div className="mt-2.5 max-w-md p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs sm:text-sm text-amber-100 font-medium relative animate-in fade-in duration-300">
            "{companionCheer}"
          </div>
        </div>

        {/* Circular Countdown Ring */}
        <div className="relative z-10 my-6 flex flex-col items-center">
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="120"
                cy="120"
                r="90"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="120"
                cy="120"
                r="90"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="565"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-amber-400 transition-all duration-1000 ease-linear"
                fill="transparent"
              />
            </svg>

            {/* Time inside circle */}
            <div className="absolute flex flex-col items-center">
              <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-wider">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <span className="text-xs text-slate-400 font-medium mt-1">
                {isActive ? '⏱️ กำลังจับเวลาสมาธิ' : '⏸️ หยุดชั่วคราว'}
              </span>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => {
                sounds.playSoftClick();
                setIsActive(!isActive);
              }}
              className="px-5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border border-white/20 active:scale-95"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isActive ? 'พักชั่วคราว' : 'ทำต่อ'}</span>
            </button>

            <button
              onClick={() => {
                sounds.playSoftClick();
                setSecondsLeft(totalSeconds);
              }}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all border border-white/10"
              title="เริ่มนับเวลาใหม่"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleComplete}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 active:scale-95"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>ทำสเต็ปนี้เสร็จแล้ว! ✨</span>
            </button>
          </div>
        </div>

        {/* Ambient Sounds & Distraction Blocker bar */}
        <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Distraction Blocker Status */}
          <div className="flex items-center gap-2 text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-sm">🛡️</span>
              <span>ล็อก TikTok, YouTube, เกมชั่วคราว</span>
            </div>
          </div>

          {/* Ambient Sound Selector */}
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 mr-1">เสียงบรรยากาศ:</span>
            {[
              { id: 'rain', label: '🌧️ ฝนพรำ' },
              { id: 'breeze', label: '🍃 สายลม' },
              { id: 'whitenoise', label: '📻 คลื่นผ่อนคลาย' },
              { id: 'none', label: '🔇 ปิดเสียง' },
            ].map((snd) => (
              <button
                key={snd.id}
                onClick={() => {
                  setAmbientType(snd.id as any);
                  sounds.playSoftClick();
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  ambientType === snd.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/15 text-slate-300'
                }`}
              >
                {snd.label}
              </button>
            ))}
          </div>

          {/* Distraction Rescue Button (ADHD Life Saver) */}
          <button
            onClick={handleOpenRescue}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-gentle-pulse" />
            <span>เริ่มว่อกแว่ก? กดตรงนี้เพื่อรีเซ็ต 🆘</span>
          </button>
        </div>
      </div>

      {/* Distraction Rescue / 60-Second Breathing Reset Modal */}
      {showRescueModal && (
        <div className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center relative overflow-hidden shadow-2xl animate-in zoom-in-95">
            
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-400 flex items-center justify-center mx-auto text-2xl mb-3">
              <Wind className="w-6 h-6 text-indigo-400 animate-spin-slow" />
            </div>

            <h3 className="text-xl font-bold font-display text-white">
              หายใจลึกๆ รีเซ็ตสมาธิ 60 วินาที
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              ไม่ต้องกังวลนะ! สมาธิหลุดเป็นเรื่องธรรมชาติของสมอง แค่กลับมาอยู่กับลมหายใจ
            </p>

            {/* Breathing Circle Animation */}
            <div className="my-6 relative flex items-center justify-center">
              <div
                className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-1000 ${
                  breathPhase === 'in'
                    ? 'scale-125 bg-gradient-to-tr from-sky-500/30 to-indigo-500/40 border-4 border-sky-400'
                    : breathPhase === 'hold'
                    ? 'scale-125 bg-gradient-to-tr from-indigo-500/30 to-purple-500/40 border-4 border-indigo-400'
                    : 'scale-90 bg-gradient-to-tr from-slate-700/30 to-slate-800/40 border-4 border-slate-500'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-white">
                    {breathPhase === 'in' && '🌬️ หายใจเข้าช้าๆ'}
                    {breathPhase === 'hold' && '✨ กักลมหายใจไว้'}
                    {breathPhase === 'out' && '🍃 ค่อยๆ ผ่อนลมออก'}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-mono">
                    เหลือ {rescueTimer} วิ
                  </div>
                </div>
              </div>
            </div>

            {/* 5-4-3-2-1 Sensory Grounding Tip */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-indigo-200 text-left">
              <strong>💡 เทคนิคดึงสติ (Grounding):</strong>
              <div className="mt-1 text-[11px] text-slate-300 space-y-0.5">
                <div>• มองหาของสีฟ้าหรือสีเขียว 2 อย่างรอบตัว</div>
                <div>• สัมผัสโต๊ะหรือเก้าอี้ที่นั่งอยู่ให้รู้ตัว</div>
                <div>• จิบน้ำสักอึก แล้วค่อยเริ่มใหม่</div>
              </div>
            </div>

            <button
              onClick={handleCloseRescue}
              className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/30 hover:opacity-90 active:scale-95 transition-all"
            >
              รู้สึกสงบขึ้นแล้ว พร้อมกลับไปลุยต่อ!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
