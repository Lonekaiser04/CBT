/* ═══════════════════════════════════════════════════════════
   KU BA LL.B CBT — script.js
   Contains: All 60 questions · Timer · Palette · Submission
═══════════════════════════════════════════════════════════ */

// ─── CONFIGURATION ─────────────────────────────────────────
// Replace this URL with your deployed Google Apps Script URL
// after setting up the backend (see google-apps-script.js)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNvxzkvo7YjyHdzCJ47lFDNthhSFazrIzLsbDHwHwvrwuuqi-fhQIT9BfUS_bInqLY/exec";

// Exam duration in seconds (70 minutes)
const EXAM_DURATION_SECONDS = 70 * 60;

// ─── ALL 60 QUESTIONS ──────────────────────────────────────
const QUESTIONS = [
  // ── SECTION I: History (Q1–4) ──
  {
    section: "Section I — History",
    text: "The 'Doctrine of Lapse', used by Lord Dalhousie to annex Indian princely states, was applied to which of the following territories?",
    options: ["Hyderabad", "Mysore", "Satara", "Kashmir"],
    correct: "C"
  },
  {
    section: "Section I — History",
    text: "Who founded the Indian National Congress in 1885?",
    options: ["Dadabhai Naoroji", "Bal Gangadhar Tilak", "A.O. Hume", "Gopal Krishna Gokhale"],
    correct: "C"
  },
  {
    section: "Section I — History",
    text: "The Chauri Chaura incident of 1922, which led Mahatma Gandhi to withdraw the Non-Cooperation Movement, occurred in which state?",
    options: ["Bihar", "Uttar Pradesh", "Bengal", "Punjab"],
    correct: "B"
  },
  {
    section: "Section I — History",
    text: "The Kalinga War (261 BCE), which transformed Emperor Ashoka into a follower of Buddhism, was fought in present-day:",
    options: ["Madhya Pradesh", "Andhra Pradesh", "Odisha", "Chhattisgarh"],
    correct: "C"
  },

  // ── SECTION II: Indian Polity (Q5–8) ──
  {
    section: "Section II — Indian Polity",
    text: "Which Article of the Indian Constitution guarantees the 'Right to Constitutional Remedies', also called the 'Heart and Soul' of the Constitution by Dr. B.R. Ambedkar?",
    options: ["Article 19", "Article 21", "Article 32", "Article 44"],
    correct: "C"
  },
  {
    section: "Section II — Indian Polity",
    text: "The Directive Principles of State Policy in the Indian Constitution are borrowed from the Constitution of:",
    options: ["United States of America", "Canada", "Ireland", "France"],
    correct: "C"
  },
  {
    section: "Section II — Indian Polity",
    text: "Which of the following writs is issued by a court to quash the order of a lower court or tribunal acting beyond its jurisdiction?",
    options: ["Mandamus", "Habeas Corpus", "Certiorari", "Quo Warranto"],
    correct: "C"
  },
  {
    section: "Section II — Indian Polity",
    text: "Which constitutional amendment lowered the voting age in India from 21 years to 18 years?",
    options: ["42nd Amendment, 1976", "52nd Amendment, 1985", "61st Amendment, 1988", "73rd Amendment, 1992"],
    correct: "C"
  },

  // ── SECTION III: Geography (Q9–12) ──
  {
    section: "Section III — Geography",
    text: "The Wular Lake, one of the largest freshwater lakes in Asia, is located in which Union Territory of India?",
    options: ["Ladakh", "Puducherry", "Jammu & Kashmir", "Lakshadweep"],
    correct: "C"
  },
  {
    section: "Section III — Geography",
    text: "Which river is known as the 'Sorrow of Bihar'?",
    options: ["Ganga", "Son", "Kosi", "Gandak"],
    correct: "C"
  },
  {
    section: "Section III — Geography",
    text: "Which of the following straits separates India from Sri Lanka?",
    options: ["Hormuz Strait", "Bab-el-Mandeb Strait", "Palk Strait", "Malacca Strait"],
    correct: "C"
  },
  {
    section: "Section III — Geography",
    text: "Which desert in India is also known as the 'Great Indian Desert'?",
    options: ["Rann of Kutch", "Thar Desert", "Deccan Plateau", "Cold Desert, Ladakh"],
    correct: "B"
  },

  // ── SECTION IV: Economics (Q13–16) ──
  {
    section: "Section IV — Economics",
    text: "The Human Development Index (HDI) is published annually by which organisation?",
    options: ["World Bank", "International Monetary Fund", "United Nations Development Programme (UNDP)", "World Trade Organization"],
    correct: "C"
  },
  {
    section: "Section IV — Economics",
    text: "Which of the following best describes 'Inflation'?",
    options: ["A sustained decrease in the general price level of goods and services", "A sustained increase in the general price level of goods and services", "An increase in a country's Gross Domestic Product", "A decrease in interest rates by the central bank"],
    correct: "B"
  },
  {
    section: "Section IV — Economics",
    text: "Which Five Year Plan in India focused primarily on 'Garibi Hatao' (Remove Poverty) as its central theme?",
    options: ["Third Five Year Plan (1961–66)", "Fourth Five Year Plan (1969–74)", "Fifth Five Year Plan (1974–79)", "Sixth Five Year Plan (1980–85)"],
    correct: "C"
  },
  {
    section: "Section IV — Economics",
    text: "GST (Goods and Services Tax) in India is an example of which type of tax?",
    options: ["Direct Tax", "Progressive Tax", "Indirect Tax", "Wealth Tax"],
    correct: "C"
  },

  // ── SECTION V: Science (Q17–20) ──
  {
    section: "Section V — Science",
    text: "Which vitamin is produced in the human body when skin is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
    correct: "D"
  },
  {
    section: "Section V — Science",
    text: "The chemical formula of Ozone is:",
    options: ["O₂", "O₃", "CO₂", "H₂O₂"],
    correct: "B"
  },
  {
    section: "Section V — Science",
    text: "Which part of the human eye controls the amount of light entering it?",
    options: ["Retina", "Cornea", "Iris", "Lens"],
    correct: "C"
  },
  {
    section: "Section V — Science",
    text: "Newton's Second Law of Motion states that Force equals:",
    options: ["Mass × Velocity", "Mass × Acceleration", "Mass / Acceleration", "Velocity / Time"],
    correct: "B"
  },

  // ── SECTION VI: Information Technology (Q21–24) ──
  {
    section: "Section VI — Information Technology",
    text: "Which of the following is the full form of 'Wi-Fi'?",
    options: ["Wired Fidelity", "Wireless Fidelity", "Wide Frequency", "Wireless Frequency Interface"],
    correct: "B"
  },
  {
    section: "Section VI — Information Technology",
    text: "Which of the following is NOT an example of an Operating System?",
    options: ["Windows 11", "Android", "Linux", "Microsoft Word"],
    correct: "D"
  },
  {
    section: "Section VI — Information Technology",
    text: "What does 'CPU' stand for in computing?",
    options: ["Central Process Unit", "Central Processing Unit", "Computer Processing Unit", "Core Processing Utility"],
    correct: "B"
  },
  {
    section: "Section VI — Information Technology",
    text: "Which of the following file formats is associated with compressed archive files?",
    options: [".docx", ".mp3", ".zip", ".html"],
    correct: "C"
  },

  // ── SECTION VII: Current Affairs — India (Q25–28) ──
  {
    section: "Section VII — Current Affairs: India",
    text: "Operation Sindoor (May 2025) was a military strike launched by India targeting terrorist infrastructure in:",
    options: ["Afghanistan and Pakistan", "Pakistan and Pakistan-Occupied Kashmir", "Bangladesh and Myanmar", "China-occupied Aksai Chin"],
    correct: "B"
  },
  {
    section: "Section VII — Current Affairs: India",
    text: "Who was appointed as the Chief Justice of India in 2024, succeeding Justice D.Y. Chandrachud?",
    options: ["Justice Arun Pallai", "Justice Rajesh Bindal", "Justice Sanjiv Khanna", "Justice Suryakant"],
    correct: "C"
  },
  {
    section: "Section VII — Current Affairs: India",
    text: "India's 'Mission Mausam', launched in 2024, is related to which of the following sectors?",
    options: ["Space exploration", "Weather and meteorological services", "Agricultural irrigation", "Renewable energy"],
    correct: "B"
  },
  {
    section: "Section VII — Current Affairs: India",
    text: "Which Indian city hosted the G20 Summit in September 2023?",
    options: ["Mumbai", "Chennai", "Kolkata", "New Delhi"],
    correct: "D"
  },

  // ── SECTION VIII: World Current Affairs (Q29–32) ──
  {
    section: "Section VIII — World Current Affairs",
    text: "Which country became the first to land an uncrewed spacecraft near the Moon's south pole in 2023?",
    options: ["United States", "China", "Russia", "India"],
    correct: "D"
  },
  {
    section: "Section VIII — World Current Affairs",
    text: "Who won the Nobel Peace Prize 2024?",
    options: ["Malala Yousafzai", "Nihon Hidankyo (Japanese atomic bomb survivors' organisation)", "Narges Mohammadi", "World Food Programme"],
    correct: "B"
  },
  {
    section: "Section VIII — World Current Affairs",
    text: "Which international organisation has its headquarters in Geneva, Switzerland?",
    options: ["United Nations (UN)", "World Trade Organization (WTO)", "International Monetary Fund (IMF)", "Asian Development Bank (ADB)"],
    correct: "B"
  },
  {
    section: "Section VIII — World Current Affairs",
    text: "The 'Paris Agreement' (2015) is an international treaty primarily aimed at:",
    options: ["Reducing nuclear weapons globally", "Regulating international trade disputes", "Combating climate change by limiting global temperature rise", "Establishing global cybersecurity norms"],
    correct: "C"
  },

  // ── SECTION IX: Elementary Mathematics (Q33–36) ──
  {
    section: "Section IX — Elementary Mathematics",
    text: "A shopkeeper bought an article for ₹800 and sold it at a profit of 25%. What is the selling price?",
    options: ["₹900", "₹950", "₹1,000", "₹1,100"],
    correct: "C"
  },
  {
    section: "Section IX — Elementary Mathematics",
    text: "Two pipes A and B can fill a tank in 12 minutes and 18 minutes respectively. If both are opened together, how long will it take to fill the tank?",
    options: ["6 minutes", "7.2 minutes", "8 minutes", "9 minutes"],
    correct: "B"
  },
  {
    section: "Section IX — Elementary Mathematics",
    text: "A train 150 metres long passes a pole in 15 seconds. What is the speed of the train in km/hr?",
    options: ["30 km/hr", "36 km/hr", "40 km/hr", "54 km/hr"],
    correct: "B"
  },
  {
    section: "Section IX — Elementary Mathematics",
    text: "If the ratio of boys to girls in a class is 3:2 and the total number of students is 60, how many girls are there?",
    options: ["18", "20", "24", "30"],
    correct: "C"
  },

  // ── SECTION X: Elementary Statistics (Q37–40) ──
  {
    section: "Section X — Elementary Statistics",
    text: "The mean of 5 numbers is 18. If one number is excluded, the mean becomes 16. What is the excluded number?",
    options: ["22", "24", "26", "28"],
    correct: "C"
  },
  {
    section: "Section X — Elementary Statistics",
    text: "What is the range of the following data: 12, 7, 19, 4, 25, 11?",
    options: ["18", "19", "21", "25"],
    correct: "C"
  },
  {
    section: "Section X — Elementary Statistics",
    text: "In a pie chart, if a sector represents 25% of the data, what is the angle of that sector?",
    options: ["60°", "72°", "90°", "120°"],
    correct: "C"
  },
  {
    section: "Section X — Elementary Statistics",
    text: "If the variance of a data set is 36, what is the standard deviation?",
    options: ["6", "9", "12", "18"],
    correct: "A"
  },

  // ── SECTION XI: English & Comprehension (Q41–44) ──
  {
    section: "Section XI — English including Comprehension",
    text: "What does the author mean by describing law as a \"living force\"?\n\n[Passage: Law is not merely a set of rules inscribed in books. It is a living force that breathes through the institutions of a society and shapes the conduct of human beings in their daily interactions. A truly just legal system must not only punish the wrongdoer but must also protect the innocent. Justice delayed is justice denied — a maxim that has echoed through legal corridors for centuries. Yet, speed without fairness is equally perilous; for a hasty verdict rendered without due deliberation can inflict an irreversible wound on the very fabric of justice.]",
    options: ["Law changes every year automatically", "Law is dynamic and actively shapes society and human behaviour", "Law is written by living persons only", "Law applies only to living individuals, not organisations"],
    correct: "B"
  },
  {
    section: "Section XI — English including Comprehension",
    text: "What is the meaning of the word 'perilous' as used in the passage?",
    options: ["Beneficial", "Dangerous", "Slow", "Complicated"],
    correct: "B"
  },
  {
    section: "Section XI — English including Comprehension",
    text: "Which of the following best expresses the central idea of the passage?",
    options: ["Laws should be written by experienced lawyers only", "Speed of justice is more important than fairness", "Justice must be both timely and fair to be truly just", "Punishment of wrongdoers is the sole purpose of law"],
    correct: "C"
  },
  {
    section: "Section XI — English including Comprehension",
    text: "Choose the word most opposite in meaning to 'deliberation' as used in the passage:",
    options: ["Contemplation", "Recklessness", "Judgment", "Prudence"],
    correct: "B"
  },

  // ── SECTION XII: Logical Reasoning (Q45–48) ──
  {
    section: "Section XII — Logical Reasoning",
    text: "Statements:\n(i) All doctors are engineers.\n(ii) Some engineers are teachers.\n\nConclusions:\nI. Some doctors are teachers.\nII. Some teachers are engineers.\n\nWhich conclusion(s) follow?",
    options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
    correct: "B"
  },
  {
    section: "Section XII — Logical Reasoning",
    text: "If in a certain code, JUSTICE is written as KWUVKEG, then LEGAL is written as:",
    options: ["MGICN", "NFHBM", "MHIBN", "NGHCM"],
    correct: "A"
  },
  {
    section: "Section XII — Logical Reasoning",
    text: "Book : Library :: Painting : ?",
    options: ["Artist", "Canvas", "Gallery", "Museum"],
    correct: "C"
  },
  {
    section: "Section XII — Logical Reasoning",
    text: "Which number comes next in the series: 3, 6, 12, 24, 48, __?",
    options: ["72", "84", "96", "100"],
    correct: "C"
  },

  // ── SECTION XIII: Analytical Reasoning (Q49–52) ──
  {
    section: "Section XIII — Analytical Reasoning",
    text: "In a class of 40 students, 18 play cricket, 16 play football, and 8 play both. How many students play neither cricket nor football?",
    options: ["10", "12", "14", "16"],
    correct: "C"
  },
  {
    section: "Section XIII — Analytical Reasoning",
    text: "Raza is taller than Salim. Salim is taller than Tariq. Tariq is shorter than Umar but taller than Waseem. Who among them is the shortest?",
    options: ["Salim", "Tariq", "Umar", "Waseem"],
    correct: "D"
  },
  {
    section: "Section XIII — Analytical Reasoning",
    text: "Six people A, B, C, D, E, F are sitting in a row. A is to the right of B, C is to the left of B, and D is between E and F. If E is at the extreme left, who is at the extreme right?",
    options: ["A", "F", "D", "C"],
    correct: "A"
  },
  {
    section: "Section XIII — Analytical Reasoning",
    text: "Find the odd one out: Advocate, Judge, Barrister, Solicitor, Carpenter",
    options: ["Advocate", "Judge", "Solicitor", "Carpenter"],
    correct: "D"
  },

  // ── SECTION XIV: Legal Aptitude (Q53–56) ──
  {
    section: "Section XIV — Legal Aptitude",
    text: "Legal Principle: A person who breaks a promise under a valid contract is legally liable to compensate the other party for actual loss suffered.\n\nFactual Situation: Arif promised to deliver 100 kg of saffron to Bashir by 1st March for ₹5,00,000. Bashir paid ₹2,00,000 in advance. Arif failed to deliver on time. Due to late delivery, Bashir suffered a business loss of ₹80,000.\n\nDecision: What is Arif legally obligated to pay?",
    options: ["Nothing — Arif is not liable as delays are common in business", "Only refund the advance of ₹2,00,000", "Compensate Bashir for the actual loss of ₹80,000 in addition to fulfilling the contract", "Pay the full contract price of ₹5,00,000 as penalty"],
    correct: "C"
  },
  {
    section: "Section XIV — Legal Aptitude",
    text: "Legal Principle: Every person has the right to protection of his body and property. A person may use force to protect himself, but the force used must be proportionate to the threat.\n\nFactual Situation: Salman was confronted by an unarmed thief who tried to snatch his wallet. Salman fired a pistol at the thief, killing him.\n\nDecision:",
    options: ["Salman is fully justified as he was protecting his property", "Salman is not liable since everyone has a right to private defence", "Salman exceeded his right of private defence as the force was disproportionate", "The thief is at fault and Salman bears no responsibility"],
    correct: "C"
  },
  {
    section: "Section XIV — Legal Aptitude",
    text: "Legal Principle: An agreement made under coercion, undue influence, fraud or misrepresentation is voidable at the option of the party whose consent was so obtained.\n\nFactual Situation: Kamil, holding a knife, forced Yusuf to sign a document transferring his house to Kamil for ₹1. Later, Yusuf wants to cancel the agreement.\n\nDecision:",
    options: ["The agreement is valid since both parties signed it", "The agreement is void ab initio (invalid from the beginning)", "Yusuf can cancel the agreement as his consent was obtained under coercion", "Only a court can cancel the agreement; Yusuf has no right to do so"],
    correct: "C"
  },
  {
    section: "Section XIV — Legal Aptitude",
    text: "Which of the following statements correctly defines 'Mens Rea' in criminal law?",
    options: ["The physical act of committing a crime", "The guilty mind or criminal intention behind an act", "The punishment prescribed for a crime", "The process of filing a First Information Report (FIR)"],
    correct: "B"
  },

  // ── SECTION XV: Sports (Q57–60) ──
  {
    section: "Section XV — Sports",
    text: "Where were the Summer Olympic Games 2024 held?",
    options: ["Los Angeles, USA", "Tokyo, Japan", "Paris, France", "London, UK"],
    correct: "C"
  },
  {
    section: "Section XV — Sports",
    text: "Which Indian cricketer became the first batter to score 10,000 runs in T20 International cricket?",
    options: ["Rohit Sharma", "Virat Kohli", "MS Dhoni", "Shikhar Dhawan"],
    correct: "B"
  },
  {
    section: "Section XV — Sports",
    text: "The term 'Love' in Tennis denotes a score of:",
    options: ["15", "30", "0 (Zero)", "40"],
    correct: "C"
  },
  {
    section: "Section XV — Sports",
    text: "Neeraj Chopra, who won gold at the Tokyo Olympics 2020, competes in which athletic event?",
    options: ["Shot Put", "Discus Throw", "Hammer Throw", "Javelin Throw"],
    correct: "D"
  }
];

