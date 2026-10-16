import React, { useState } from 'react';
import { Sparkles, X, Clock, Zap, CheckCircle2, AlertCircle, ArrowRight, Lightbulb, RefreshCw, BookmarkPlus } from 'lucide-react';
import { EnergyLevel, GoalPlan, MicroStep } from '../types';
import { sounds } from '../utils/soundEffects';

interface TaskInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePlan: (plan: GoalPlan) => void;
}

const PRESET_GOALS = [
  {
    title: 'ทำการบ้านวิชาเลข 5 ข้อ',
    category: 'การเรียน',
    icon: '📐',
    duration: 20,
    energy: 'medium' as EnergyLevel,
  },
  {
    title: 'จัดกระเป๋านักเรียนตามตารางสอน',
    category: 'กิจวัตร',
    icon: '🎒',
    duration: 10,
    energy: 'low' as EnergyLevel,
  },
  {
    title: 'อ่านหนังสือเตรียมสอบวิทยาศาสตร์ 2 หน้า',
    category: 'การเรียน',
    icon: '🔬',
    duration: 15,
    energy: 'medium' as EnergyLevel,
  },
  {
    title: 'จัดโต๊ะเขียนหนังสือและทิ้งขยะ',
    category: 'จัดระเบียบ',
    icon: '🧹',
    duration: 10,
    energy: 'low' as EnergyLevel,
  },
  {
    title: 'ฝึกเขียนคัดลายมือภาษาไทย 1 หน้า',
    category: 'ฝึกสมาธิ',
    icon: '✍️',
    duration: 15,
    energy: 'high' as EnergyLevel,
  },
  {
    title: 'อาบน้ำ แปรงฟัน และเตรียมชุดนักเรียนพรุ่งนี้',
    category: 'สุขภาพ',
    icon: '🪥',
    duration: 15,
    energy: 'low' as EnergyLevel,
  },
];

