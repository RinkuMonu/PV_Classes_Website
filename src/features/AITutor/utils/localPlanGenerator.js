/**
 * localPlanGenerator.js
 *
 * Generates a real, relevant AI study plan purely from interview data —
 * no backend required. Used as primary source when backend is unavailable.
 *
 * Plan structure matches the backend /ai-tutor/create-study-plan response shape:
 * { goal, current_level, daily_hours, target_date, strong_subjects,
 *   weak_subjects, tasks: [{ day, title, description, what_to_study,
 *   how_to_study, weakness, completed }] }
 */

import { SUBJECT_MAPPING } from "../../../mockInterview/config/subjectMapping";

// ── Per-subject study content ──────────────────────────────────────────────
const SUBJECT_CONTENT = {
  "General Awareness": {
    topics: ["Static GK (History, Geography, Polity)", "Current Affairs (last 6 months)", "Science & Technology", "Economy & Budget", "Awards & Appointments", "Sports & Games"],
    tips: "Read a newspaper daily. Revise facts using flashcards. Attempt daily GK quizzes.",
    weakness: "Students often mix up dates and facts. Focus on understanding, not just memorization.",
  },
  "Quantitative Aptitude": {
    topics: ["Number System & Simplification", "Percentage, Profit & Loss", "Ratio, Proportion & Mixture", "Time, Speed & Distance", "Algebra & Geometry", "Data Interpretation"],
    tips: "Practice 20–30 questions daily. Learn shortcut formulas. Time yourself on each question type.",
    weakness: "Calculation speed is the main bottleneck. Practice mental math every morning.",
  },
  "Reasoning": {
    topics: ["Analogy & Classification", "Series (Number/Letter/Figure)", "Coding-Decoding", "Blood Relations & Direction Sense", "Syllogism & Statement-Conclusion", "Puzzles & Seating Arrangement"],
    tips: "Solve previous year questions topic-wise. Draw diagrams for complex problems.",
    weakness: "Students lose time on tricky puzzles. Practice under timed conditions.",
  },
  "English Language": {
    topics: ["Reading Comprehension", "Vocabulary (Synonyms/Antonyms/Idioms)", "Grammar (Error Spotting, Fill in the Blanks)", "Cloze Test", "Para-jumbles", "Sentence Improvement"],
    tips: "Read English newspapers. Build vocabulary daily (10 words/day). Revise grammar rules weekly.",
    weakness: "Vocabulary and reading speed are common weak areas. Daily reading is non-negotiable.",
  },
  "English": {
    topics: ["Reading Comprehension", "Vocabulary", "Grammar", "Writing Skills", "Teaching English"],
    tips: "Focus on error-free communication. Practice comprehension passages daily.",
    weakness: "Grammar rules are often forgotten under exam pressure. Revise weekly.",
  },
  "Hindi": {
    topics: ["व्याकरण (Grammar)", "पद्य व गद्य (Poetry & Prose)", "शब्द भंडार (Vocabulary)", "रचना (Composition)", "हिंदी शिक्षण विधियाँ (Hindi Pedagogy)"],
    tips: "रोज़ाना हिंदी समाचार पत्र पढ़ें। व्याकरण के नियमों को याद करें।",
    weakness: "Students confuse grammar rules for Hindi with English patterns. Practice Hindi-specific rules.",
  },
  "Child Development & Pedagogy (CDP)": {
    topics: ["Growth & Development Theories (Piaget, Vygotsky, Kohlberg)", "Learning Theories & Motivation", "Individual Differences & Inclusive Education", "Assessment & Evaluation", "Right to Education (RTE)", "Classroom Management"],
    tips: "Link theory to real classroom scenarios. Attempt MCQs daily to reinforce concepts.",
    weakness: "Theory names and stages get confused. Use mnemonics to remember theorist stages.",
  },
  "Mathematics": {
    topics: ["Number System", "Fractions & Decimals", "Algebra", "Geometry & Mensuration", "Statistics", "Math Pedagogy"],
    tips: "Solve NCERT examples thoroughly. Practice previous year questions topic-wise.",
    weakness: "Geometry and mensuration formulas are commonly forgotten. Create a formula sheet.",
  },
  "Science": {
    topics: ["Physics (Motion, Force, Energy)", "Chemistry (Acids, Bases, Metals)", "Biology (Cells, Nutrition, Reproduction)", "Environment & Ecology", "Science Pedagogy"],
    tips: "Use diagrams and concept maps for biology topics. Relate physics concepts to real life.",
    weakness: "Biology terminology is vast. Focus on NCERT diagrams and definitions.",
  },
  "Social Science": {
    topics: ["History (Ancient, Medieval, Modern India)", "Geography (Physical, Human, Economic)", "Political Science (Constitution, Governance)", "Economics (Development, Money, Trade)", "Social Science Pedagogy"],
    tips: "Prepare timeline charts for history. Draw maps for geography. Link polity to current events.",
    weakness: "History dates and geography maps are often neglected. Dedicate extra revision time.",
  },
  "Computer Science": {
    topics: ["Computer Fundamentals & Hardware", "Operating Systems", "MS Office & Internet", "Database Management (DBMS)", "Programming Basics (C, Python, Java)", "Networking & Cybersecurity"],
    tips: "Practice practical questions. Learn theory alongside hands-on practice.",
    weakness: "Networking and DBMS concepts are abstract. Use diagrams and analogies.",
  },
  "Special Education": {
    topics: ["Types of Disabilities (Visual, Hearing, Intellectual, Locomotor)", "Assistive Technology & Devices", "Inclusive Education Policies", "Individualized Education Plan (IEP)", "Rights of Persons with Disabilities Act", "Teaching Strategies for Special Needs"],
    tips: "Focus on RTE provisions and legal rights. Understand IEP creation process thoroughly.",
    weakness: "Disability categories and their characteristics are often mixed up. Make a comparison chart.",
  },
  "Environmental Studies (EVS)": {
    topics: ["Family & Community", "Animals & Plants", "Food, Shelter & Water", "Travel & Things Around Us", "EVS Pedagogy (NCERT approach)"],
    tips: "Use NCERT Class 3-5 books as primary source. Focus on pedagogical aspects for teaching.",
    weakness: "EVS pedagogy questions are often missed. Understand constructivist approach.",
  },
  "Teaching Aptitude": {
    topics: ["Teaching Methods & Approaches", "Lesson Planning", "Classroom Communication", "Learner-Centered Teaching", "Assessment Techniques", "Professional Ethics"],
    tips: "Focus on best-practice scenarios. Think from a student-first perspective for each question.",
    weakness: "Situational questions require judgment. Practice with previous year scenario-based MCQs.",
  },
  "Elementary Mathematics": {
    topics: ["Number Sense", "Basic Operations", "Fractions", "Measurement", "Shapes & Space", "Patterns"],
    tips: "Focus on NCERT lower-grade math. Practice mental math calculations.",
    weakness: "Basic but tricky — fractions and ratio problems trip up many students.",
  },
  "English/Hindi": {
    topics: ["Basic Grammar", "Vocabulary", "Comprehension", "Writing Skills"],
    tips: "Practice both languages equally. Focus on comprehension and grammar sections.",
    weakness: "Switching between Hindi and English grammar rules causes confusion.",
  },
  "English Comprehension": {
    topics: ["Reading Comprehension Passages", "Vocabulary in Context", "Inference Questions", "Summary Writing"],
    tips: "Read 1-2 passages daily. Practice extracting key information quickly.",
    weakness: "Students read too slowly under exam pressure. Build reading speed gradually.",
  },
  "Common Subjects": {
    topics: ["General English", "General Hindi", "Reasoning & Mental Ability", "General Knowledge & Current Affairs", "Computer Literacy"],
    tips: "These subjects are scoring — don't neglect them. Revise daily for consistent marks.",
    weakness: "Students focus only on specialisation and neglect common subjects. Balance is key.",
  },
  "Physics": {
    topics: ["Mechanics & Motion", "Thermodynamics", "Electricity & Magnetism", "Optics & Waves", "Modern Physics & Nuclear Physics"],
    tips: "Derive formulas yourself instead of memorising. Solve numericals daily.",
    weakness: "Numericals cause anxiety. Build confidence with easier problems first, then advance.",
  },
  "Chemistry": {
    topics: ["Physical Chemistry (Atomic Structure, Bonding)", "Inorganic Chemistry (Periodic Table, Coordination Compounds)", "Organic Chemistry (Reactions, Mechanisms)", "Electrochemistry & Thermodynamics"],
    tips: "Understand mechanisms rather than memorise reactions. Draw structures for organic chemistry.",
    weakness: "Organic mechanisms and inorganic reactions overlap in memory. Create separate notes.",
  },
  "Biology": {
    topics: ["Cell Biology & Genetics", "Human Physiology", "Plant Biology & Ecology", "Evolution & Classification", "Biotechnology & Molecular Biology"],
    tips: "Use NCERT diagrams extensively. Make concept maps for complex topics.",
    weakness: "Vast syllabus — students often skip ecology and biotechnology. Cover all sections.",
  },
  "Commerce": {
    topics: ["Accountancy (Financial Statements, Ratio Analysis)", "Business Studies (Management, Finance)", "Economics (Micro & Macro)", "Taxation & Company Law"],
    tips: "Practice journal entries and financial statements daily. Link theory to real-world examples.",
    weakness: "Accountancy errors are costly in exams. Practice systematically and verify each step.",
  },
  "Economics": {
    topics: ["Micro Economics (Demand, Supply, Market Structures)", "Macro Economics (National Income, Money & Banking)", "Indian Economy (Planning, Agriculture, Industry)", "International Trade & Finance"],
    tips: "Draw diagrams for every economic concept. Link theory to current Indian economic events.",
    weakness: "Graph-based questions are often attempted without understanding. Practice diagrams.",
  },
  "Geography": {
    topics: ["Physical Geography (Landforms, Climate, Natural Vegetation)", "Human Geography (Population, Settlement, Migration)", "Economic Geography (Agriculture, Industry, Trade)", "Indian Geography", "World Geography"],
    tips: "Use atlas alongside textbook. Mark important locations on blank maps for practice.",
    weakness: "Students confuse similar-sounding geographic features. Use visual memory techniques.",
  },
  "History": {
    topics: ["Ancient India (Prehistoric, Vedic, Mauryan, Gupta)", "Medieval India (Delhi Sultanate, Mughal Empire)", "Modern India (British Rule, Reform Movements, Independence)", "World History"],
    tips: "Create timeline charts for each era. Focus on causes and effects, not just dates.",
    weakness: "Chronology confusion is very common. Maintain a timeline notebook.",
  },
  "Political Science": {
    topics: ["Indian Constitution (Fundamental Rights, DPSP, Amendments)", "Parliamentary System & Executive", "Federal Structure & Centre-State Relations", "Local Self-Government", "Election System & Political Parties"],
    tips: "Read the Constitution directly for authentic understanding. Link articles to real events.",
    weakness: "Constitutional articles get mixed up. Make a numbered reference card.",
  },
  "Sociology": {
    topics: ["Basic Concepts (Society, Culture, Norms)", "Social Institutions (Family, Education, Religion)", "Social Stratification & Inequality", "Social Change & Development", "Indian Society & Social Problems"],
    tips: "Connect sociological theories to Indian social context. Practice applied question types.",
    weakness: "Abstract theories are hard to retain. Use real-life Indian examples to anchor concepts.",
  },
  "Psychology": {
    topics: ["Foundations of Psychology (Schools of Thought)", "Biological Basis of Behaviour", "Sensation, Perception & Attention", "Learning, Memory & Forgetting", "Motivation, Emotion & Personality", "Psychological Disorders & Therapies"],
    tips: "Link psychological theories to classroom and counselling scenarios.",
    weakness: "Many theories have similar names. Create comparative charts to distinguish them.",
  },
  "Home Science": {
    topics: ["Food & Nutrition", "Child Development & Family Studies", "Textiles & Clothing", "Resource Management & Consumer Education", "Health & Hygiene"],
    tips: "Focus on application-based questions. Relate nutrition science to health outcomes.",
    weakness: "Students underestimate Home Science numericals. Practice calculation-based questions.",
  },
  "Sanskrit": {
    topics: ["Sanskrit Grammar (Sandhi, Samasa, Vibhakti)", "Translation (Sanskrit to Hindi/English)", "Literature (Prose, Poetry)", "Sanskrit Pedagogy"],
    tips: "Practice grammar daily. Memorise common Sandhi and Samasa rules with examples.",
    weakness: "Grammar rules in Sanskrit are extensive. Focus on high-frequency rules first.",
  },
  "Music": {
    topics: ["Music Theory (Raga, Tala, Swar)", "Vocal & Instrumental Music Basics", "Indian Classical Music History", "Music Pedagogy"],
    tips: "Focus on theory for written exam. Understand the relationship between Raga and emotion.",
    weakness: "Terminology in music is specialised. Create a glossary of key terms.",
  },
  "Art Education": {
    topics: ["Elements of Art (Line, Colour, Texture, Form)", "Art History (Indian & Western)", "Craft Techniques", "Art Education Pedagogy"],
    tips: "Practical examples strengthen theory understanding. Study famous artworks and their context.",
    weakness: "Art history timelines are often missed. Make a visual timeline of art movements.",
  },
  "Physical Education": {
    topics: ["History & Development of PE in India", "Anatomy & Physiology (Skeletal, Muscular, Cardiovascular)", "Sports Training Principles", "Yoga & Health", "Physical Education Pedagogy"],
    tips: "Focus on physiological terms and their functions. Practice diagram-based questions.",
    weakness: "Anatomy terminology is vast. Use labeled diagrams to memorize efficiently.",
  },
  "English Pedagogy": {
    topics: ["Theories of Language Acquisition (Chomsky, Vygotsky)", "Communicative Language Teaching (CLT)", "Error Analysis & Remediation", "Teaching of Four Skills (LSRW)", "Assessment in English"],
    tips: "Focus on constructivist approach to English teaching. Practice scenario-based questions.",
    weakness: "Pedagogy and content questions are often confused. Keep them separate in notes.",
  },
  "Hindi Pedagogy": {
    topics: ["हिंदी भाषा अधिग्रहण के सिद्धांत", "हिंदी शिक्षण की विधियाँ", "त्रुटि विश्लेषण", "कौशल विकास (सुनना, बोलना, पढ़ना, लिखना)", "हिंदी में मूल्यांकन"],
    tips: "हिंदी शिक्षण के सिद्धांतों को कक्षा परिदृश्यों से जोड़ें।",
    weakness: "Pedagogy questions require applying theory to practice. Focus on scenario-based MCQs.",
  },
};

