import React, { useState } from 'react';
import { Droplet, Sun, Sparkles, Plus, Award, Info, Heart, Flower, ArrowUpRight } from 'lucide-react';
import { GardenPlot, FlowerSpecies, GardenVisitor } from '../types';
import { FLOWER_SPECIES, GARDEN_VISITORS } from '../utils/storage';
import { sounds } from '../utils/soundEffects';

interface BloomGardenProps {
  plots: GardenPlot[];
  water: number;
  sun: number;
  gardenLevel: number;
  onWaterPlot: (plotId: number) => void;
  onSunPlot: (plotId: number) => void;
  onPlantSeed: (plotId: number, speciesId: string) => void;
  onUnlockPlot: (plotId: number) => void;
}

export const BloomGarden: React.FC<BloomGardenProps> = ({
  plots,
  water,
  sun,
  gardenLevel,
  onWaterPlot,
  onSunPlot,
  onPlantSeed,
  onUnlockPlot,
}) => {
  const [selectedPlotForPlanting, setSelectedPlotForPlanting] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'garden' | 'species' | 'visitors'>('garden');

  const getStageVisual = (plot: GardenPlot) => {
    if (!plot.flowerId) return { icon: '🌱', label: 'แปลงว่าง (พร้อมปลูก)', percent: 0 };
    switch (plot.stage) {
      case 1:
        return { icon: '🌰', label: 'เมล็ดพันธุ์กำลังหลับใหล', percent: 20 };
      case 2:
        return { icon: '🌱', label: 'ต้นกล้าเล็กเริ่มผลิใบ', percent: 45 };
      case 3:
        return { icon: '🌷', label: 'ดอกตูมกำลังสะสมพลัง', percent: 70 };
      case 4:
        return { icon: plot.speciesIcon || '🌸', label: 'ดอกบานสะพรั่งงดงาม!', percent: 100 };
      case 5:
        return { icon: '✨' + (plot.speciesIcon || '🌸'), label: 'ดอกไม้ทองคำระดับตำนาน!', percent: 100 };
      default:
        return { icon: '🌱', label: 'ต้นกล้า', percent: 20 };
    }
  };

  const handleWaterClick = (plotId: number) => {
    if (water < 10) {
      sounds.playSoftClick();
      alert('ต้องการหยดน้ำอย่างน้อย 10 หยด! ทำภารกิจย่อยเพิ่มเพื่อสะสมหยดน้ำนะจ๊ะ 💧');
      return;
    }
    sounds.playWaterDrop();
    onWaterPlot(plotId);
  };

  const handleSunClick = (plotId: number) => {
    if (sun < 10) {
      sounds.playSoftClick();
      alert('ต้องการแสงแดดอย่างน้อย 10 หน่วย! โฟกัสทำงานเพิ่มเพื่อรับแสงแดดนะ ☀️');
      return;
    }
    sounds.playBloom();
    onSunPlot(plotId);
  };

  return (
    <div className="space-y-6">
      
      {/* Garden Header Card */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-15 text-9xl transform translate-x-8 translate-y-8 pointer-events-none">
          🌻
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ระบบสวนดอกไม้ให้รางวัล (Gamification & Dopamine Loop)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display mt-2">
              สวนดอกไม้แห่งการจดจ่อ เลเวล {gardenLevel} 🌸
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
              ทุกภารกิจย่อยที่ทำสำเร็จ จะกลายเป็นหยดน้ำและแสงแดดที่ช่วยให้ดอกไม้ในสวนเติบโตบานสะพรั่งและดึงดูดเพื่อนสัตว์น่ารักๆ เข้ามาเยี่ยม
            </p>
          </div>

          {/* Currencies Pill Box */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 self-start md:self-auto">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-sky-200 text-xs font-bold">
                <Droplet className="w-4 h-4 fill-sky-300" />
                <span>หยดน้ำ</span>
              </div>
              <div className="text-xl font-black text-white">{water}</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-amber-200 text-xs font-bold">
                <Sun className="w-4 h-4 fill-amber-300" />
                <span>แสงแดด</span>
              </div>
              <div className="text-xl font-black text-white">{sun}</div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-6 pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="font-semibold text-emerald-100">
            🌱 ความอุดมสมบูรณ์ของสวน: ปลูกและดูแลดอกไม้เพื่อปลดล็อกสัตว์ผู้มาเยือนตัวใหม่
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-200">เลเวลถัดไป: สวนแฟนตาซี เลเวล {gardenLevel + 1}</span>
          </div>
        </div>
      </div>

      {/* Garden Sub Tabs */}
      <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('garden');
              sounds.playSoftClick();
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'garden'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            🏡 แปลงดอกไม้ของฉัน ({plots.length} แปลง)
          </button>

          <button
            onClick={() => {
              setActiveTab('visitors');
              sounds.playSoftClick();
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'visitors'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            🐾 สัตว์ผู้มาเยือน ({GARDEN_VISITORS.filter((v) => v.unlocked || gardenLevel >= v.minGardenLevel).length}/{GARDEN_VISITORS.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('species');
              sounds.playSoftClick();
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'species'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            📖 สมุดสายพันธุ์ดอกไม้
          </button>
        </div>
      </div>

      {/* Tab 1: Garden Plots Grid */}
      {activeTab === 'garden' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plots.map((plot) => {
            const visual = getStageVisual(plot);
            const isFullBloom = plot.stage >= 4;

            if (!plot.isUnlocked) {
              return (
                <div
                  key={plot.id}
                  className="bg-amber-50/40 rounded-3xl p-6 border-2 border-dashed border-amber-200 flex flex-col items-center justify-center text-center min-h-[260px]"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-xl mb-3">
                    🔒
                  </div>
                  <h4 className="font-bold text-slate-700 text-sm">แปลงเพาะปลูกที่ {plot.id}</h4>
                  <p className="text-xs text-slate-500 mt-1">ปลดล็อกเมื่อสวนถึงเลเวล {gardenLevel + 1}</p>
                  <button
                    onClick={() => {
                      sounds.playSoftClick();
                      onUnlockPlot(plot.id);
                    }}
                    className="mt-4 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all"
                  >
                    ปลดล็อกตอนนี้ (ใช้ 50 💧)
                  </button>
                </div>
              );
            }

            return (
              <div
                key={plot.id}
                className={`bg-white rounded-3xl p-5 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isFullBloom
                    ? 'border-emerald-300 shadow-md shadow-emerald-100 ring-2 ring-emerald-100'
                    : 'border-slate-200 shadow-xs hover:border-amber-300'
                }`}
              >
                {/* Stage Badge & Number */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    แปลงที่ {plot.id}
                  </span>
                  {isFullBloom && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 animate-gentle-pulse">
                      ✨ บานสะพรั่งแล้ว!
                    </span>
                  )}
                </div>

                {/* Main Visual Center */}
                <div className="my-5 text-center flex flex-col items-center">
                  <div
                    className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl transition-transform ${
                      isFullBloom
                        ? 'bg-gradient-to-tr from-amber-100 to-emerald-100 scale-110 shadow-sm animate-float'
                        : 'bg-amber-50/80'
                    }`}
                  >
                    {visual.icon}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mt-3">
                    {plot.flowerName || 'ยังไม่ได้เพาะเมล็ด'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{visual.label}</p>
                </div>

                {/* Progress Indicators or Plant Button */}
                {plot.flowerId ? (
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    
                    {/* Water progress bar */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                        <span className="flex items-center gap-1 text-sky-600">
                          <Droplet className="w-3 h-3 fill-sky-400" />
                          หยดน้ำ: {plot.waterCurrent}/{plot.waterTarget}
                        </span>
                        <span>{Math.min(100, Math.round((plot.waterCurrent / plot.waterTarget) * 100))}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-400 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (plot.waterCurrent / plot.waterTarget) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Sun progress bar */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                        <span className="flex items-center gap-1 text-amber-600">
                          <Sun className="w-3 h-3 fill-amber-400" />
                          แสงแดด: {plot.sunCurrent}/{plot.sunTarget}
                        </span>
                        <span>{Math.min(100, Math.round((plot.sunCurrent / plot.sunTarget) * 100))}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (plot.sunCurrent / plot.sunTarget) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => handleWaterClick(plot.id)}
                        className="py-2 px-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all"
                      >
                        <Droplet className="w-3.5 h-3.5 fill-sky-500" />
                        <span>รดน้ำ (-10)</span>
                      </button>

                      <button
                        onClick={() => handleSunClick(plot.id)}
                        className="py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all"
                      >
                        <Sun className="w-3.5 h-3.5 fill-amber-500" />
                        <span>ส่องแดด (-10)</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      sounds.playSoftClick();
                      setSelectedPlotForPlanting(plot.id);
                    }}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>เลือกเมล็ดพันธุ์เพื่อปลูก</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Garden Visitors */}
      {activeTab === 'visitors' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                🐾 สัตว์น้อยผู้มาเยือนสวนดอกไม้
              </h3>
              <p className="text-xs text-slate-500">
                เมื่อทำภารกิจสำเร็จและสวนอุดมสมบูรณ์ เพื่อนสัตว์จะแวะมาอยู่เป็นเพื่อนเด็กๆ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {GARDEN_VISITORS.map((visitor) => {
              const isUnlocked = visitor.unlocked || gardenLevel >= visitor.minGardenLevel;

              return (
                <div
                  key={visitor.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isUnlocked
                      ? 'border-emerald-200 bg-emerald-50/40 shadow-xs'
                      : 'border-slate-200 bg-slate-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-xs">
                      {isUnlocked ? visitor.avatar : '🔒'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        {visitor.name}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {isUnlocked ? 'กำลังวิ่งเล่นในสวน' : `ปลดล็อกที่ เลเวล ${visitor.minGardenLevel}`}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-2.5">{visitor.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Flower Species Encyclopedia */}
      {activeTab === 'species' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {FLOWER_SPECIES.map((species) => (
            <div
              key={species.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-3xl mb-3">
                  {species.icon}
                </div>
                <h4 className="font-bold text-slate-900 text-base">{species.name}</h4>
                <p className="text-xs text-slate-600 mt-1 italic font-serif">
                  "{species.meaning}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1 text-sky-600">
                  💧 ต้องการ {species.waterRequired}
                </span>
                <span className="flex items-center gap-1 text-amber-600">
                  ☀️ ต้องการ {species.sunRequired}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Select Seed to Plant */}
      {selectedPlotForPlanting !== null && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-amber-100 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-bold font-display text-slate-900">
              🌱 เลือกเมล็ดพันธุ์สำหรับแปลงที่ {selectedPlotForPlanting}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              เลือกดอกไม้ที่อยากปลูกเพื่อเป็นเป้าหมายในการสะสมคะแนน
            </p>

            <div className="grid grid-cols-1 gap-2.5 my-4 max-h-[60vh] overflow-y-auto">
              {FLOWER_SPECIES.map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => {
                    sounds.playBloom();
                    onPlantSeed(selectedPlotForPlanting, sp.id);
                    setSelectedPlotForPlanting(null);
                  }}
                  className="p-3 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition-all flex items-center gap-3.5 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-white flex items-center justify-center text-3xl shrink-0 shadow-xs">
                    {sp.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800 text-sm">{sp.name}</div>
                    <div className="text-xs text-slate-500">{sp.meaning}</div>
                    <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 mt-1">
                      <span>💧 {sp.waterRequired} หยด</span>
                      <span>☀️ {sp.sunRequired} แสงแดด</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-100 group-hover:bg-emerald-500 text-emerald-700 group-hover:text-white flex items-center justify-center transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedPlotForPlanting(null)}
              className="w-full py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
