import React from 'react';
import { Droplet, Sun, Flame, Volume2, VolumeX, Sparkles, BookOpen, BarChart3, Flower2, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  activeTab: 'app' | 'garden' | 'analytics' | 'concept';
  setActiveTab: (tab: 'app' | 'garden' | 'analytics' | 'concept') => void;
  water: number;
  sun: number;
  streak: number;
  childName: string;
  onOpenTaskModal: () => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  water,
  sun,
  streak,
  childName,
  onOpenTaskModal,
  isMuted,
  setIsMuted,
}) => {
  const toggleSound = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sounds.playSoftClick();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Child Badge */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setActiveTab('app')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white text-2xl shadow-md shadow-amber-200 group-hover:scale-105 transition-transform">
                🌸
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-lg sm:text-xl text-slate-800 tracking-tight">BloomFocus</span>
                  <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">ADHD Care</span>
                </div>
                <div className="text-xs text-slate-500 font-medium hidden sm:block">
                  เพื่อนคู่คิด & สวนดอกไม้สร้างสมาธิ
                </div>
              </div>
            </div>

            {/* Profile Pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{childName}</span>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="flex items-center p-1 bg-amber-50/80 rounded-2xl border border-amber-100/80">
            <button
              onClick={() => {
                setActiveTab('app');
                sounds.playSoftClick();
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'app'
                  ? 'bg-white text-amber-900 shadow-sm shadow-amber-200/50 scale-100'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>ภารกิจย่อย</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('garden');
                sounds.playSoftClick();
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'garden'
                  ? 'bg-white text-amber-900 shadow-sm shadow-amber-200/50 scale-100'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flower2 className="w-4 h-4 text-emerald-500" />
              <span>สวนดอกไม้</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('analytics');
                sounds.playSoftClick();
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-white text-rose-900 shadow-sm shadow-rose-200/50 scale-100'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">วิเคราะห์สมาธิ & </span>
              <span>ผู้ปกครอง</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('concept');
                sounds.playSoftClick();
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'concept'
                  ? 'bg-white text-purple-900 shadow-sm shadow-purple-200/50 scale-100'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className="w-4 h-4 text-purple-500" />
              <span>แนวคิด & นวัตกรรม</span>
            </button>
          </nav>

          {/* Right Action: Dopamine Currencies & Sound */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Water Drops */}
            <div 
              title="หยดน้ำสะสม สำหรับรดดอกไม้" 
              className="flex items-center gap-1 px-2.5 py-1 bg-sky-50 border border-sky-200 rounded-full text-xs font-bold text-sky-700 shadow-xs"
            >
              <Droplet className="w-3.5 h-3.5 text-sky-500 fill-sky-400" />
              <span>{water}</span>
            </div>

            {/* Sun Points */}
            <div 
              title="แสงแดดสะสม ช่วยให้ดอกไม้บานเร็วขึ้น" 
              className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-700 shadow-xs"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400 animate-spin-slow" />
              <span>{sun}</span>
            </div>

            {/* Streak */}
            <div 
              title="สตรีคการทำภารกิจต่อเนื่อง" 
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-rose-50 border border-rose-200 rounded-full text-xs font-bold text-rose-700 shadow-xs"
            >
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{streak} วัน</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'เปิดเสียงเอฟเฟกต์' : 'ปิดเสียง'}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-amber-100/50 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
            </button>

            {/* Quick Micro-Task Breakdown CTA */}
            <button
              onClick={onOpenTaskModal}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-rose-200 hover:shadow-lg hover:from-amber-600 hover:to-rose-600 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>+ ย่อยงานด้วย AI</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