// Fallback for unknown subjects
const DEFAULT_CONTENT = {
  topics: ["Foundation Concepts", "Core Theory", "Previous Year Questions", "Mock Tests", "Revision"],
  tips: "Study systematically from standard textbooks. Practice previous year questions regularly.",
  weakness: "Identify gaps through mock tests. Focus extra time on lower-scoring areas.",
};

function getContent(subject) {
  return SUBJECT_CONTENT[subject] || DEFAULT_CONTENT;
}

/**
 * Generate a complete study plan from interview data.
 * @param {object} params
 * @param {string} params.exam - Target exam name
 * @param {string} params.subject - Primary subject
 * @param {string[]} params.weakSubjects - Subjects needing improvement
 * @param {string[]} params.strongSubjects - Strong subjects
 * @param {string} params.difficulty - Beginner | Intermediate | Advanced
 * @param {number} params.dailyHours - Study hours per day
 * @param {string} params.targetDate - ISO date string
 * @param {number} params.score - Interview score (0-100 scale)
 * @param {number} params.correct - Correct answers
 * @param {number} params.total - Total questions
 * @returns {object} Plan object matching backend shape
 */
export function generateLocalPlan({
  exam = "",
  subject = "",
  weakSubjects = [],
  strongSubjects = [],
  difficulty = "Beginner",
  dailyHours = 3,
  targetDate = "",
  score = 0,
  correct = 0,
  total = 0,
}) {
  // Build subject priority list — weak subjects get more days
  const examSubjects = subject ? [subject] : (SUBJECT_MAPPING[exam] || []);
  const allSubjects = [...new Set([
    ...weakSubjects,
    ...examSubjects.filter(s => !strongSubjects.includes(s)),
    ...strongSubjects,
  ])].filter(Boolean);

  if (allSubjects.length === 0) {
    allSubjects.push("General Awareness", "Reasoning", "Quantitative Aptitude");
  }

  // Determine how many days per subject
  const totalDays = difficulty === "Beginner" ? 30 : difficulty === "Intermediate" ? 21 : 14;
  const tasks = [];
  let dayCount = 1;

  // Phase 1: Weak subjects first (2x days each)
  const weakList = weakSubjects.filter(s => allSubjects.includes(s));
  for (const subj of weakList) {
    if (dayCount > totalDays) break;
    const content = getContent(subj);
    const daysForSubject = Math.min(4, Math.ceil(content.topics.length / 1.5));
    for (let i = 0; i < daysForSubject && dayCount <= totalDays; i++) {
      const topicIndex = i % content.topics.length;
      tasks.push({
        day: dayCount++,
        title: `${subj}: ${content.topics[topicIndex]}`,
        description: `Focus on ${content.topics[topicIndex]} from ${subj}. ${content.tips}`,
        what_to_study: `📖 ${content.topics[topicIndex]}\n\nKey areas: ${content.topics.slice(topicIndex, topicIndex + 2).join(", ")}`,
        how_to_study: `1. Read theory carefully (45 min)\n2. Solve 20–25 practice questions (60 min)\n3. Review mistakes and note key points (30 min)\n4. Quick revision flashcards (15 min)`,
        weakness: content.weakness,
        completed: false,
      });
    }
  }

  // Phase 2: Remaining subjects (cover all topics)
  const remainingSubjects = allSubjects.filter(s => !weakList.includes(s));
  for (const subj of remainingSubjects) {
    if (dayCount > totalDays) break;
    const content = getContent(subj);
    const daysForSubject = Math.min(3, Math.ceil(content.topics.length / 2));
    for (let i = 0; i < daysForSubject && dayCount <= totalDays; i++) {
      const topicIndex = i % content.topics.length;
      tasks.push({
        day: dayCount++,
        title: `${subj}: ${content.topics[topicIndex]}`,
        description: content.tips,
        what_to_study: `📖 ${content.topics[topicIndex]}\n\nCover: ${content.topics.slice(topicIndex, topicIndex + 2).join(", ")}`,
        how_to_study: `1. Study from standard reference (45 min)\n2. Practice MCQs (45 min)\n3. Revision notes (30 min)`,
        weakness: content.weakness,
        completed: false,
      });
    }
  }

  // Phase 3: Revision + Mock Tests (last 20% of days)
  const revisionDays = Math.max(3, Math.floor(totalDays * 0.2));
  for (let i = 0; i < revisionDays && dayCount <= totalDays; i++) {
    if (i === 0) {
      tasks.push({
        day: dayCount++,
        title: "Full Syllabus Rapid Revision",
        description: "Quickly revise all key points, formulas, and important facts from your notes.",
        what_to_study: "📝 All subjects — short notes & flashcards\n\nFocus on weak areas first.",
        how_to_study: "1. Go through short notes for all subjects (90 min)\n2. Practice 50 mixed MCQs (60 min)\n3. Identify remaining weak points (30 min)",
        weakness: "Students often skip revision. Consistent revision is what separates toppers from the rest.",
        completed: false,
      });
    } else if (i === 1) {
      tasks.push({
        day: dayCount++,
        title: "Full Mock Test + Analysis",
        description: `Attempt a full ${exam} mock test under timed conditions. Analyse every mistake.`,
        what_to_study: `📊 ${exam} previous year papers\n\nAttempt complete paper in one sitting.`,
        how_to_study: "1. Full mock test (exam duration)\n2. Score calculation & rank estimation\n3. Error analysis — categorise mistakes by subject\n4. Targeted revision of weak areas",
        weakness: `Score analysis after mock is as important as the test itself. Never skip post-test review.`,
        completed: false,
      });
    } else {
      tasks.push({
        day: dayCount++,
        title: "Exam Preparation & Final Revision",
        description: "Consolidate all learning. Focus on high-weightage topics and previous year patterns.",
        what_to_study: "🎯 High-weightage topics for each subject\n\nReview any remaining doubts.",
        how_to_study: "1. Review all short notes (45 min)\n2. Solve 30 PYQs (45 min)\n3. Mental rehearsal and confidence building (30 min)",
        weakness: "Exam anxiety is real. Adequate sleep, light revision and confidence are key on exam day.",
        completed: false,
      });
    }
  }

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    _id: `local_${Date.now()}`,
    goal: exam,
    current_level: difficulty,
    daily_hours: dailyHours,
    target_date: targetDate || (() => {
      const d = new Date();
      d.setDate(d.getDate() + totalDays);
      return d.toISOString().split("T")[0];
    })(),
    language: "en",
    strong_subjects: strongSubjects.filter(Boolean),
    weak_subjects: weakSubjects.filter(Boolean),
    subject,
    interview_score: score,
    interview_accuracy: accuracy,
    interview_correct: correct,
    interview_total: total,
    tasks,
    isLocal: true, // flag to show "Generated locally" badge
  };
}
