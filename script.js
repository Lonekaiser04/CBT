

const EXAM_CONFIG = {
  // Date: YYYY, MM (0-based: Jan=0 … Dec=11), DD
  year:   2026,
  month:  5,       // 5 = June (0-based)
  day:    12,   // Exam day; 

  // Start time in IST (24-hour format)
  startHour:   9,  // 10 = 10:00 AM
  startMinute: 0,   // 0 = on the hour

  windowMinutes: 90,   // 90-min window to log in & start

  // Exam duration per candidate (minutes)
  durationMinutes: 75,

  // Timezone offset from UTC in minutes (IST = UTC+5:30 = 330)
  tzOffsetMinutes: 330,

  // Exam display name shown on blocked screens
  examTitle: "CBT Model Test Paper — BA LL.B 2026",
  institution: "Model Test Paper for BA LL.B",
};

/* End of config ─────────────────────────────────── */

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxahS3i98dZyxbH_RwDAmJUbz8hkhbHbaX8H284hdonwbwX8-QLuY8LzTJnuZv3UkfC/exec";

/* ─── Derived schedule values (do not edit) ─────── */
function getExamWindowUTC() {
  // Build start Date in local server terms using UTC math
  const utcMs = Date.UTC(
    EXAM_CONFIG.year,
    EXAM_CONFIG.month,
    EXAM_CONFIG.day,
    EXAM_CONFIG.startHour,
    EXAM_CONFIG.startMinute,
    0, 0
  ) - EXAM_CONFIG.tzOffsetMinutes * 60 * 1000;

  const startMs = utcMs;
  const endMs   = utcMs + EXAM_CONFIG.windowMinutes * 60 * 1000;
  return { startMs, endMs };
}

/* ════════════════════════════════════════════════════
   SCHEDULE GATE — runs immediately on page load
   ════════════════════════════════════════════════════ */
(function scheduleGate() {
  const now = Date.now();
  const { startMs, endMs } = getExamWindowUTC();

  if (now < startMs) {
    showBeforeScreen(startMs);
  } else if (now > endMs) {
    showAfterScreen();
  } else {
    showRegScreen();     // Inside window — show normal exam
    startGatePoller();  // Keep checking in case tab stays open past end
  }
})();

function startGatePoller() {
  // Re-check every 30 s; auto-lock if window closes while someone is on reg screen
  const poll = setInterval(() => {
    const now = Date.now();
    const { endMs } = getExamWindowUTC();
    if (now > endMs && !examSubmitted) {
      clearInterval(poll);
      // If they haven't started, show closed screen
      const examVisible = document.getElementById("exam-screen").classList.contains("active");
      if (!examVisible) showAfterScreen();
    }
  }, 30000);
}

/* ─── Show "Exam Not Yet Open" screen ─── */
function showBeforeScreen(startMs) {
  hideAllScreens();
  document.getElementById("before-screen").classList.add("active");
  startOpenCountdown(startMs);
}

function startOpenCountdown(startMs) {
  function tick() {
    const diff = startMs - Date.now();
    if (diff <= 0) {
      // Time reached — reload page so gate re-evaluates
      location.reload();
      return;
    }
    const totalSec = Math.floor(diff / 1000);
    const d  = Math.floor(totalSec / 86400);
    const h  = Math.floor((totalSec % 86400) / 3600);
    const m  = Math.floor((totalSec % 3600) / 60);
    const s  = totalSec % 60;

    document.getElementById("cntDays").textContent  = String(d).padStart(2,"0");
    document.getElementById("cntHours").textContent = String(h).padStart(2,"0");
    document.getElementById("cntMins").textContent  = String(m).padStart(2,"0");
    document.getElementById("cntSecs").textContent  = String(s).padStart(2,"0");

    // Show scheduled time nicely
    const startDate = new Date(startMs);
    document.getElementById("scheduledDateTime").textContent =
      startDate.toLocaleString("en-IN", {
        weekday:"long", year:"numeric", month:"long", day:"numeric",
        hour:"2-digit", minute:"2-digit", timeZoneName:"short"
      });
  }
  tick();
  setInterval(tick, 1000);
}

