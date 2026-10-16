import React from 'react';
import { Play, CheckCircle, Clock, Lightbulb, Droplet, Sun, Sparkles, ChevronRight, PlusCircle, CheckCircle2 } from 'lucide-react';
import { GoalPlan, MicroStep } from '../types';
import { sounds } from '../utils/soundEffects';

interface MicroTaskListProps {
  plan: GoalPlan | null;
  onStartFocus: (step: MicroStep) => void;
  onOpenTaskModal: () => void;
  onToggleCompleteManual: (stepId: string) => void;
}

export const MicroTaskList: React.FC<MicroTaskListProps> = ({
  plan,
  onStartFocus,
  onOpenTaskModal,
  onToggleCompleteManual,
}) => {
  if (!plan) {
    return (
      <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-8 border border-amber-100 shadow-sm text-center max-w-xl mx-auto my-6">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-3xl mb-4 animate-gentle-pulse">
          🎯
        </div>
        <h3 className="text-xl font-bold font-display text-slate-800">
          ยังไม่มีภารกิจที่กำลังโฟกัส
        </h3>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
          เริ่มต้นด้วยการให้ AI ช่วยย่อยงานใหญ่ เช่น ทำการบ้าน จัดกระเป๋า หรืออ่านหนังสือ ให้เป็นสเต็ปเล็กๆ ทำง่ายทันที
        </p>
        <button
          onClick={onOpenTaskModal}
          className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-sm shadow-md shadow-amber-200 hover:shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>เริ่มย่อยงานใหม่ด้วย AI</span>
        </button>
      </div>
    );
  }

  const completedCount = plan.steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / plan.steps.length) * 100);

  // Find the first uncompleted step as active recommended step
  const activeStep = plan.steps.find((s) => !s.completed);

  return (
    <div className="space-y-6">
      
      {/* Plan Header Card */}
      <div className="relative bg-gradient-to-r from-amber-400/90 via-amber-300/80 to-rose-300/90 rounded-3xl p-6 sm:p-7 shadow-sm border border-amber-200 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/80 text-amber-900 text-xs font-bold shadow-xs">
                🎯 ภารกิจหลัก
              </span>
              <span className="text-xs font-semibold text-slate-700 bg-amber-100/60 px-2.5 py-0.5 rounded-full">
                ~{plan.estimatedTotalMinutes} นาที
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mt-2">
              {plan.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1 max-w-xl">
              {plan.description}
            </p>
          </div>

          <button
            onClick={onOpenTaskModal}
            className="self-start md:self-auto px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-800 text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>เปลี่ยน/ย่อยงานใหม่</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="relative z-10 mt-5 pt-4 border-t border-amber-900/10">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
            <span>ความคืบหน้ารวม: {completedCount} จาก {plan.steps.length} สเต็ป</span>
            <span>{progressPercent}% สำเร็จแล้ว</span>
          </div>
          <div className="h-3.5 bg-white/70 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Decorative Mascot speech */}
        <div className="relative z-10 mt-4 p-3 rounded-2xl bg-white/75 backdrop-blur-xs border border-white/60 flex items-center gap-3 text-xs text-amber-950 font-medium">
          <span className="text-2xl">🦊</span>
          <div className="flex-1">
            <span className="font-bold text-amber-900">น้องส้มจี๊ด: </span>
            {plan.encouragement}
          </div>
        </div>
      </div>

      {/* Recommended Next Step Callout (ADHD Focus: Make the very next action unmistakable) */}
      {activeStep && (
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-400 shadow-md shadow-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-amber-100/50 rounded-full blur-xl pointer-events-none" />
          
          <div className="relative z-10 space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold animate-gentle-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>สเต็ปแนะนำถัดไปที่ควรทำทันที</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {activeStep.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {activeStep.detail}
            </p>
            
            {activeStep.sensoryTip && (
              <div className="pt-1 flex items-center gap-2 text-xs font-medium text-indigo-700">
                <Lightbulb className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>{activeStep.sensoryTip}</span>
              </div>
            )}
          </div>

          <div className="relative z-10 flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {activeStep.durationMinutes} นาที
              </span>
              <span className="px-2 py-1 rounded-lg bg-sky-50 text-sky-700 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-sky-500 fill-sky-400" />
                +{activeStep.rewardWater}
              </span>
            </div>

            <button
              onClick={() => {
                sounds.playSoftClick();
                onStartFocus(activeStep);
              }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-200 hover:shadow-lg hover:from-emerald-600 hover:to-teal-600 active:scale-95 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>เข้าสู่ Focus Mode 🚀</span>
            </button>
          </div>
        </div>
      )}

      {/* All Micro-Task Steps */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <span>ตารางภารกิจย่อยในแต่ละวัน (Micro-Tasks)</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
              {plan.steps.length} ข้อ
            </span>
          </h3>
          <span className="text-xs text-slate-500">
            ทำเสร็จแล้วดอกไม้จะได้รับหยดน้ำทันที 💧
          </span>
        </div>

        <div className="grid gap-3">
          {plan.steps.map((step, idx) => {
            const isCurrent = activeStep?.id === step.id;

            return (
              <div
                key={step.id}
                className={`group p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  step.completed
                    ? 'bg-emerald-50/40 border-emerald-200 opacity-80'
                    : isCurrent
                    ? 'bg-amber-50/50 border-amber-300 shadow-xs ring-1 ring-amber-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {/* Step Index or Check icon */}
                  <button
                    onClick={() => {
                      sounds.playSoftClick();
                      onToggleCompleteManual(step.id);
                    }}
                    title={step.completed ? 'ทำเสร็จแล้ว (กดเพื่อเปลี่ยนสถานะ)' : 'กดยืนยันว่าทำเสร็จแล้ว'}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-transform active:scale-90 ${
                      step.completed
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'border-2 border-slate-300 text-slate-500 hover:border-amber-400 hover:text-amber-600'
                    }`}
                  >
                    {step.completed ? <CheckCircle2 className="w-5 h-5 text-white" /> : idx + 1}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4
                        className={`text-sm font-bold ${
                          step.completed
                            ? 'text-slate-500 line-through'
                            : 'text-slate-800'
                        }`}
                      >
                        {step.title}
                      </h4>
                      {step.completed && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                          สำเร็จแล้ว ✨
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{step.detail}</p>
                    
                    {step.sensoryTip && !step.completed && (
                      <div className="text-[11px] text-indigo-700 mt-1 flex items-center gap-1.5">
                        <Lightbulb className="w-3 h-3 text-indigo-500 shrink-0" />
                        <span>{step.sensoryTip}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Rewards & Focus Button */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {step.durationMinutes} นาที
                    </span>
                    <span className="flex items-center gap-0.5 text-sky-600 font-bold">
                      <Droplet className="w-3.5 h-3.5 fill-sky-400" />
                      +{step.rewardWater}
                    </span>
                  </div>

                  {!step.completed ? (
                    <button
                      onClick={() => {
                        sounds.playSoftClick();
                        onStartFocus(step);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs hover:shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>โฟกัส</span>
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      เสร็จสิ้น
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
