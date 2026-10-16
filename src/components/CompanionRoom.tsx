import React, { useState } from 'react';
import { Companion } from '../types';
import { COMPANIONS } from '../utils/storage';
import { sounds } from '../utils/soundEffects';
import { Sparkles, Heart, MessageSquare, Check, UserCheck, Smile } from 'lucide-react';

interface CompanionRoomProps {
  selectedCompanion: Companion;
  onSelectCompanion: (companion: Companion) => void;
  childName: string;
  onUpdateChildName: (name: string) => void;
}

export const CompanionRoom: React.FC<CompanionRoomProps> = ({
  selectedCompanion,
  onSelectCompanion,
  childName,
  onUpdateChildName,
}) => {
  const [editingName, setEditingName] = useState(childName);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'companion'; text: string }[]>([
    {
      sender: 'companion',
      text: `สวัสดีจ้า ${childName}! เราคือ ${selectedCompanion.name} วันนี้อยากให้เรานั่งทำการบ้านหรือจัดกระเป๋าเป็นเพื่อนไหม?`,
    },
  ]);
  const [isSending, setIsSending] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingName.trim()) {
      onUpdateChildName(editingName.trim());
      sounds.playSoftClick();
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage.trim();
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatMessage('');
    setIsSending(true);
    sounds.playSoftClick();

    try {
      const res = await fetch('/api/gemini/companion-cheer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companionName: selectedCompanion.name,
          companionPersonality: selectedCompanion.personality,
          taskTitle: userText,
          state: 'working',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setChatHistory((prev) => [
          ...prev,
          { sender: 'companion', text: data.cheer || 'เราอยู่เคียงข้างเธอเสมอนะคนเก่ง สู้ไปด้วยกัน!' },
        ]);
        sounds.playChime();
      }
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'companion', text: 'ฮึบๆ นะคนเก่ง ค่อยๆ ทำทีละก้าว ดอกไม้ในสวนรอโตอยู่นะ!' },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
      
      {/* Companion Selection Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span>🐾 ห้องเพื่อนคู่คิด AI (Role Model Companion)</span>
          </h3>
          <p className="text-xs text-slate-500">
            เลือกเพื่อนคู่คิดที่จะทำกิจกรรมข้างๆ และให้กำลังใจเชิงบวกตลอดการโฟกัส
          </p>
        </div>

        {/* Child Name Input */}
        <form onSubmit={handleSaveName} className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">ชื่อเด็ก:</label>
          <input
            type="text"
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:border-amber-400 outline-hidden w-28 sm:w-36"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all"
          >
            บันทึก
          </button>
        </form>
      </div>

      {/* Companion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {COMPANIONS.map((c) => {
          const isSelected = selectedCompanion.id === c.id;

          return (
            <button
              key={c.id}
              onClick={() => {
                sounds.playSoftClick();
                onSelectCompanion(c);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-400 bg-amber-50/50 shadow-sm ring-2 ring-amber-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-100 to-rose-100 flex items-center justify-center text-3xl shadow-xs">
                  {c.avatar}
                </div>
                {isSelected && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" />
                    กำลังร่วมทาง
                  </span>
                )}
              </div>

              <div className="mt-3">
                <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                <div className="text-[11px] text-amber-700 font-medium">{c.title}</div>
                <p className="text-[11px] text-slate-500 mt-1">
                  <strong>นิสัย:</strong> {c.personality}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 italic">
                "{c.quote}"
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Companion Routine Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-3xl shrink-0 shadow-sm animate-gentle-pulse">
          {selectedCompanion.avatar}
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold text-amber-900">
            กิจวัตรปัจจุบันของ {selectedCompanion.name} (Role Model Routine):
          </div>
          <div className="text-sm font-semibold text-slate-800 mt-0.5">
            "{selectedCompanion.routineAction}"
          </div>
        </div>
      </div>

      {/* Mini Interactive Positive Dialogue */}
      <div className="pt-2">
        <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
          <span>คุยหรือขอกำลังใจจาก {selectedCompanion.name} ได้ตลอดเวลา</span>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'companion' && (
                <span className="text-lg shrink-0">{selectedCompanion.avatar}</span>
              )}
              <div
                className={`max-w-[80%] px-3.5 py-2 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-white rounded-tr-xs font-medium'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isSending && (
            <div className="text-slate-400 italic text-[11px]">
              {selectedCompanion.name} กำลังพิมพ์ตอบ...
            </div>
          )}
        </div>

        <form onSubmit={handleSendChat} className="mt-2.5 flex items-center gap-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder={`พิมพ์ทักทาย เช่น "วันนี้ไม่อยากเริ่มเลขเลย", "ขอกำลังใจหน่อย"...`}
            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-amber-400 outline-hidden"
          />
          <button
            type="submit"
            disabled={isSending || !chatMessage.trim()}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs"
          >
            ส่ง
          </button>
        </form>
      </div>
    </div>
  );
};