/* ─── Show "Exam Closed / Expired" screen ─── */
function showAfterScreen() {
  hideAllScreens();
  clearInterval(timerInterval);
  document.getElementById("after-screen").classList.add("active");

  const { endMs } = getExamWindowUTC();
  const closed = new Date(endMs);
  document.getElementById("closedDateTime").textContent =
    closed.toLocaleString("en-IN", {
      weekday:"long", year:"numeric", month:"long", day:"numeric",
      hour:"2-digit", minute:"2-digit", timeZoneName:"short"
    });
}

/* ─── Show registration screen ─── */
function showRegScreen() {
  hideAllScreens();
  document.getElementById("reg-screen").classList.add("active");
}

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
}

/* ════════════════════════════════════════════════════
   ALL 60 QUESTIONS
   ════════════════════════════════════════════════════ */
const QUESTIONS = [
  // ── SECTION I: History ──
  { section:"Section I — History",
    text:"The 'Doctrine of Lapse', used by Lord Dalhousie to annex Indian princely states, was applied to which of the following territories?",
    options:["Hyderabad","Mysore","Satara","Kashmir"], correct:"C" },
  { section:"Section I — History",
    text:"Who founded the Indian National Congress in 1885?",
    options:["Dadabhai Naoroji","Bal Gangadhar Tilak","A.O. Hume","Gopal Krishna Gokhale"], correct:"C" },
  { section:"Section I — History",
    text:"The Chauri Chaura incident of 1922, which led Mahatma Gandhi to withdraw the Non-Cooperation Movement, occurred in which state?",
    options:["Bihar","Uttar Pradesh","Bengal","Punjab"], correct:"B" },
  { section:"Section I — History",
    text:"The Kalinga War (261 BCE), which transformed Emperor Ashoka into a follower of Buddhism, was fought in present-day:",
    options:["Madhya Pradesh","Andhra Pradesh","Odisha","Chhattisgarh"], correct:"C" },

  // ── SECTION II: Indian Polity ──
  { section:"Section II — Indian Polity",
    text:"Which Article of the Indian Constitution guarantees the 'Right to Constitutional Remedies', also called the 'Heart and Soul' of the Constitution by Dr. B.R. Ambedkar?",
    options:["Article 19","Article 21","Article 32","Article 44"], correct:"C" },
  { section:"Section II — Indian Polity",
    text:"The Directive Principles of State Policy in the Indian Constitution are borrowed from the Constitution of:",
    options:["United States of America","Canada","Ireland","France"], correct:"C" },
  { section:"Section II — Indian Polity",
    text:"Which of the following writs is issued by a court to quash the order of a lower court or tribunal acting beyond its jurisdiction?",
    options:["Mandamus","Habeas Corpus","Certiorari","Quo Warranto"], correct:"C" },
  { section:"Section II — Indian Polity",
    text:"Which constitutional amendment lowered the voting age in India from 21 years to 18 years?",
    options:["42nd Amendment, 1976","52nd Amendment, 1985","61st Amendment, 1988","73rd Amendment, 1992"], correct:"C" },

  // ── SECTION III: Geography ──
  { section:"Section III — Geography",
    text:"The Wular Lake, one of the largest freshwater lakes in Asia, is located in which Union Territory of India?",
    options:["Ladakh","Puducherry","Jammu & Kashmir","Lakshadweep"], correct:"C" },
  { section:"Section III — Geography",
    text:"Which river is known as the 'Sorrow of Bihar'?",
    options:["Ganga","Son","Kosi","Gandak"], correct:"C" },
  { section:"Section III — Geography",
    text:"Which of the following straits separates India from Sri Lanka?",
    options:["Hormuz Strait","Bab-el-Mandeb Strait","Palk Strait","Malacca Strait"], correct:"C" },
  { section:"Section III — Geography",
    text:"Which desert in India is also known as the 'Great Indian Desert'?",
    options:["Rann of Kutch","Thar Desert","Deccan Plateau","Cold Desert, Ladakh"], correct:"B" },

  // ── SECTION IV: Economics ──
  { section:"Section IV — Economics",
    text:"The Human Development Index (HDI) is published annually by which organisation?",
    options:["World Bank","International Monetary Fund","United Nations Development Programme (UNDP)","World Trade Organization"], correct:"C" },
  { section:"Section IV — Economics",
    text:"Which of the following best describes 'Inflation'?",
    options:["A sustained decrease in the general price level of goods and services","A sustained increase in the general price level of goods and services","An increase in a country's Gross Domestic Product","A decrease in interest rates by the central bank"], correct:"B" },
  { section:"Section IV — Economics",
    text:"Which Five Year Plan in India focused primarily on 'Garibi Hatao' (Remove Poverty) as its central theme?",
    options:["Third Five Year Plan (1961–66)","Fourth Five Year Plan (1969–74)","Fifth Five Year Plan (1974–79)","Sixth Five Year Plan (1980–85)"], correct:"C" },
  { section:"Section IV — Economics",
    text:"GST (Goods and Services Tax) in India is an example of which type of tax?",
    options:["Direct Tax","Progressive Tax","Indirect Tax","Wealth Tax"], correct:"C" },

  // ── SECTION V: Science ──
  { section:"Section V — Science",
    text:"Which vitamin is produced in the human body when skin is exposed to sunlight?",
    options:["Vitamin A","Vitamin B12","Vitamin C","Vitamin D"], correct:"D" },
  { section:"Section V — Science",
    text:"The chemical formula of Ozone is:",
    options:["O₂","O₃","CO₂","H₂O₂"], correct:"B" },
  { section:"Section V — Science",
    text:"Which part of the human eye controls the amount of light entering it?",
    options:["Retina","Cornea","Iris","Lens"], correct:"C" },
  { section:"Section V — Science",
    text:"Newton's Second Law of Motion states that Force equals:",
    options:["Mass × Velocity","Mass × Acceleration","Mass / Acceleration","Velocity / Time"], correct:"B" },

  // ── SECTION VI: Information Technology ──
  { section:"Section VI — Information Technology",
    text:"Which of the following is the full form of 'Wi-Fi'?",
    options:["Wired Fidelity","Wireless Fidelity","Wide Frequency","Wireless Frequency Interface"], correct:"B" },
  { section:"Section VI — Information Technology",
    text:"Which of the following is NOT an example of an Operating System?",
    options:["Windows 11","Android","Linux","Microsoft Word"], correct:"D" },
  { section:"Section VI — Information Technology",
    text:"What does 'CPU' stand for in computing?",
    options:["Central Process Unit","Central Processing Unit","Computer Processing Unit","Core Processing Utility"], correct:"B" },
  { section:"Section VI — Information Technology",
    text:"Which of the following file formats is associated with compressed archive files?",
    options:[".docx",".mp3",".zip",".html"], correct:"C" },

  // ── SECTION VII: Current Affairs — India ──
  { section:"Section VII — Current Affairs: India",
    text:"Operation Sindoor (May 2025) was a military strike launched by India targeting terrorist infrastructure in:",
    options:["Afghanistan and Pakistan","Pakistan and Pakistan-Occupied Kashmir","Bangladesh and Myanmar","China-occupied Aksai Chin"], correct:"B" },
  { section:"Section VII — Current Affairs: India",
    text:"Who was appointed as the Chief Justice of India in 2024, succeeding Justice D.Y. Chandrachud?",
    options:["Justice Arun Pallai","Justice Rajesh Bindal","Justice Sanjiv Khanna","Justice Suryakant"], correct:"C" },
  { section:"Section VII — Current Affairs: India",
    text:"India's 'Mission Mausam', launched in 2024, is related to which of the following sectors?",
    options:["Space exploration","Weather and meteorological services","Agricultural irrigation","Renewable energy"], correct:"B" },
  { section:"Section VII — Current Affairs: India",
    text:"Which Indian city hosted the G20 Summit in September 2023?",
    options:["Mumbai","Chennai","Kolkata","New Delhi"], correct:"D" },

  // ── SECTION VIII: World Current Affairs ──
  { section:"Section VIII — World Current Affairs",
    text:"Which country became the first to land an uncrewed spacecraft near the Moon's south pole in 2023?",
    options:["United States","China","Russia","India"], correct:"D" },
  { section:"Section VIII — World Current Affairs",
    text:"Who won the Nobel Peace Prize 2024?",
    options:["Malala Yousafzai","Nihon Hidankyo (Japanese atomic bomb survivors' organisation)","Narges Mohammadi","World Food Programme"], correct:"B" },
  { section:"Section VIII — World Current Affairs",
    text:"Which international organisation has its headquarters in Geneva, Switzerland?",
    options:["United Nations (UN)","World Trade Organization (WTO)","International Monetary Fund (IMF)","Asian Development Bank (ADB)"], correct:"B" },
  { section:"Section VIII — World Current Affairs",
    text:"The 'Paris Agreement' (2015) is an international treaty primarily aimed at:",
    options:["Reducing nuclear weapons globally","Regulating international trade disputes","Combating climate change by limiting global temperature rise","Establishing global cybersecurity norms"], correct:"C" },

  // ── SECTION IX: Elementary Mathematics ──
  { section:"Section IX — Elementary Mathematics",
    text:"A shopkeeper bought an article for ₹800 and sold it at a profit of 25%. What is the selling price?",
    options:["₹900","₹950","₹1,000","₹1,100"], correct:"C" },
  { section:"Section IX — Elementary Mathematics",
    text:"Two pipes A and B can fill a tank in 12 minutes and 18 minutes respectively. If both are opened together, how long will it take to fill the tank?",
    options:["6 minutes","7.2 minutes","8 minutes","9 minutes"], correct:"B" },
  { section:"Section IX — Elementary Mathematics",
    text:"A train 150 metres long passes a pole in 15 seconds. What is the speed of the train in km/hr?",
    options:["30 km/hr","36 km/hr","40 km/hr","54 km/hr"], correct:"B" },
  { section:"Section IX — Elementary Mathematics",
    text:"If the ratio of boys to girls in a class is 3:2 and the total number of students is 60, how many girls are there?",
    options:["18","20","24","30"], correct:"C" },

  // ── SECTION X: Elementary Statistics ──
  { section:"Section X — Elementary Statistics",
    text:"The mean of 5 numbers is 18. If one number is excluded, the mean becomes 16. What is the excluded number?",
    options:["22","24","26","28"], correct:"C" },
  { section:"Section X — Elementary Statistics",
    text:"What is the range of the following data: 12, 7, 19, 4, 25, 11?",
    options:["18","19","21","25"], correct:"C" },
  { section:"Section X — Elementary Statistics",
    text:"In a pie chart, if a sector represents 25% of the data, what is the angle of that sector?",
    options:["60°","72°","90°","120°"], correct:"C" },
  { section:"Section X — Elementary Statistics",
    text:"If the variance of a data set is 36, what is the standard deviation?",
    options:["6","9","12","18"], correct:"A" },

  // ── SECTION XI: English & Comprehension ──
  { section:"Section XI — English including Comprehension",
    text:"What does the author mean by describing law as a \"living force\"?\n\n[Passage: Law is not merely a set of rules inscribed in books. It is a living force that breathes through the institutions of a society and shapes the conduct of human beings in their daily interactions. A truly just legal system must not only punish the wrongdoer but must also protect the innocent. Justice delayed is justice denied — a maxim that has echoed through legal corridors for centuries. Yet, speed without fairness is equally perilous; for a hasty verdict rendered without due deliberation can inflict an irreversible wound on the very fabric of justice.]",
    options:["Law changes every year automatically","Law is dynamic and actively shapes society and human behaviour","Law is written by living persons only","Law applies only to living individuals, not organisations"], correct:"B" },
  { section:"Section XI — English including Comprehension",
    text:"What is the meaning of the word 'perilous' as used in the passage?",
    options:["Beneficial","Dangerous","Slow","Complicated"], correct:"B" },
  { section:"Section XI — English including Comprehension",
    text:"Which of the following best expresses the central idea of the passage?",
    options:["Laws should be written by experienced lawyers only","Speed of justice is more important than fairness","Justice must be both timely and fair to be truly just","Punishment of wrongdoers is the sole purpose of law"], correct:"C" },
  { section:"Section XI — English including Comprehension",
    text:"Choose the word most opposite in meaning to 'deliberation' as used in the passage:",
    options:["Contemplation","Recklessness","Judgment","Prudence"], correct:"B" },

  // ── SECTION XII: Logical Reasoning ──
  { section:"Section XII — Logical Reasoning",
    text:"Statements:\n(i) All doctors are engineers.\n(ii) Some engineers are teachers.\n\nConclusions:\nI. Some doctors are teachers.\nII. Some teachers are engineers.\n\nWhich conclusion(s) follow?",
    options:["Only I follows","Only II follows","Both I and II follow","Neither follows"], correct:"B" },
  { section:"Section XII — Logical Reasoning",
    text:"If in a certain code, JUSTICE is written as KWUVKEG, then LEGAL is written as:",
    options:["MGICN","NFHBM","MHIBN","NGHCM"], correct:"A" },
  { section:"Section XII — Logical Reasoning",
    text:"Book : Library :: Painting : ?",
    options:["Artist","Canvas","Gallery","Museum"], correct:"C" },
  { section:"Section XII — Logical Reasoning",
    text:"Which number comes next in the series: 3, 6, 12, 24, 48, __?",
    options:["72","84","96","100"], correct:"C" },

  // ── SECTION XIII: Analytical Reasoning ──
  { section:"Section XIII — Analytical Reasoning",
    text:"In a class of 40 students, 18 play cricket, 16 play football, and 8 play both. How many students play neither cricket nor football?",
    options:["10","12","14","16"], correct:"C" },
  { section:"Section XIII — Analytical Reasoning",
    text:"Raza is taller than Salim. Salim is taller than Tariq. Tariq is shorter than Umar but taller than Waseem. Who among them is the shortest?",
    options:["Salim","Tariq","Umar","Waseem"], correct:"D" },
  { section:"Section XIII — Analytical Reasoning",
    text:"Six people A, B, C, D, E, F are sitting in a row. A is to the right of B, C is to the left of B, and D is between E and F. If E is at the extreme left, who is at the extreme right?",
    options:["A","F","D","C"], correct:"A" },
  { section:"Section XIII — Analytical Reasoning",
    text:"Find the odd one out: Advocate, Judge, Barrister, Solicitor, Carpenter",
    options:["Advocate","Judge","Solicitor","Carpenter"], correct:"D" },

  // ── SECTION XIV: Legal Aptitude ──
  { section:"Section XIV — Legal Aptitude",
    text:"Legal Principle: A person who breaks a promise under a valid contract is legally liable to compensate the other party for actual loss suffered.\n\nFactual Situation: Arif promised to deliver 100 kg of saffron to Bashir by 1st March for ₹5,00,000. Bashir paid ₹2,00,000 in advance. Arif failed to deliver on time. Due to late delivery, Bashir suffered a business loss of ₹80,000.\n\nDecision: What is Arif legally obligated to pay?",
    options:["Nothing — Arif is not liable as delays are common in business","Only refund the advance of ₹2,00,000","Compensate Bashir for the actual loss of ₹80,000 in addition to fulfilling the contract","Pay the full contract price of ₹5,00,000 as penalty"], correct:"C" },
  { section:"Section XIV — Legal Aptitude",
    text:"Legal Principle: Every person has the right to protection of his body and property. A person may use force to protect himself, but the force used must be proportionate to the threat.\n\nFactual Situation: Salman was confronted by an unarmed thief who tried to snatch his wallet. Salman fired a pistol at the thief, killing him.\n\nDecision:",
    options:["Salman is fully justified as he was protecting his property","Salman is not liable since everyone has a right to private defence","Salman exceeded his right of private defence as the force was disproportionate","The thief is at fault and Salman bears no responsibility"], correct:"C" },
  { section:"Section XIV — Legal Aptitude",
    text:"Legal Principle: An agreement made under coercion, undue influence, fraud or misrepresentation is voidable at the option of the party whose consent was so obtained.\n\nFactual Situation: Kamil, holding a knife, forced Yusuf to sign a document transferring his house to Kamil for ₹1. Later, Yusuf wants to cancel the agreement.\n\nDecision:",
    options:["The agreement is valid since both parties signed it","The agreement is void ab initio (invalid from the beginning)","Yusuf can cancel the agreement as his consent was obtained under coercion","Only a court can cancel the agreement; Yusuf has no right to do so"], correct:"C" },
  { section:"Section XIV — Legal Aptitude",
    text:"Which of the following statements correctly defines 'Mens Rea' in criminal law?",
    options:["The physical act of committing a crime","The guilty mind or criminal intention behind an act","The punishment prescribed for a crime","The process of filing a First Information Report (FIR)"], correct:"B" },

  // ── SECTION XV: Sports ──
  { section:"Section XV — Sports",
    text:"Where were the Summer Olympic Games 2024 held?",
    options:["Los Angeles, USA","Tokyo, Japan","Paris, France","London, UK"], correct:"C" },
  { section:"Section XV — Sports",
    text:"Which Indian cricketer became the first batter to score 10,000 runs in T20 International cricket?",
    options:["Rohit Sharma","Virat Kohli","MS Dhoni","Shikhar Dhawan"], correct:"B" },
  { section:"Section XV — Sports",
    text:"The term 'Love' in Tennis denotes a score of:",
    options:["15","30","0 (Zero)","40"], correct:"C" },
  { section:"Section XV — Sports",
    text:"Neeraj Chopra, who won gold at the Tokyo Olympics 2020, competes in which athletic event?",
    options:["Shot Put","Discus Throw","Hammer Throw","Javelin Throw"], correct:"D" },
];

