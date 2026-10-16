import React, { useState } from 'react';
import { Smile, Meh, Frown, Sparkles, Droplet, Sun, Check, Heart, Coffee } from 'lucide-react';
import { EmotionType, MicroStep } from '../types';
import { sounds } from '../utils/soundEffects';

interface EmotionCheckInModalProps {
  step: MicroStep;
  isOpen: boolean;
  onSaveEmotion: (emotion: EmotionType, tags: string[]) => void;
}

const EMOTIONS: { id: EmotionType; emoji: string; label: string; desc: string; color: string }[] = [
  {
    id: 'happy',
    emoji: '😊',
    label: 'มีความสุข & ภูมิใจ',
    desc: 'ทำได้ลื่นไหล ไม่เครียด สนุกดี',
    color: 'from-amber-400 to-emerald-400 border-emerald-400 bg-emerald-50/50',
  },
  {
    id: 'neutral',
    emoji: '😐',
    label: 'เฉยๆ สบายๆ',
    desc: 'งานปกติ เรื่อยๆ พอทำได้',
    color: 'from-sky-400 to-indigo-400 border-sky-400 bg-sky-50/50',
  },
  {
    id: 'stressed',
    emoji: '😫',
    label: 'รู้สึกเครียด / ยากจัง',
    desc: 'โจทย์ยาก หรือรู้สึกกดดัน',
    color: 'from-rose-400 to-red-500 border-rose-400 bg-rose-50/50',
  },
  {
    id: 'tired',
    emoji: '🥱',
    label: 'เหนื่อยล้า / พลังหมด',
    desc: 'ตาเริ่มล้า อยากพักเบรกแล้ว',
    color: 'from-purple-400 to-slate-500 border-purple-400 bg-purple-50/50',
  },
];

const QUICK_TAGS = [
  '⚡ เริ่มได้เร็วมาก',
  '🎧 ชอบเสียงคลื่น/ฝน',
  '🧠 โจทย์ยาวไปนิด',
  '🧃 อยากดื่มน้ำพักเบรก',
  '💪 ภูมิใจในตัวเอง',
];

export const EmotionCheckInModal: React.FC<EmotionCheckInModalProps> = ({
  step,
  isOpen,
  onSaveEmotion,
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>('happy');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    sounds.playSoftClick();
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleConfirm = () => {
    sounds.playBloom();
    onSaveEmotion(selectedEmotion, selectedTags);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-amber-100 shadow-2xl text-center relative overflow-hidden animate-in zoom-in-95">
        
        {/* Top Celebration Banner */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-3xl mx-auto shadow-md shadow-amber-200 animate-gentle-pulse">
          🎉
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-4">
          ยอดเยี่ยมมาก! สำเร็จไปอีก 1 สเต็ปแล้ว
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          "{step.title}"
        </p>

        {/* Immediate Dopamine Reward Cards */}
        <div className="grid grid-cols-2 gap-3 my-5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
          <div className="flex items-center justify-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <Droplet className="w-5 h-5 fill-sky-400" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-slate-500 font-medium">ได้รับรางวัล</div>
              <div className="text-sm font-black text-sky-700">+{step.rewardWater} หยดน้ำ 💧</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Sun className="w-5 h-5 fill-amber-400" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-slate-500 font-medium">พลังงานธรรมชาติ</div>
              <div className="text-sm font-black text-amber-700">+{step.rewardSun} แสงแดด ☀️</div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="text-sm font-bold text-slate-800 mb-3">
          ตอนนี้รู้สึกยังไงบ้างกับการทำสเต็ปนี้? (เลือก 1 อารมณ์)
        </div>

        {/* Emotion Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          {EMOTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sounds.playSoftClick();
                setSelectedEmotion(item.id);
              }}
              className={`p-3 rounded-2xl border-2 text-left transition-all ${
                selectedEmotion === item.id
                  ? `${item.color} shadow-xs ring-2 ring-amber-300`
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-xs font-bold text-slate-800">{item.label}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* Quick Tag Pills */}
        <div className="mt-4 text-left">
          <div className="text-[11px] font-semibold text-slate-500 mb-1.5">
            💭 มีอะไรอยากสะท้อนเพิ่มเติมไหม? (เลือกได้หลายข้อ)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-amber-500 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-200 hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>บันทึกความรู้สึก & รับรางวัลไปดูแลสวนดอกไม้ 🌸</span>
        </button>
      </div>
    </div>
  );
};