// ─── STATE ─────────────────────────────────────────────────
let candidateName = "";
let rollNumber    = "";
let currentIndex  = 0;
let answers       = new Array(QUESTIONS.length).fill(null); // null = not answered, "A"/"B"/"C"/"D"
let timerInterval = null;
let secondsLeft   = EXAM_DURATION_SECONDS;
let warningsShown = { ten: false, five: false, one: false };
let examSubmitted = false;

const OPTION_LETTERS = ["A", "B", "C", "D"];

// ─── START EXAM ────────────────────────────────────────────
function startExam() {
  const nameInput = document.getElementById("candidateName").value.trim();
  const rollInput = document.getElementById("rollNumber").value.trim();

  if (!nameInput) { alert("Please enter your full name."); document.getElementById("candidateName").focus(); return; }
  if (!rollInput) { alert("Please enter your roll number."); document.getElementById("rollNumber").focus(); return; }

  candidateName = nameInput;
  rollNumber    = rollInput;

  // Update header & sidebar
  document.getElementById("headerCandidate").textContent = candidateName;
  document.getElementById("headerRoll").textContent      = rollNumber;
  document.getElementById("sidebarName").textContent     = candidateName;
  document.getElementById("sidebarRoll").textContent     = rollNumber;
  document.getElementById("sidebarAvatar").textContent   = candidateName.charAt(0).toUpperCase();
  document.getElementById("qTotalNum").textContent       = QUESTIONS.length;

  buildPalette();
  renderQuestion(0);
  startTimer();

  // Switch screens
  document.getElementById("registration-screen").classList.remove("active");
  document.getElementById("exam-screen").classList.add("active");
}