/* ════════════════════════════════════════════════════
   EXAM STATE
   ════════════════════════════════════════════════════ */
let candidateName  = "";
let rollNumber     = "";
let currentIndex   = 0;
let answers        = new Array(QUESTIONS.length).fill(null);
let timerInterval  = null;
let secondsLeft    = EXAM_CONFIG.durationMinutes * 60;
let warningsShown  = { ten:false, five:false, one:false };
let examSubmitted  = false;
const LETTERS      = ["A","B","C","D"];

/* ════════════════════════════════════════════════════
   REGISTRATION → START EXAM
   ════════════════════════════════════════════════════ */
function startExam() {
  // Re-verify window is still open
  const now = Date.now();
  const { startMs, endMs } = getExamWindowUTC();
  if (now < startMs) { showBeforeScreen(startMs); return; }
  if (now > endMs)   { showAfterScreen();          return; }

  const nameVal = document.getElementById("candidateName").value.trim();
  const rollVal = document.getElementById("rollNumber").value.trim();
  if (!nameVal) { shakeField("candidateName", "Please enter your full name."); return; }
  if (!rollVal) { shakeField("rollNumber",    "Please enter your roll number."); return; }

  candidateName = nameVal;
  rollNumber    = rollVal;

  // Populate header + sidebar
  setEl("hdrName",  candidateName);
  setEl("hdrRoll",  rollNumber);
  setEl("sbName",   candidateName);
  setEl("sbRoll",   rollNumber);
  setEl("sbAvatar", candidateName.charAt(0).toUpperCase());
  setEl("qTotal",   QUESTIONS.length);

  buildSectionPalette();
  renderQuestion(0);
  startTimer();

  hideAllScreens();
  document.getElementById("exam-screen").classList.add("active");
}

