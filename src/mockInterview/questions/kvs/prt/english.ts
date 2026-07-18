import { InterviewQuestion } from "../../../config/types";

export const questions: InterviewQuestion[] = [
  {
    id: 1,
    question_en: "What is the primary objective of teaching English at the primary level in KVS?",
    question_hi: "KVS में प्राथमिक स्तर पर अंग्रेजी पढ़ाने का मुख्य उद्देश्य क्या है?",
    options_en: [
      "To enable students to translate sentences",
      "To develop basic communication skills and vocabulary",
      "To teach complex grammar rules",
      "To prepare students for competitive exams"
    ],
    options_hi: [
      "छात्रों को वाक्यों का अनुवाद करने में सक्षम बनाना",
      "बुनियादी संचार कौशल और शब्दावली विकसित करना",
      "जटिल व्याकरण नियम सिखाना",
      "प्रतियोगी परीक्षाओं के लिए छात्रों को तैयार करना"
    ],
    correctAnswer: 1,
    explanation_en: "At the primary level, the main focus is on developing basic communication skills (Listening, Speaking, Reading, Writing) and a foundational vocabulary rather than strict grammatical rules.",
    explanation_hi: "प्राथमिक स्तर पर, मुख्य ध्यान सख्त व्याकरणिक नियमों के बजाय बुनियादी संचार कौशल (सुनना, बोलना, पढ़ना, लिखना) और एक मूलभूत शब्दावली विकसित करने पर है।",
    difficulty: "Easy"
  },
  {
    id: 2,
    question_en: "Identify the part of speech of the underlined word: She sings beautifully.",
    question_hi: "रेखांकित शब्द के भेद की पहचान करें: She sings beautifully.",
    options_en: ["Adjective", "Noun", "Adverb", "Verb"],
    options_hi: ["विशेषण", "संज्ञा", "क्रियाविशेषण", "क्रिया"],
    correctAnswer: 2,
    explanation_en: "'Beautifully' modifies the verb 'sings', so it acts as an adverb.",
    explanation_hi: "'Beautifully' क्रिया 'sings' की विशेषता बताता है, इसलिए यह एक क्रियाविशेषण (Adverb) के रूप में कार्य करता है।",
    difficulty: "Easy"
  },
  {
    id: 3,
    question_en: "Which of the following methods is most suitable for teaching poetry to young learners?",
    question_hi: "युवा शिक्षार्थियों को कविता पढ़ाने के लिए निम्नलिखित में से कौन सी विधि सबसे उपयुक्त है?",
    options_en: [
      "Grammar-Translation Method",
      "Rote Memorization",
      "Recitation and Role-play",
      "Silent Reading"
    ],
    options_hi: [
      "व्याकरण-अनुवाद विधि",
      "रट कर याद करना",
      "सस्वर पाठ और भूमिका निभाना (Role-play)",
      "मौन पठन"
    ],
    correctAnswer: 2,
    explanation_en: "Young learners enjoy rhythm and movement. Recitation and role-play make poetry interactive and enjoyable.",
    explanation_hi: "युवा शिक्षार्थियों को लय और गति पसंद होती है। सस्वर पाठ और भूमिका निभाना कविता को संवादात्मक और मनोरंजक बनाते हैं।",
    difficulty: "Medium"
  },
  {
    id: 4,
    question_en: "Fill in the blank with the correct preposition: The book is ______ the table.",
    question_hi: "सही पूर्वसर्ग (preposition) से रिक्त स्थान भरें: The book is ______ the table.",
    options_en: ["in", "on", "at", "over"],
    options_hi: ["in", "on", "at", "over"],
    correctAnswer: 1,
    explanation_en: "'On' is used to show that something is physically in contact with and supported by a surface.",
    explanation_hi: "'On' का उपयोग यह दर्शाने के लिए किया जाता है कि कोई वस्तु भौतिक रूप से किसी सतह के संपर्क में है और उस पर टिकी है।",
    difficulty: "Easy"
  },
  {
    id: 5,
    question_en: "What does the idiom 'Break the ice' mean?",
    question_hi: "मुहावरे 'Break the ice' का क्या अर्थ है?",
    options_en: [
      "To literally break an ice block",
      "To start a conversation in a tense situation",
      "To make someone cry",
      "To stop talking to someone"
    ],
    options_hi: [
      "सचमुच बर्फ का एक ब्लॉक तोड़ना",
      "तनावपूर्ण स्थिति में बातचीत शुरू करना",
      "किसी को रुलाना",
      "किसी से बात करना बंद करना"
    ],
    correctAnswer: 1,
    explanation_en: "To 'break the ice' means to do or say something to relieve tension or get conversation going at the start of a meeting or party.",
    explanation_hi: "'Break the ice' का अर्थ है किसी बैठक या पार्टी की शुरुआत में तनाव दूर करने या बातचीत शुरू करने के लिए कुछ करना या कहना।",
    difficulty: "Medium"
  }
];
