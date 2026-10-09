import { InterviewQuestion } from "../../../config/types";

export const questions: InterviewQuestion[] = [
  {
    id: 1,
    question_en: "If the radius of a circle is increased by 20%, what is the percentage increase in its area?",
    question_hi: "यदि किसी वृत्त की त्रिज्या 20% बढ़ा दी जाए, तो उसके क्षेत्रफल में कितने प्रतिशत की वृद्धि होगी?",
    options_en: ["20%", "40%", "44%", "50%"],
    options_hi: ["20%", "40%", "44%", "50%"],
    correctAnswer: 2,
    explanation_en: "Area = πr^2. Using successive percentage formula: 20 + 20 + (20*20)/100 = 40 + 4 = 44%.",
    explanation_hi: "क्षेत्रफल = πr^2। क्रमिक प्रतिशत सूत्र का उपयोग करते हुए: 20 + 20 + (20*20)/100 = 40 + 4 = 44%।",
    difficulty: "Easy"
  },
  {
    id: 2,
    question_en: "A train 150 meters long is running at a speed of 90 km/hr. How much time will it take to cross a pole?",
    question_hi: "150 मीटर लंबी एक ट्रेन 90 किमी/घंटा की गति से चल रही है। एक खंभे को पार करने में उसे कितना समय लगेगा?",
    options_en: ["4 seconds", "5 seconds", "6 seconds", "8 seconds"],
    options_hi: ["4 सेकंड", "5 सेकंड", "6 सेकंड", "8 सेकंड"],
    correctAnswer: 2,
    explanation_en: "Speed = 90 * (5/18) = 25 m/s. Time = Distance / Speed = 150 / 25 = 6 seconds.",
    explanation_hi: "गति = 90 * (5/18) = 25 मीटर/सेकंड। समय = दूरी / गति = 150 / 25 = 6 सेकंड।",
    difficulty: "Medium"
  },
  {
    id: 3,
    question_en: "What is the unit digit in the product (3^65 * 6^59 * 7^71)?",
    question_hi: "(3^65 * 6^59 * 7^71) के गुणनफल में इकाई का अंक क्या है?",
    options_en: ["1", "2", "4", "6"],
    options_hi: ["1", "2", "4", "6"],
    correctAnswer: 2,
    explanation_en: "Unit digit of 3^65 is 3 (65 = 4*16 + 1 => 3^1=3). Unit digit of 6^59 is always 6. Unit digit of 7^71 is 3 (71 = 4*17 + 3 => 7^3=343=>3). 3 * 6 * 3 = 54 => unit digit is 4.",
    explanation_hi: "3^65 का इकाई अंक 3 है। 6^59 का इकाई अंक हमेशा 6 होता है। 7^71 का इकाई अंक 3 है। 3 * 6 * 3 = 54 => इकाई अंक 4 है।",
    difficulty: "Hard"
  },
  {
    id: 4,
    question_en: "A man sold a chair at a loss of 10%. If he had sold it for Rs. 84 more, he would have gained 4%. What is the cost price of the chair?",
    question_hi: "एक आदमी ने एक कुर्सी 10% की हानि पर बेची। यदि उसने इसे 84 रुपये अधिक में बेचा होता, तो उसे 4% का लाभ होता। कुर्सी का क्रय मूल्य क्या है?",
    options_en: ["Rs. 600", "Rs. 650", "Rs. 700", "Rs. 800"],
    options_hi: ["600 रुपये", "650 रुपये", "700 रुपये", "800 रुपये"],
    correctAnswer: 0,
    explanation_en: "Let CP be x. 104% of x - 90% of x = 84 => 14% of x = 84 => x = (84/14)*100 = 600.",
    explanation_hi: "माना क्रय मूल्य x है। x का 104% - x का 90% = 84 => x का 14% = 84 => x = (84/14)*100 = 600 रुपये।",
    difficulty: "Medium"
  },
  {
    id: 5,
    question_en: "A and B can complete a piece of work in 15 days and 20 days respectively. They got a contract to complete the work for Rs. 7700. The share of A in the contracted money will be:",
    question_hi: "A और B किसी काम को क्रमशः 15 दिन और 20 दिन में पूरा कर सकते हैं। उन्हें काम पूरा करने के लिए 7700 रुपये का ठेका मिला। ठेके के पैसे में A का हिस्सा क्या होगा?",
    options_en: ["Rs. 3300", "Rs. 4400", "Rs. 4200", "Rs. 3500"],
    options_hi: ["3300 रुपये", "4400 रुपये", "4200 रुपये", "3500 रुपये"],
    correctAnswer: 1,
    explanation_en: "Ratio of their efficiencies = (1/15) : (1/20) = 4 : 3. A's share = (4/7) * 7700 = Rs. 4400.",
    explanation_hi: "उनकी क्षमताओं का अनुपात = (1/15) : (1/20) = 4 : 3. A का हिस्सा = (4/7) * 7700 = 4400 रुपये।",
    difficulty: "Medium"
  }
];