function shakeField(id, msg) {
  const el = document.getElementById(id);
  el.focus();
  el.style.borderColor = "#e53e3e";
  el.style.animation   = "shake 0.4s ease";
  setTimeout(() => {
    el.style.borderColor = "";
    el.style.animation   = "";
  }, 800);
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ════════════════════════════════════════════════════
   PALETTE — grouped by section
   ════════════════════════════════════════════════════ */
function buildSectionPalette() {
  const container = document.getElementById("sbSections");
  if (!container) return;
  container.innerHTML = "";

  // Group questions by section
  const sections = {};
  QUESTIONS.forEach((q, i) => {
    if (!sections[q.section]) sections[q.section] = [];
    sections[q.section].push(i);
  });

  Object.entries(sections).forEach(([sectionName, indices]) => {
    const secDiv = document.createElement("div");
    secDiv.className = "sb-section-group";

    const label = document.createElement("div");
    label.className = "sb-section-label";
    // Short label: strip "Section X — "
    label.textContent = sectionName.replace(/Section [IVXLC]+ — /i, "");
    secDiv.appendChild(label);

    const grid = document.createElement("div");
    grid.className = "sb-section-grid";

    indices.forEach(i => {
      const btn = document.createElement("button");
      btn.className   = "pal-btn";
      btn.id          = `pal-${i}`;
      btn.textContent = String(i + 1).padStart(2, "0");
      btn.onclick     = () => { renderQuestion(i); if (window.innerWidth < 900) closeMobileSidebar(); };
      grid.appendChild(btn);
    });

    secDiv.appendChild(grid);
    container.appendChild(secDiv);
  });
}

function refreshPalette() {
  QUESTIONS.forEach((_, i) => {
    const btn = document.getElementById(`pal-${i}`);
    if (!btn) return;
    btn.className = "pal-btn";
    if (i === currentIndex)       btn.classList.add("pal-current");
    else if (answers[i] !== null) btn.classList.add("pal-answered");
  });
  const answered   = answers.filter(a => a !== null).length;
  const unanswered = QUESTIONS.length - answered;
  setEl("statAns",   answered);
  setEl("statUnans", unanswered);
  setEl("statCurr",  currentIndex + 1);
}

/* ════════════════════════════════════════════════════
   RENDER QUESTION
   ════════════════════════════════════════════════════ */
function renderQuestion(idx) {
  if (idx < 0 || idx >= QUESTIONS.length) return;
  currentIndex = idx;
  const q = QUESTIONS[idx];

  setEl("qSection", q.section);
  setEl("qNum",     idx + 1);
  setEl("qTotal",   QUESTIONS.length);
  setEl("qBadge",   String(idx + 1).padStart(2, "0"));

  // Progress bar
  const pct = ((idx + 1) / QUESTIONS.length) * 100;
  const fill = document.getElementById("progressFill");
  if (fill) fill.style.width = pct + "%";

  // Question text — preserve newlines
  const qTextEl = document.getElementById("qText");
  if (qTextEl) qTextEl.innerHTML = escHtml(q.text).replace(/\n/g, "<br/>");

  // Options
  const list = document.getElementById("optionsList");
  if (!list) return;
  list.innerHTML = "";
  q.options.forEach((opt, i) => {
    const letter = LETTERS[i];
    const isSelected = answers[idx] === letter;
    const btn = document.createElement("button");
    btn.className = "opt-btn" + (isSelected ? " opt-selected" : "");
    btn.innerHTML = `<span class="opt-circle">${letter}</span><span class="opt-label">${escHtml(opt)}</span>`;
    btn.setAttribute("data-letter", letter);
    btn.onclick = () => pickOption(letter);
    list.appendChild(btn);
  });

  refreshPalette();
}

function escHtml(str) {
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

/* ════════════════════════════════════════════════════
   OPTION SELECTION
   ════════════════════════════════════════════════════ */
function pickOption(letter) {
  answers[currentIndex] = letter;
  document.querySelectorAll("#optionsList .opt-btn").forEach(b => {
    b.className = "opt-btn" + (b.dataset.letter === letter ? " opt-selected" : "");
  });
  refreshPalette();
}

function clearResponse() {
  answers[currentIndex] = null;
  document.querySelectorAll("#optionsList .opt-btn").forEach(b => {
    b.className = "opt-btn";
  });
  refreshPalette();
}

function saveAndNext() {
  if (currentIndex < QUESTIONS.length - 1) renderQuestion(currentIndex + 1);
  else confirmSubmit();
}

function goQuestion(delta) {
  const next = currentIndex + delta;
  if (next >= 0 && next < QUESTIONS.length) renderQuestion(next);
}

/* ════════════════════════════════════════════════════
   TIMER
   ════════════════════════════════════════════════════ */
function startTimer() {
  secondsLeft = EXAM_CONFIG.durationMinutes * 60;
  paintTimer();
  timerInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      secondsLeft = 0;
      paintTimer();
      doAutoSubmit();
      return;
    }
    paintTimer();
    checkWarnings();
  }, 1000);
}