// ─── BUILD PALETTE ─────────────────────────────────────────
function buildPalette() {
  const grid = document.getElementById("paletteGrid");
  grid.innerHTML = "";
  QUESTIONS.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.className = "palette-btn";
    btn.textContent = String(i + 1).padStart(2, "0");
    btn.id = `pal-${i}`;
    btn.onclick = () => { saveCurrentAnswer(); renderQuestion(i); };
    grid.appendChild(btn);
  });
}

function updatePalette() {
  QUESTIONS.forEach((_, i) => {
    const btn = document.getElementById(`pal-${i}`);
    if (!btn) return;
    btn.className = "palette-btn";
    if (i === currentIndex)     btn.classList.add("curr");
    else if (answers[i] !== null) btn.classList.add("ans");
  });
  // Update stats
  const answered   = answers.filter(a => a !== null).length;
  const unanswered = QUESTIONS.length - answered;
  document.getElementById("statAnswered").textContent   = answered;
  document.getElementById("statUnanswered").textContent = unanswered;
}

// ─── RENDER QUESTION ───────────────────────────────────────
function renderQuestion(index) {
  if (index < 0 || index >= QUESTIONS.length) return;
  currentIndex = index;
  const q = QUESTIONS[index];

  document.getElementById("qSectionTag").textContent  = q.section;
  document.getElementById("qCurrentNum").textContent  = index + 1;
  document.getElementById("qNumberBadge").textContent = String(index + 1).padStart(2, "0");
  document.getElementById("qText").textContent        = q.text;

  const grid = document.getElementById("optionsGrid");
  grid.innerHTML = "";

  q.options.forEach((opt, i) => {
    const letter = OPTION_LETTERS[i];
    const btn    = document.createElement("button");
    btn.className = "option-btn" + (answers[index] === letter ? " selected" : "");
    btn.innerHTML = `<span class="opt-letter">${letter}</span><span class="opt-text">${opt}</span>`;
    btn.onclick   = () => selectOption(letter, btn);
    grid.appendChild(btn);
  });

  updatePalette();
}

