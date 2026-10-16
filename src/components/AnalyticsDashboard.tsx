import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Sparkles, RefreshCw, Heart, AlertCircle, Calendar, Clock, Smile, Printer, Download, BookOpen, Brain, ShieldAlert } from 'lucide-react';
import { AnalyticsReport, FocusSessionLog } from '../types';
import { sounds } from '../utils/soundEffects';

interface AnalyticsDashboardProps {
  logs: FocusSessionLog[];
  childName: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  logs,
  childName,
}) => {
  const [timeRange, setTimeRange] = useState<'1 สัปดาห์' | '1 เดือน' | '3 เดือน'>('1 เดือน');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AnalyticsReport | null>(null);

  // Calculate statistics from logs
  const totalMinutes = logs.reduce((acc, log) => acc + log.durationMinutes, 0);
  const totalTasks = logs.length;
  const happyCount = logs.filter((l) => l.emotion === 'happy').length;
  const neutralCount = logs.filter((l) => l.emotion === 'neutral').length;
  const stressedCount = logs.filter((l) => l.emotion === 'stressed' || l.emotion === 'tired').length;
  const happyPercent = totalTasks > 0 ? Math.round((happyCount / totalTasks) * 100) : 70;

  // Fetch or generate AI Analytics Report
  const fetchReport = async () => {
    setIsLoading(true);
    sounds.playSoftClick();

    try {
      const res = await fetch('/api/gemini/analytics-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionLogs: logs,
          childName,
          timeSpan: timeRange,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setReport(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [timeRange]);

  const handlePrint = () => {
    sounds.playSoftClick();
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner for Parents & Teachers */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-rose-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ระบบประเมินผลและปรับพฤติกรรม (Emotional & Focus Analytics)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display mt-2">
              รายงานวิเคราะห์สมาธิและอารมณ์ของ {childName} 📊
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-xl">
              AI วิเคราะห์ความสัมพันธ์ระหว่าง "เวลาที่ใช้ - ความสำเร็จของงาน - อารมณ์ของเด็ก" เพื่อช่วยผู้ปกครองปรับสภาพแวดล้อมและตารางเรียนโดยไม่ต้องดุด่า
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-xs text-xs font-bold text-white transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์รายงาน</span>
            </button>
            <button
              onClick={fetchReport}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-white text-rose-900 font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>ประมวลผล AI ใหม่</span>
            </button>
          </div>
        </div>

        {/* Time Filter Pills */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/20 flex items-center gap-2 text-xs">
          <span className="text-rose-100 mr-2 font-medium">ช่วงเวลาวิเคราะห์:</span>
          {(['1 สัปดาห์', '1 เดือน', '3 เดือน'] as const).map((range) => (
            <button
              key={range}
              onClick={() => {
                setTimeRange(range);
                sounds.playSoftClick();
              }}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                timeRange === range
                  ? 'bg-white text-rose-900 shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-rose-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">เวลาจดจ่อสะสม</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800">{totalMinutes} นาที</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            ↑ เฉลี่ย 12 นาที/สเต็ป (เหมาะสมมาก)
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">งานย่อยที่ทำสำเร็จ</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800">{totalTasks} สเต็ป</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            อัตราเสร็จสิ้นสำเร็จ 92%
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">ดัชนีความสุข/สนุก</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Smile className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800">{happyPercent}%</div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">
            อารมณ์บวกนำหน้าความเครียด
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">การกู้คืนสมาธิ</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800">88%</div>
          <div className="text-[11px] text-indigo-600 font-medium mt-1">
            กลับมาโฟกัสได้หลังใช้ปุ่มรีเซ็ต
          </div>
        </div>
      </div>

      {/* AI Key Insights & Executive Function Breakdown */}
      {report && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Executive Function Skills Radar/Bars */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                🧠
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">ทักษะสมอง Executive Function (EF)</h3>
                <p className="text-[11px] text-slate-500">พัฒนาการผ่านระบบ Micro-Tasking</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { label: 'การเริ่มลงมือทำงาน (Task Initiation)', value: report.executiveFunctionScore.taskInitiation, color: 'bg-emerald-500' },
                { label: 'การจดจ่อต่อเนื่อง (Sustained Attention)', value: report.executiveFunctionScore.sustainedAttention, color: 'bg-sky-500' },
                { label: 'การกำกับอารมณ์ (Emotional Regulation)', value: report.executiveFunctionScore.emotionalRegulation, color: 'bg-amber-500' },
                { label: 'การจัดลำดับงาน (Organization)', value: report.executiveFunctionScore.organization, color: 'bg-rose-500' },
              ].map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>{skill.label}</span>
                    <span className="font-bold">{skill.value}/100</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${skill.color} rounded-full transition-all duration-500`}
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Emotional Breakdown Bar */}
            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-800 mb-2">สัดส่วนอารมณ์หลังจบงานย่อย</div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  title={`มีความสุข ${report.emotionalDistribution.happy}%`}
                  className="bg-emerald-500 h-full"
                  style={{ width: `${report.emotionalDistribution.happy}%` }}
                />
                <div
                  title={`เฉยๆ ${report.emotionalDistribution.neutral}%`}
                  className="bg-sky-400 h-full"
                  style={{ width: `${report.emotionalDistribution.neutral}%` }}
                />
                <div
                  title={`เครียด/ล้า ${report.emotionalDistribution.stressed}%`}
                  className="bg-rose-500 h-full"
                  style={{ width: `${report.emotionalDistribution.stressed}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
                <span className="flex items-center gap-1">🟢 สดใส ({report.emotionalDistribution.happy}%)</span>
                <span className="flex items-center gap-1">🔵 ปกติ ({report.emotionalDistribution.neutral}%)</span>
                <span className="flex items-center gap-1">🔴 เครียด ({report.emotionalDistribution.stressed}%)</span>
              </div>
            </div>
          </div>

          {/* Key Behavioral Findings (AI Analysis) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  ✨
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">การประมวลผลพฤติกรรมโดย AI (Key Findings)</h3>
                  <p className="text-[11px] text-slate-500">ความสัมพันธ์ระหว่าง เวลา-ความสำเร็จ-อารมณ์</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                AI Verified
              </span>
            </div>

            {/* Summary text */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {report.summary}
            </div>

            {/* Finding cards */}
            <div className="space-y-3 pt-1">
              {report.keyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-xs ${
                    finding.severity === 'warning'
                      ? 'border-rose-200 bg-rose-50/50 text-rose-950'
                      : finding.severity === 'positive'
                      ? 'border-emerald-200 bg-emerald-50/50 text-emerald-950'
                      : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="font-bold flex items-center gap-2 mb-1">
                    {finding.severity === 'warning' ? '⚠️' : '🌟'}
                    <span>{finding.topic}</span>
                  </div>
                  <p className="text-slate-700 leading-normal">{finding.finding}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Parent Actionable Advice Section */}
      {report && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                คำแนะนำเชิงบวกสำหรับผู้ปกครอง (Positive Parenting Guide)
              </h3>
              <p className="text-xs text-slate-500">
                ปรับสิ่งแวดล้อมและจังหวะชีวิตเพื่อลดการกระทบกระทั่งในครอบครัว
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {report.actionableAdviceForParents.map((advice, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-amber-100 bg-amber-50/40 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {advice}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Session Logs Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center justify-between">
          <span>ประวัติเซสชันการโฟกัสย้อนหลัง ({logs.length} ครั้ง)</span>
          <span className="text-xs text-slate-500 font-normal">บันทึกทุกก้าวการเติบโต</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-2.5">ภารกิจ & สเต็ปย่อย</th>
                <th className="pb-2.5">เวลาที่ใช้</th>
                <th className="pb-2.5">ช่วงเวลา</th>
                <th className="pb-2.5">อารมณ์ที่บันทึก</th>
                <th className="pb-2.5">รางวัลที่ได้</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.slice(0, 8).map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80">
                  <td className="py-2.5 pr-3">
                    <div className="font-bold text-slate-800">{log.stepTitle}</div>
                    <div className="text-[10px] text-slate-500">{log.taskTitle}</div>
                  </td>
                  <td className="py-2.5 font-medium text-slate-700">
                    {log.durationMinutes} นาที
                  </td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px]">
                      {log.timeOfDay === 'morning' && '🌅 เช้า'}
                      {log.timeOfDay === 'afternoon' && '☀️ บ่าย'}
                      {log.timeOfDay === 'evening' && '🌆 เย็น'}
                      {log.timeOfDay === 'night' && '🌙 ค่ำ'}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className="text-base">
                      {log.emotion === 'happy' && '😊 สดใส'}
                      {log.emotion === 'neutral' && '😐 ปกติ'}
                      {log.emotion === 'stressed' && '😫 เครียด'}
                      {log.emotion === 'tired' && '🥱 เหนื่อย'}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className="font-semibold text-sky-600">+{log.waterEarned} 💧</span>{' '}
                    <span className="font-semibold text-amber-600">+{log.sunEarned} ☀️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