function paintTimer() {
  const h  = Math.floor(secondsLeft / 3600);
  const m  = Math.floor((secondsLeft % 3600) / 60);
  const s  = secondsLeft % 60;
  const str = `${pad(h)}:${pad(m)}:${pad(s)}`;
  setEl("timerDisplay", str);

  const pill = document.getElementById("timerPill");
  if (!pill) return;
  pill.className = "timer-pill";
  if      (secondsLeft <= 60)  pill.classList.add("timer-danger");
  else if (secondsLeft <= 300) pill.classList.add("timer-warn");
}

function pad(n) { return String(n).padStart(2,"0"); }

function checkWarnings() {
  if (!warningsShown.ten  && secondsLeft <= 600) { warningsShown.ten  = true; openWarn("10 Minutes Remaining","You have 10 minutes left. Please review your answers."); }
  if (!warningsShown.five && secondsLeft <= 300) { warningsShown.five = true; openWarn("5 Minutes Remaining","Only 5 minutes left! Please wrap up your test."); }
  if (!warningsShown.one  && secondsLeft <= 60)  { warningsShown.one  = true; openWarn("1 Minute Remaining","Final minute! The test will auto-submit when time runs out."); }
}

/* ════════════════════════════════════════════════════
   MODALS
   ════════════════════════════════════════════════════ */
