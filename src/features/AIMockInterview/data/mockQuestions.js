export const mockQuestions = [
  // General Awareness
  {
    id: "q1",
    exam: "SSC CGL",
    subject: "General Awareness",
    topic: "Indian Polity",
    difficulty: "easy",
    question: {
      english: "Who is known as the Father of the Indian Constitution?",
      hindi: "भारतीय संविधान का जनक किसे कहा जाता है?"
    },
    options: {
      A: { english: "Mahatma Gandhi", hindi: "महात्मा गांधी" },
      B: { english: "Jawaharlal Nehru", hindi: "जवाहरलाल नेहरू" },
      C: { english: "B. R. Ambedkar", hindi: "बी. आर. अंबेडकर" },
      D: { english: "Sardar Vallabhbhai Patel", hindi: "सरदार वल्लभभाई पटेल" }
    },
    correctOption: "C",
    explanation: {
      english: "Dr. B. R. Ambedkar is recognized as the Father of the Indian Constitution for his role in drafting it.",
      hindi: "डॉ. बी. आर. अंबेडकर को भारतीय संविधान का मसौदा तैयार करने में उनकी भूमिका के लिए भारतीय संविधान का जनक माना जाता है।"
    }
  },
  {
    id: "q2",
    exam: "SSC CGL",
    subject: "General Awareness",
    topic: "Indian History",
    difficulty: "medium",
    question: {
      english: "In which year did the Battle of Plassey take place?",
      hindi: "प्लासी का युद्ध किस वर्ष हुआ था?"
    },
    options: {
      A: { english: "1757", hindi: "1757" },
      B: { english: "1764", hindi: "1764" },
      C: { english: "1857", hindi: "1857" },
      D: { english: "1905", hindi: "1905" }
    },
    correctOption: "A",
    explanation: {
      english: "The Battle of Plassey was fought on June 23, 1757, between the British East India Company and the Nawab of Bengal.",
      hindi: "प्लासी का युद्ध 23 जून 1757 को ब्रिटिश ईस्ट इंडिया कंपनी और बंगाल के नवाब के बीच लड़ा गया था।"
    }
  },
  {
    id: "q3",
    exam: "SSC CGL",
    subject: "General Awareness",
    topic: "Geography",
    difficulty: "hard",
    question: {
      english: "Which of the following is the longest river in Peninsular India?",
      hindi: "प्रायद्वीपीय भारत की सबसे लंबी नदी निम्नलिखित में से कौन सी है?"
    },
    options: {
      A: { english: "Narmada", hindi: "नर्मदा" },
      B: { english: "Godavari", hindi: "गोदावरी" },
      C: { english: "Krishna", hindi: "कृष्णा" },
      D: { english: "Kaveri", hindi: "कावेरी" }
    },
    correctOption: "B",
    explanation: {
      english: "The Godavari is the longest river in Peninsular India and the second longest in India after the Ganga.",
      hindi: "गोदावरी प्रायद्वीपीय भारत की सबसे लंबी नदी है और गंगा के बाद भारत की दूसरी सबसे लंबी नदी है।"
    }
  },

  // Quantitative Aptitude
  {
    id: "q4",
    exam: "Banking",
    subject: "Quantitative Aptitude",
    topic: "Percentage",
    difficulty: "easy",
    question: {
      english: "What is 25% of 400?",
      hindi: "400 का 25% क्या है?"
    },
    options: {
      A: { english: "50", hindi: "50" },
      B: { english: "75", hindi: "75" },
      C: { english: "100", hindi: "100" },
      D: { english: "125", hindi: "125" }
    },
    correctOption: "C",
    explanation: {
      english: "25% means 1/4th. 1/4 of 400 is 100.",
      hindi: "25% का अर्थ है 1/4। 400 का 1/4 हिस्सा 100 होता है।"
    }
  },
  {
    id: "q5",
    exam: "Banking",
    subject: "Quantitative Aptitude",
    topic: "Time and Work",
    difficulty: "medium",
    question: {
      english: "A can do a piece of work in 10 days and B can do it in 15 days. How long will they take working together?",
      hindi: "A किसी कार्य को 10 दिनों में और B 15 दिनों में कर सकता है। वे एक साथ मिलकर इसे कितने समय में पूरा करेंगे?"
    },
    options: {
      A: { english: "5 days", hindi: "5 दिन" },
      B: { english: "6 days", hindi: "6 दिन" },
      C: { english: "8 days", hindi: "8 दिन" },
      D: { english: "12.5 days", hindi: "12.5 दिन" }
    },
    correctOption: "B",
    explanation: {
      english: "A's 1 day work = 1/10. B's 1 day work = 1/15. Together = 1/10 + 1/15 = 5/30 = 1/6. Total time = 6 days.",
      hindi: "A का 1 दिन का कार्य = 1/10, B का 1 दिन का कार्य = 1/15. एक साथ = 1/10 + 1/15 = 5/30 = 1/6. कुल समय = 6 दिन।"
    }
  },
  {
    id: "q6",
    exam: "Banking",
    subject: "Quantitative Aptitude",
    topic: "Compound Interest",
    difficulty: "hard",
    question: {
      english: "The difference between simple and compound interest on a sum of money for 2 years at 10% per annum is Rs. 65. What is the sum?",
      hindi: "किसी धनराशि पर 10% वार्षिक दर से 2 वर्ष के लिए साधारण ब्याज और चक्रवृद्धि ब्याज के बीच का अंतर 65 रुपये है। वह राशि क्या है?"
    },
    options: {
      A: { english: "Rs. 6000", hindi: "6000 रुपये" },
      B: { english: "Rs. 6500", hindi: "6500 रुपये" },
      C: { english: "Rs. 7000", hindi: "7000 रुपये" },
      D: { english: "Rs. 7500", hindi: "7500 रुपये" }
    },
    correctOption: "B",
    explanation: {
      english: "Difference = P(R/100)^2. 65 = P(10/100)^2 => 65 = P * (1/100) => P = 6500.",
      hindi: "अंतर = P(R/100)^2. 65 = P(10/100)^2 => 65 = P * (1/100) => P = 6500."
    }
  },

  // Computer Awareness
  {
    id: "q7",
    exam: "Railway NTPC",
    subject: "Computer Awareness",
    topic: "Basics",
    difficulty: "easy",
    question: {
      english: "Which of the following is considered the brain of the computer?",
      hindi: "निम्नलिखित में से किसे कंप्यूटर का मस्तिष्क माना जाता है?"
    },
    options: {
      A: { english: "RAM", hindi: "रैम" },
      B: { english: "Hard Disk", hindi: "हार्ड डिस्क" },
      C: { english: "CPU", hindi: "सीपीयू" },
      D: { english: "Motherboard", hindi: "मदरबोर्ड" }
    },
    correctOption: "C",
    explanation: {
      english: "The Central Processing Unit (CPU) is considered the brain of the computer.",
      hindi: "सेंट्रल प्रोसेसिंग यूनिट (CPU) को कंप्यूटर का मस्तिष्क माना जाता है।"
    }
  },
  {
    id: "q8",
    exam: "Railway NTPC",
    subject: "Computer Awareness",
    topic: "Networking",
    difficulty: "medium",
    question: {
      english: "What does HTTP stand for?",
      hindi: "HTTP का पूर्ण रूप क्या है?"
    },
    options: {
      A: { english: "Hyper Text Transfer Protocol", hindi: "हाइपर टेक्स्ट ट्रांसफर प्रोटोकॉल" },
      B: { english: "High Transfer Text Protocol", hindi: "हाई ट्रांसफर टेक्स्ट प्रोटोकॉल" },
      C: { english: "Hyper Text Transmission Protocol", hindi: "हाइपर टेक्स्ट ट्रांसमिशन प्रोटोकॉल" },
      D: { english: "Hyperlink Transfer Technology Protocol", hindi: "हाइपरलिंक ट्रांसफर टेक्नोलॉजी प्रोटोकॉल" }
    },
    correctOption: "A",
    explanation: {
      english: "HTTP stands for Hyper Text Transfer Protocol.",
      hindi: "HTTP का पूर्ण रूप हाइपर टेक्स्ट ट्रांसफर प्रोटोकॉल है।"
    }
  },
  {
    id: "q9",
    exam: "Railway NTPC",
    subject: "Computer Awareness",
    topic: "Memory",
    difficulty: "hard",
    question: {
      english: "Which of the following memories has the shortest access time?",
      hindi: "निम्नलिखित में से किस मेमोरी का एक्सेस समय सबसे कम होता है?"
    },
    options: {
      A: { english: "Cache memory", hindi: "कैश मेमोरी" },
      B: { english: "Magnetic bubble memory", hindi: "मैग्नेटिक बबल मेमोरी" },
      C: { english: "Magnetic core memory", hindi: "मैग्नेटिक कोर मेमोरी" },
      D: { english: "RAM", hindi: "रैम" }
    },
    correctOption: "A",
    explanation: {
      english: "Cache memory is a small, fast memory located close to the CPU that provides the fastest access time.",
      hindi: "कैश मेमोरी एक छोटी, तेज मेमोरी होती है जो CPU के करीब स्थित होती है और सबसे कम एक्सेस समय प्रदान करती है।"
    }
  }
];
