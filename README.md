# BloomFocus 🌸
> **สวนดอกไม้สร้างสมาธิและเพื่อนคู่คิด AI สำหรับเด็กสมาธิสั้น (ADHD Care & Youth Executive Function)**

BloomFocus เป็นเว็บแอปพลิเคชันที่ออกแบบมาเพื่อช่วยเหลือเด็กสมาธิสั้น (ADHD) และเยาวชนในการจัดการเวลา ควบคุมสิ่งเร้า และกำกับอารมณ์ ผ่านวงจร 4 ระบบที่เชื่อมโยงกัน:

1. **ระบบรับข้อมูลและแบ่งงาน (AI Input & Micro-Tasking)**: ซอยงานใหญ่ให้เป็นสเต็ปจิ๋ว 3–10 นาที พร้อม ADHD Sensory Tip
2. **ระบบเพื่อนคู่คิดและตัวช่วยโฟกัส (AI Companion & Focus Mode)**: ตัวละคร AI (น้องส้มจี๊ด 🦊, เจ้าปุย 🐰, พี่หมีบราวนี่ 🐻) นั่งทำกิจกรรมข้างๆ เป็น Role Model, จำลองล็อกแอปสิ่งเร้า, และปุ่มกู้สมาธิฝึกหายใจช้า 60 วิ (Breathing Reset)
3. **ระบบสวนดอกไม้ให้รางวัล (Gamification & Immediate Reward)**: สะสมหยดน้ำ 💧 และแสงแดด ☀️ เพื่อรดน้ำดอกไม้ให้บานสะพรั่ง 5 ระดับ และดึงดูดสัตว์น้อยผู้มาเยือน (ผีเสื้อ, กระรอก, แมวส้ม)
4. **ระบบประเมินผลและปรับพฤติกรรม (Emotional & Focus Analytics)**: บันทึก Emoji อารมณ์หลังจบงาน และรายงานสรุปรายเดือนสำหรับผู้ปกครองเพื่อปรับตารางเวลาให้เหมาะสม

---

## 🚀 วิธีติดตั้งและรันโปรเจกต์ (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่า Environment Variables
สร้างไฟล์ `.env` ที่โฟลเดอร์หลัก:
```env
GEMINI_API_KEY="ใส่_API_KEY_ของคุณที่นี่"
PORT=3000
```
*(ขอรับ Gemini API Key ฟรีได้ที่ [Google AI Studio](https://aistudio.google.com/))*

### 3. รันเซิร์ฟเวอร์สำหรับโหมดพัฒนา (Development)
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:3000`

### 4. Build สำหรับ Production
```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Backend**: Express, Node.js (Full-stack with Vite middleware)
- **AI Engine**: `@google/genai` (Gemini 3.8 Flash)
- **Audio Synthesis**: Web Audio API (Zero external assets needed)
- **Storage**: LocalStorage with automatic seed data & state synchronization