function confirmSubmit() {
  if (examSubmitted) return;
  const answered   = answers.filter(a => a !== null).length;
  const unanswered = QUESTIONS.length - answered;
  setEl("modalTitle", "Submit Test?");
  setEl("modalMsg",
    `You have answered ${answered} of ${QUESTIONS.length} question${QUESTIONS.length!==1?"s":""}. ` +
    (unanswered > 0 ? `${unanswered} question${unanswered!==1?"s are":" is"} unanswered. ` : "") +
    "Are you sure you want to submit?"
  );
  document.getElementById("modalBackdrop").classList.add("active");
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.remove("active");
}

function openWarn(title, msg) {
  setEl("warnTitle", title);
  setEl("warnMsg",   msg);
  document.getElementById("warnBackdrop").classList.add("active");
}

function closeWarn() {
  document.getElementById("warnBackdrop").classList.remove("active");
}

/* ════════════════════════════════════════════════════
   SUBMIT
   ════════════════════════════════════════════════════ */
function doAutoSubmit() {
  if (examSubmitted) return;
  examSubmitted = true;
  closeModal();
  finaliseSubmission();
}

function submitExam() {
  if (examSubmitted) return;
  examSubmitted = true;
  clearInterval(timerInterval);
  closeModal();
  finaliseSubmission();
}