// ─── SELECT OPTION ─────────────────────────────────────────
function selectOption(letter, clickedBtn) {
  answers[currentIndex] = letter;
  document.querySelectorAll("#optionsGrid .option-btn").forEach(b => {
    b.classList.remove("selected");
    b.querySelector(".opt-letter").style.background = "";
    b.querySelector(".opt-letter").style.color = "";
  });
  clickedBtn.classList.add("selected");
  updatePalette();
}

// ─── SAVE CURRENT ANSWER (before navigating) ───────────────
function saveCurrentAnswer() {
  // answer already saved on click; this is a no-op kept for readability
}

// ─── SAVE & NEXT ───────────────────────────────────────────
function saveAndNext() {
  if (currentIndex < QUESTIONS.length - 1) renderQuestion(currentIndex + 1);
  else confirmSubmit();
}

// ─── PREVIOUS / NEXT ───────────────────────────────────────
function goQuestion(delta) {
  const next = currentIndex + delta;
  if (next >= 0 && next < QUESTIONS.length) renderQuestion(next);
}

// ─── CLEAR RESPONSE ────────────────────────────────────────
function clearResponse() {
  answers[currentIndex] = null;
  document.querySelectorAll("#optionsGrid .option-btn").forEach(b => {
    b.classList.remove("selected");
  });
  updatePalette();
}