export const TaskInputModal: React.FC<TaskInputModalProps> = ({
  isOpen,
  onClose,
  onSavePlan,
}) => {
  const [goal, setGoal] = useState('');
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>('medium');
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [context, setContext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GoalPlan | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof PRESET_GOALS[0]) => {
    setGoal(preset.title);
    setDurationMinutes(preset.duration);
    setEnergyLevel(preset.energy);
    sounds.playSoftClick();
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!goal.trim()) {
      setErrorMsg('กรุณาระบุเป้าหมายหรืองานใหญ่ที่ต้องการทำ');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    sounds.playSoftClick();

    try {
      const response = await fetch('/api/gemini/breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: goal.trim(),
          energyLevel,
          durationMinutes,
          context,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      const data = await response.json();
      const newPlan: GoalPlan = {
        id: `goal-${Date.now()}`,
        title: data.title || goal,
        description: data.description || 'ภารกิจย่อยที่จัดสรรมาให้ก้าวแรกทำได้ทันที',
        estimatedTotalMinutes: data.estimatedTotalMinutes || durationMinutes,
        encouragement: data.encouragement || 'ก้าวแรกง่ายนิดเดียว เริ่มลุยไปด้วยกันนะ!',
        energyLevel,
        createdAt: new Date().toISOString(),
        steps: (data.steps || []).map((s: Partial<MicroStep>, index: number) => ({
          id: s.id || `step-${Date.now()}-${index}`,
          title: s.title || `สเต็ปที่ ${index + 1}`,
          detail: s.detail || '',
          durationMinutes: s.durationMinutes || Math.max(3, Math.floor(durationMinutes / 3)),
          rewardWater: s.rewardWater || 20,
          rewardSun: s.rewardSun || 15,
          sensoryTip: s.sensoryTip || 'จิบน้ำ 1 อึกแล้วหายใจเข้าลึกๆ',
          completed: false,
        })),
      };

      setGeneratedPlan(newPlan);
      sounds.playChime();
    } catch (err) {
      console.error('Generation error:', err);
      setErrorMsg('ระบบขอยกตัวอย่างแผนเริ่มต้นให้ สามารถกดบันทึกเพื่อใช้งานได้ทันที');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmPlan = () => {
    if (generatedPlan) {
      onSavePlan(generatedPlan);
      sounds.playBloom();
      onClose();
      setGeneratedPlan(null);
      setGoal('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-amber-100 overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-amber-400 via-rose-300 to-rose-400 text-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-xs flex items-center justify-center text-amber-600 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900">
                  ระบบรับข้อมูลและแบ่งงาน (AI Micro-Tasking)
                </h2>
                <p className="text-xs text-slate-700 font-medium">
                  ย่อยงานชิ้นใหญ่ให้กลายเป็นสเต็ปจิ๋ว ลดแรงกดดัน ไม่ให้เด็กสมาธิสั้นรู้สึกล้า
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/40 hover:bg-white/80 text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {!generatedPlan ? (
            <form onSubmit={handleGenerate} className="space-y-5">
              
              {/* Presets Row */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  ⚡ เลือกเป้าหมายยอดนิยม (กดเลือกได้ทันที)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_GOALS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className={`text-left p-2.5 rounded-2xl border text-xs transition-all flex items-center gap-2.5 ${
                        goal === p.title
                          ? 'border-amber-400 bg-amber-50/80 font-semibold text-amber-950 shadow-xs'
                          : 'border-slate-200 hover:border-amber-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-lg">{p.icon}</span>
                      <div className="flex-1 truncate">
                        <div className="truncate font-medium">{p.title}</div>
                        <div className="text-[10px] text-slate-500">{p.duration} นาที • {p.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  🎯 เป้าหมายใหญ่ที่ต้องทำให้สำเร็จ (ผู้ปกครองหรือเด็กพิมพ์ได้เลย)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="เช่น ทำการบ้านวิชาเลข 5 ข้อ, จัดของเล่นในห้อง, ท่องศัพท์ภาษาอังกฤษ..."
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-hidden transition-all text-sm font-medium text-slate-800 placeholder:text-slate-400"
                  />
                  {goal && (
                    <button
                      type="button"
                      onClick={() => setGoal('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Energy Level Selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>🔋 ระดับพลังงานของเด็กในตอนนี้</span>
                  <span className="text-xs text-slate-500 font-normal">AI จะปรับขนาดสเต็ปให้เข้ากับพลังงาน</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'high', label: 'พลังเต็มเปี่ยม', icon: '⚡', desc: 'พร้อมลุย สเต็ปยาวได้หน่อย' },
                    { id: 'medium', label: 'พลังปานกลาง', icon: '🌿', desc: 'ระดับปกติ สเต็ปสั้นสบายๆ' },
                    { id: 'low', label: 'เริ่มล้า/พลังน้อย', icon: '🪫', desc: 'สเต็ปจิ๋วพิเศษ เริ่มง่ายสุดๆ' },
                  ].map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => {
                        setEnergyLevel(level.id as EnergyLevel);
                        sounds.playSoftClick();
                      }}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${
                        energyLevel === level.id
                          ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xl mb-1">{level.icon}</div>
                      <div className="text-xs font-bold text-slate-800">{level.label}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Duration Slider */}
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-800 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    เวลาที่มีโดยประมาณสำหรับภารกิจนี้
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                    {durationMinutes} นาที
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="45"
                  step="5"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>5 นาที (งานจิ๋ว)</span>
                  <span>20 นาที (แนะนำสำหรับเด็กสมาธิสั้น)</span>
                  <span>45 นาที</span>
                </div>
              </div>

              {/* Context / Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  💡 ข้อมูลเพิ่มเติมสำหรับ AI (ถ้ามี เช่น "น้องไม่ชอบเขียนยาวๆ", "เป็นวิชาที่น้องเครียดง่าย")
                </label>
                <input
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="เช่น ต้องการให้เน้นสเต็ปสั้น ไม่เกิน 5 นาทีต่อข้อ..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 outline-hidden focus:border-amber-400"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || !goal.trim()}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-sm shadow-md shadow-amber-200 hover:shadow-lg hover:from-amber-600 hover:to-rose-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AI กำลังวิเคราะห์และซอยย่อยงานอย่างเหมาะสม...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>ให้ AI ช่วยซอยย่อยงาน (Micro-Tasking)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Generated Plan Preview & Confirmation */
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                      แผนภารกิจย่อยที่สร้างเสร็จแล้ว
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{generatedPlan.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{generatedPlan.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-amber-700 block">
                      รวม ~{generatedPlan.estimatedTotalMinutes} นาที
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {generatedPlan.steps.length} สเต็ปย่อย
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-white/80 border border-amber-100 flex items-center gap-2 text-xs text-amber-900 font-medium">
                  <span className="text-base">🦊</span>
                  <span>{generatedPlan.encouragement}</span>
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  สเต็ปการทำงานทีละก้าว (Micro-Tasks)
                </div>
                {generatedPlan.steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-amber-300 transition-all flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-800">{step.title}</h4>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                          ⏱️ {step.durationMinutes} นาที
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{step.detail}</p>
                      
                      {step.sensoryTip && (
                        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-indigo-700 bg-indigo-50/70 px-2.5 py-1 rounded-lg border border-indigo-100">
                          <Lightbulb className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
                          <span><strong>ADHD Tip:</strong> {step.sensoryTip}</span>
                        </div>
                      )}

                      <div className="mt-2 flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                        <span className="flex items-center gap-1 text-sky-600">
                          💧 +{step.rewardWater} หยดน้ำ
                        </span>
                        <span className="flex items-center gap-1 text-amber-600">
                          ☀️ +{step.rewardSun} แสงแดด
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setGeneratedPlan(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  ปรับแต่งใหม่
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPlan}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-200 hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>บันทึกและเริ่มโฟกัสแผนนี้เลย!</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
