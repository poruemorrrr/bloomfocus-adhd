import React from 'react';
import { ArrowRight, CheckCircle2, HeartHandshake, ShieldCheck, Smile, Sparkles, Brain, Clock, Users, Award } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ConceptExplainerProps {
  onStartMicroTask: () => void;
  onGoToGarden: () => void;
}

export const ConceptExplainer: React.FC<ConceptExplainerProps> = ({
  onStartMicroTask,
  onGoToGarden,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Concept Card */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-amber-100 mb-2">
            <HeartHandshake className="w-4 h-4 text-amber-300" />
            <span>แนวคิดนวัตกรรมช่วยเหลือเด็กสมาธิสั้น (ADHD) & เยาวชน</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
            BloomFocus: วงจร 4 ระบบเสริมสร้างทักษะชีวิตด้วยพลังบวก
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 mt-2 leading-relaxed">
            เปลี่ยนความรู้สึกท้อแท้จากการบ้านและกิจวัตรประจำวัน ให้กลายเป็นการผจญภัยในสวนดอกไม้ 
            โดยมี AI เป็นเพื่อนคู่คิดและตัวกลางประสานความสุขในครอบครัว
          </p>
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => {
              sounds.playBloom();
              onStartMicroTask();
            }}
            className="px-5 py-2.5 rounded-2xl bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-md hover:bg-amber-50 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>ทดลองย่อยงานใหญ่ด้วย AI เลย</span>
          </button>

          <button
            onClick={() => {
              sounds.playSoftClick();
              onGoToGarden();
            }}
            className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm backdrop-blur-xs transition-all flex items-center gap-2"
          >
            <span>สำรวจสวนดอกไม้และสัตว์ผู้มาเยือน 🌸</span>
          </button>
        </div>
      </div>

      {/* 4 Systems Cycle Diagram */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-1">
          🔄 โครงสร้างระบบการทำงานทั้ง 4 ส่วนที่ทำงานประสานกันเป็นวงจร
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          แต่ละระบบถูกออกแบบตามหลักประสาทวิทยาและจิตวิทยาพัฒนาการเด็ก
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          
          {/* System 1 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-white flex items-center justify-center font-black text-sm mb-3 shadow-xs">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                AI Input & Micro-Tasking
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                กรอกเป้าหมายใหญ่ แล้ว AI จะช่วยซอยย่อยเป็นสเต็ปจิ๋ว 3–10 นาที พร้อม Sensory Tips ช่วยให้เริ่มลงมือทำทันที
              </p>
            </div>
            <div className="mt-3 text-[10px] font-bold text-amber-700 bg-amber-100/60 px-2.5 py-1 rounded-lg">
              ✨ ทะลายกำแพงความกลัว
            </div>
          </div>

          {/* System 2 */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-black text-sm mb-3 shadow-xs">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                AI Companion & Focus Mode
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                มี AI น้องส้มจี๊ด/เจ้าปุยทำกิจกรรมข้างๆ เป็น Role Model จำลองบล็อกสิ่งเร้า และมีปุ่มกู้สมาธิหายใจช้าๆ 60 วิ
              </p>
            </div>
            <div className="mt-3 text-[10px] font-bold text-sky-700 bg-sky-100/60 px-2.5 py-1 rounded-lg">
              🛡️ ควบคุมสิ่งเร้า & เป็นเพื่อน
            </div>
          </div>

          {/* System 3 */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm mb-3 shadow-xs">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Gamification & Dopamine Loop
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                ทำภารกิจย่อยสำเร็จ รับหยดน้ำ 💧 และแสงแดด ☀️ ทันที นำไปรดน้ำสวนจำลองให้ดอกไม้บานสะพรั่งและดึงดูดสัตว์น่ารัก
              </p>
            </div>
            <div className="mt-3 text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-lg">
              🌸 กระตุ้นโดปามีนทางบวก
            </div>
          </div>

          {/* System 4 */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-sm mb-3 shadow-xs">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Emotional & Focus Analytics
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                บันทึก Emoji อารมณ์หลังจบงาน แล้ว AI สรุปรายงานรายเดือน วิเคราะห์ช่วงเวลาทองและแนะนำผู้ปกครองปรับเวลาให้สมดุล
              </p>
            </div>
            <div className="mt-3 text-[10px] font-bold text-rose-700 bg-rose-100/60 px-2.5 py-1 rounded-lg">
              📊 ผู้ปกครองเข้าใจลูก
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars Comparison Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-1">
          🤝 แนวคิดการช่วยเหลือเด็กสมาธิสั้น (How it Helps 3 Core Domains)
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          เปรียบเทียบวิธีการจัดการของแอปพลิเคชันกับผลลัพธ์เชิงบวกที่เด็กจะได้รับ
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-100 text-slate-700 bg-slate-50/70">
                <th className="py-3.5 px-4 font-bold rounded-l-2xl">ด้านที่ช่วยเหลือ</th>
                <th className="py-3.5 px-4 font-bold">วิธีการจัดการของแอปพลิเคชัน</th>
                <th className="py-3.5 px-4 font-bold rounded-r-2xl">ผลลัพธ์ที่ได้</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-amber-50/40 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm">
                      <Clock className="w-4 h-4" />
                    </span>
                    <div>
                      <div>การจัดการเวลา</div>
                      <div className="text-[11px] text-slate-400 font-normal">Executive Function</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-600">
                  AI ช่วยคิดและย่อยงานที่ซับซ้อนให้กลายเป็นเรื่องง่าย สเต็ปละ 3–10 นาทีที่ทำได้ทันที พร้อม Sensory Tip ประจำสเต็ป
                </td>
                <td className="py-4 px-4 font-semibold text-emerald-700">
                  ลดอาการผลัดวันประกันพรุ่ง และลดความรู้สึกท้อแท้ก่อนเริ่มงาน
                </td>
              </tr>

              <tr className="hover:bg-sky-50/40 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-sm">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <div>
                      <div>การควบคุมสิ่งเร้า</div>
                      <div className="text-[11px] text-slate-400 font-normal">Impulse Control</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-600">
                  ระบบ Focus Mode ล็อกแอปพลิเคชันอื่นที่เป็นสิ่งเร้า (TikTok/เกม) และมี AI Companion นั่งทำกิจกรรมอยู่เป็นเพื่อน
                </td>
                <td className="py-4 px-4 font-semibold text-emerald-700">
                  ลดภาวะ "ติดหน้าจอ" และช่วยยืดระยะเวลาในการจดจ่อ (Attention Span) อย่างเป็นธรรมชาติ
                </td>
              </tr>

              <tr className="hover:bg-rose-50/40 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-sm">
                      <Smile className="w-4 h-4" />
                    </span>
                    <div>
                      <div>สภาวะอารมณ์</div>
                      <div className="text-[11px] text-slate-400 font-normal">Emotional Regulation</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-600">
                  ประเมินอารมณ์ทุกวันด้วย Emoji สะท้อนความรู้สึก และ AI ปรับตารางงานไม่ให้ตึงเครียดเกินไปตามข้อมูลจริง
                </td>
                <td className="py-4 px-4 font-semibold text-emerald-700">
                  เด็กไม่รู้สึกว่าถูกบังคับ แต่รู้สึกสนุกและภูมิใจในตัวเอง (Self-esteem)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Life Changing Innovations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-1">
          🚀 นวัตกรรมนี้พัฒนาคุณภาพชีวิตเยาวชนอย่างไร?
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          ผลกระทบเชิงบวกในชีวิตจริงทั้งต่อตัวเด็กและครอบครัว
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-amber-50 to-orange-50 border border-amber-200">
            <div className="text-2xl mb-2">🌱</div>
            <h4 className="font-bold text-slate-900 text-sm">
              1. ปรับพฤติกรรมด้วยพลังบวก (Positive Reinforcement)
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              แอปไม่ได้บีบบังคับหรือมีเสียงดุด่า แต่ใช้ระบบสวนดอกไม้และ AI เพื่อนรักในการสร้างแรงจูงใจภายใน (Intrinsic Motivation) ทำให้เด็กอยากพัฒนาตัวเองอย่างยั่งยืน
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-tr from-rose-50 to-pink-50 border border-rose-200">
            <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
            <h4 className="font-bold text-slate-900 text-sm">
              2. ลดความตึงเครียดในครอบครัว (Family Harmony)
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              แอปทำหน้าที่เป็น "ตัวกลาง" ในการจัดแจงและเตือนแทน พ่อแม่ไม่ต้องคอยจ้ำจี้จ้ำไช แต่เปลี่ยนมาดูรายงานสถิติรายเดือนและร่วมชื่นชมความสำเร็จของลูก
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-tr from-indigo-50 to-purple-50 border border-indigo-200">
            <div className="text-2xl mb-2">⭐</div>
            <h4 className="font-bold text-slate-900 text-sm">
              3. สร้างทักษะชีวิตที่จำเป็น (Life Skills)
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              การฝึกจดจ่อ การบันทึกสิ่งที่ทำ และการรู้เท่าทันอารมณ์ตนเองจะกลายเป็นนิสัยติดตัวเด็กไปจนโต ช่วยให้สามารถเรียนร่วมกับผู้อื่นและทำงานในอนาคตได้อย่างมีประสิทธิภาพ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