// ─── TIMER ─────────────────────────────────────────────────
function startTimer() {
  secondsLeft = EXAM_DURATION_SECONDS;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      secondsLeft = 0;
      updateTimerDisplay();
      autoSubmit();
      return;
    }
    updateTimerDisplay();
    checkTimeWarnings();
  }, 1000);
}

function updateTimerDisplay() {
  const h  = Math.floor(secondsLeft / 3600);
  const m  = Math.floor((secondsLeft % 3600) / 60);
  const s  = secondsLeft % 60;
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${hh}:${mm}:${ss}`;

  const tb = document.getElementById("timerBlock");
  tb.className = "timer-block";
  if (secondsLeft <= 60)        tb.classList.add("danger");
  else if (secondsLeft <= 300)  tb.classList.add("warning");
}

function checkTimeWarnings() {
  if (!warningsShown.ten && secondsLeft <= 600) {
    warningsShown.ten = true;
    showWarning("⏳ 10 Minutes Remaining", "You have 10 minutes left. Please review your answers.");
  } else if (!warningsShown.five && secondsLeft <= 300) {
    warningsShown.five = true;
    showWarning("⚠️ 5 Minutes Remaining", "Only 5 minutes left! Please wrap up and verify your responses.");
  } else if (!warningsShown.one && secondsLeft <= 60) {
    warningsShown.one = true;
    showWarning("🚨 1 Minute Remaining", "Final minute! The test will auto-submit when time runs out.");
  }
}

function showWarning(title, message) {
  document.getElementById("warningTitle").textContent   = title;
  document.getElementById("warningMessage").textContent = message;
  document.getElementById("warning-overlay").classList.add("active");
}

function closeWarning() {
  document.getElementById("warning-overlay").classList.remove("active");
}

// ─── CONFIRM & SUBMIT ──────────────────────────────────────
function confirmSubmit() {
  if (examSubmitted) return;
  const answered   = answers.filter(a => a !== null).length;
  const unanswered = QUESTIONS.length - answered;
  document.getElementById("modalTitle").textContent   = "Submit Test?";
  document.getElementById("modalMessage").textContent =
    `You have answered ${answered} out of ${QUESTIONS.length} questions. ${unanswered > 0 ? unanswered + " question(s) are unanswered.' " : ""}Are you sure you want to submit?`;
  document.getElementById("modal-overlay").classList.add("active");
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("active");
}

function autoSubmit() {
  if (examSubmitted) return;
  examSubmitted = true;
  clearInterval(timerInterval);
  submitExam();
}

function submitExam() {
  if (examSubmitted && !timerInterval) { /* auto-submit path */ }
  examSubmitted = true;
  clearInterval(timerInterval);
  closeModal();

  const submissionTime = new Date().toLocaleString("en-IN", {
    dateStyle: "medium", timeStyle: "medium"
  });
  const attempted = answers.filter(a => a !== null).length;

  // Update submitted screen
  document.getElementById("submittedName").textContent     = candidateName;
  document.getElementById("submittedRoll").textContent     = rollNumber;
  document.getElementById("submittedTime").textContent     = submissionTime;
  document.getElementById("submittedAttempted").textContent = `${attempted} / ${QUESTIONS.length}`;

  // Send to Google Sheets
  sendToGoogleSheets(submissionTime, attempted);

  // Switch screens
  document.getElementById("exam-screen").classList.remove("active");
  document.getElementById("submitted-screen").classList.add("active");
}

// ─── GOOGLE SHEETS SUBMISSION ──────────────────────────────
function sendToGoogleSheets(submissionTime, attempted) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
    console.warn("Google Apps Script URL not configured. Answers not saved to Sheets.");
    return;
  }

  // Build payload: name, roll, time, total questions, each answer
  const payload = {
    candidateName:    candidateName,
    rollNumber:       rollNumber,
    submissionTime:   submissionTime,
    totalQuestions:   QUESTIONS.length,
    attempted:        attempted,
    answers:          answers  // array of "A"/"B"/"C"/"D"/null
  };

  fetch(APPS_SCRIPT_URL, {
    method:  "POST",
    mode:    "no-cors",   // Required for Apps Script
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload)
  })
  .then(() => console.log("Data sent to Google Sheets."))
  .catch(err => console.error("Failed to send data:", err));
}
