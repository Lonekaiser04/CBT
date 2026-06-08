# CBT Model Test Paper — BA LL.B 2026

A fully functional Computer-Based Test (CBT) portal for the BA LL.B Model Test Paper 2026, built with plain HTML, CSS, and JavaScript.

---

## Features

- **Scheduled Exam Gate** — site auto-locks before and after the exam window
- **Live Countdown** — shows time remaining until exam opens
- **70-minute Timer** — auto-submits when time runs out, warnings at 10/5/1 min
- **Question Palette** — colour-coded navigation across all 60 questions
- **Negative Marking** — −0.25 per wrong answer
- **Google Sheets Backend** — all responses saved automatically via Google Apps Script
- **Results Page** — locked until release date, then shows answer key + personal score checker
- **Fully Responsive** — mobile, tablet, and desktop

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML · CSS · JavaScript |
| Backend | Google Apps Script |
| Storage | Google Sheets |

## Files

```
index.html      → Exam portal (registration + exam + submission)
results.html    → Answer key & results (locked until release date)
script.js       → All exam logic + scheduling
style.css       → Responsive styling
```

## Configuration

All settings are at the top of `script.js`:
```js
const EXAM_CONFIG = {
  year: 2026, month: 5, day: 10,   // Exam date
  startHour: 10, startMinute: 0,   // 10:00 AM IST
  durationMinutes: 70,
};
```

Results release date is in `results.html` → `RESULTS_CONFIG`.

## Exam Structure

- **60 Questions · 60 Marks · 70 Minutes**
- 15 Sections: History · Polity · Geography · Economics · Science · IT · Current Affairs (IN & World) · Maths · Statistics · English · Logical Reasoning · Analytical Reasoning · Legal Aptitude · Sports

---

*CBT Model Test Paper for BA LL.B · Prepared as per official syllabus and pattern · By Kaiser Mohiuddin*