function finaliseSubmission() {
  const now = new Date();
  const timeStr = now.toLocaleString("en-IN", {
    dateStyle:"medium", timeStyle:"medium"
  });
  const attempted = answers.filter(a => a !== null).length;

  setEl("subName",      candidateName);
  setEl("subRoll",      rollNumber);
  setEl("subTime",      timeStr);
  setEl("subAttempted", `${attempted} / ${QUESTIONS.length}`);

  pushToSheets(timeStr, attempted);

  hideAllScreens();
  document.getElementById("submitted-screen").classList.add("active");
  // Scroll to top
  window.scrollTo(0,0);
}

/* ════════════════════════════════════════════════════
   GOOGLE SHEETS
   ════════════════════════════════════════════════════ */
function pushToSheets(timeStr, attempted) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === "https://script.google.com/macros/s/AKfycbxahS3i98dZyxbH_RwDAmJUbz8hkhbHbaX8H284hdonwbwX8-QLuY8LzTJnuZv3UkfC/exec") {
    console.warn("Apps Script URL not set. Responses not saved.");
    return;
  }
  const payload = {
    candidateName, rollNumber,
    submissionTime: timeStr,
    totalQuestions: QUESTIONS.length,
    attempted, answers
  };
  fetch(APPS_SCRIPT_URL, {
    method:"POST", mode:"no-cors",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  }).catch(e => console.error("Sheets error:", e));
}

/* ════════════════════════════════════════════════════
   MOBILE SIDEBAR TOGGLE
   ════════════════════════════════════════════════════ */
function toggleMobileSidebar() {
  const sb = document.getElementById("sidebar");
  const bd = document.getElementById("sidebarBackdrop");
  if (!sb) return;
  const open = sb.classList.toggle("sidebar-open");
  if (bd) bd.classList.toggle("bd-open", open);
  document.body.style.overflow = open ? "hidden" : "";
}

function closeMobileSidebar() {
  const sb = document.getElementById("sidebar");
  const bd = document.getElementById("sidebarBackdrop");
  if (sb) sb.classList.remove("sidebar-open");
  if (bd) bd.classList.remove("bd-open");
  document.body.style.overflow = "";
}

/* ════════════════════════════════════════════════════
   CHECKBOX GATE (enable Start button)
   ════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const cb  = document.getElementById("agreeCheck");
  const btn = document.getElementById("btnStart");
  if (cb && btn) {
    cb.addEventListener("change", () => { btn.disabled = !cb.checked; });
  }
});
