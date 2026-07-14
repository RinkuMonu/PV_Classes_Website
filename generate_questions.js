const fs = require('fs');

const questions = [];
let id = 1;

const categories = [
  {
    name: "General Awareness",
    data: [
      ["What is the capital of Australia?", "Sydney", "Melbourne", "Canberra", "Perth", "Canberra", "Canberra is Australia's capital city."],
      ["Who wrote 'Hamlet'?", "Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen", "William Shakespeare", "William Shakespeare is the famous playwright who wrote Hamlet."],
      ["What is the largest planet in our solar system?", "Earth", "Mars", "Jupiter", "Saturn", "Jupiter", "Jupiter is the largest planet in the solar system."],
      ["What is the chemical symbol for Gold?", "Go", "Ag", "Au", "Gd", "Au", "The symbol Au comes from the Latin word aurum, meaning gold."],
      ["In which year did the Titanic sink?", "1912", "1905", "1920", "1898", "1912", "The RMS Titanic sank on April 15, 1912."],
      ["Which country is known as the Land of the Rising Sun?", "China", "Japan", "South Korea", "Thailand", "Japan", "Japan is often called the Land of the Rising Sun."],
      ["What is the hardest natural substance on Earth?", "Gold", "Iron", "Diamond", "Platinum", "Diamond", "Diamond is the hardest known natural material."],
      ["Who painted the Mona Lisa?", "Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet", "Leonardo da Vinci", "Leonardo da Vinci painted the Mona Lisa in the 16th century."],
      ["Which ocean is the largest?", "Atlantic", "Indian", "Arctic", "Pacific", "Pacific", "The Pacific Ocean is the largest and deepest ocean on Earth."],
      ["What is the currency of Japan?", "Yuan", "Won", "Yen", "Ringgit", "Yen", "The official currency of Japan is the Yen."]
    ]
  },
  {
    name: "English",
    data: [
      ["Choose the synonym for 'Happy'", "Sad", "Joyful", "Angry", "Tired", "Joyful", "Joyful has a similar meaning to happy."],
      ["What is the antonym of 'Brave'?", "Cowardly", "Strong", "Fierce", "Bold", "Cowardly", "Cowardly is the opposite of brave."],
      ["Identify the noun: The quick brown fox jumps.", "quick", "brown", "fox", "jumps", "fox", "A fox is a person, place, or thing, making it a noun."],
      ["Which sentence is grammatically correct?", "He go to school.", "He goes to school.", "He going to school.", "He gone to school.", "He goes to school.", "The singular third-person subject 'He' requires the verb 'goes'."],
      ["Select the correctly spelled word.", "Accomodate", "Acommodate", "Accommodate", "Acomodate", "Accommodate", "The correct spelling is A-C-C-O-M-M-O-D-A-T-E."],
      ["What is the plural of 'Child'?", "Childs", "Childrens", "Children", "Childes", "Children", "The irregular plural form of child is children."],
      ["Choose the correct preposition: She is good ___ math.", "in", "at", "on", "with", "at", "The correct idiomatic phrase is 'good at' something."],
      ["Identify the adjective: The tall building.", "The", "tall", "building", "None", "tall", "Tall describes the noun 'building'."],
      ["What does the idiom 'Break a leg' mean?", "Get hurt", "Good luck", "Hurry up", "Stop", "Good luck", "'Break a leg' is a theatrical idiom wishing someone good luck."],
      ["Which is a compound word?", "Apple", "Sunlight", "Water", "Beautiful", "Sunlight", "Sunlight is made of two words: sun and light."]
    ]
  },
  {
    name: "Computer Fundamentals",
    data: [
      ["What does CPU stand for?", "Central Process Unit", "Computer Personal Unit", "Central Processing Unit", "Central Processor Unit", "Central Processing Unit", "CPU stands for Central Processing Unit."],
      ["Which of these is an input device?", "Monitor", "Printer", "Keyboard", "Speaker", "Keyboard", "A keyboard is used to input data into the computer."],
      ["What is the main circuit board called?", "Motherboard", "Fatherboard", "Central board", "Mainboard", "Motherboard", "The motherboard connects all major computer components."],
      ["What does RAM stand for?", "Read Access Memory", "Random Access Memory", "Run Access Memory", "Real Access Memory", "Random Access Memory", "RAM is temporary memory used by the system."],
      ["Which is an operating system?", "Microsoft Word", "Linux", "Google Chrome", "Intel", "Linux", "Linux is a widely used open-source operating system."],
      ["What is a URL?", "A web address", "A computer virus", "A hardware component", "An email protocol", "A web address", "URL stands for Uniform Resource Locator, commonly known as a web address."],
      ["Which of these is volatile memory?", "ROM", "Hard Drive", "RAM", "Flash Drive", "RAM", "RAM loses its contents when power is turned off."],
      ["What does HTTP stand for?", "HyperText Transfer Protocol", "HighText Transfer Protocol", "Hyper Transfer Text Protocol", "HyperText Transmit Protocol", "HyperText Transfer Protocol", "HTTP is the foundation of data communication on the Web."],
      ["Which unit is the smallest?", "Megabyte", "Kilobyte", "Gigabyte", "Byte", "Byte", "A byte consists of 8 bits and is the smallest standard unit of storage."],
      ["What is a firewall?", "A physical wall", "A security system", "A virus", "A web browser", "A security system", "A firewall monitors and controls incoming and outgoing network traffic."]
    ]
  },
  {
    name: "Reasoning",
    data: [
      ["If A is taller than B, and B is taller than C, who is the tallest?", "A", "B", "C", "Cannot be determined", "A", "Since A > B and B > C, A is the tallest."],
      ["Find the odd one out.", "Apple", "Banana", "Carrot", "Orange", "Carrot", "Carrot is a vegetable, while the others are fruits."],
      ["What comes next in the series: 2, 4, 6, 8, __", "9", "10", "11", "12", "10", "The series increases by 2 each time."],
      ["If DOG is coded as 4-15-7, how is CAT coded?", "3-1-20", "4-1-20", "3-2-20", "3-1-19", "3-1-20", "C is the 3rd letter, A is 1st, T is 20th."],
      ["A man walks 5km North, then turns right and walks 5km. Which direction is he facing?", "North", "South", "East", "West", "East", "Turning right from North faces you East."],
      ["If all roses are flowers, and some flowers fade, can we say some roses fade?", "Yes", "No", "Maybe", "Cannot be determined", "Cannot be determined", "We only know some flowers fade, not necessarily the roses."],
      ["Which word does not belong?", "Circle", "Square", "Triangle", "Cube", "Cube", "A cube is 3D, while the others are 2D shapes."],
      ["What is the next number: 1, 4, 9, 16, __", "20", "24", "25", "30", "25", "These are squares of consecutive integers (1, 2, 3, 4, 5)."],
      ["If yesterday was Tuesday, what is the day after tomorrow?", "Thursday", "Friday", "Saturday", "Sunday", "Friday", "Today is Wednesday. Tomorrow is Thursday. Day after is Friday."],
      ["Complete the analogy: Bird is to Fly as Fish is to __", "Walk", "Swim", "Run", "Crawl", "Swim", "Birds fly in the air; fish swim in the water."]
    ]
  },
  {
    name: "Mathematics",
    data: [
      ["What is 15 + 27?", "42", "41", "43", "40", "42", "15 + 27 equals 42."],
      ["What is the square root of 144?", "10", "11", "12", "14", "12", "12 multiplied by 12 is 144."],
      ["What is 20% of 150?", "20", "30", "40", "50", "30", "20% is 1/5. 150 divided by 5 is 30."],
      ["Solve for x: 2x + 5 = 15", "x = 5", "x = 10", "x = 4", "x = 6", "x = 5", "Subtract 5 to get 2x = 10, then divide by 2 to get x = 5."],
      ["What is 7 multiplied by 8?", "54", "56", "58", "64", "56", "7 times 8 equals 56."],
      ["What is the area of a rectangle with length 5 and width 4?", "9", "18", "20", "25", "20", "Area = length × width, so 5 × 4 = 20."],
      ["Convert 0.75 to a fraction.", "1/2", "3/4", "1/4", "2/3", "3/4", "0.75 is equal to 75/100, which simplifies to 3/4."],
      ["What is 100 divided by 4?", "20", "25", "30", "50", "25", "100 divided into 4 equal parts is 25."],
      ["If a triangle has a base of 6 and a height of 4, what is its area?", "10", "12", "24", "48", "12", "Area = 0.5 × base × height, so 0.5 × 6 × 4 = 12."],
      ["What is the next prime number after 7?", "9", "10", "11", "13", "11", "11 is the next number divisible only by 1 and itself."]
    ]
  }
];

categories.forEach(cat => {
  cat.data.forEach(q => {
    questions.push({
      id: id++,
      category: cat.name,
      difficulty: "Easy",
      question: q[0],
      options: [q[1], q[2], q[3], q[4]],
      answer: q[5],
      explanation: q[6]
    });
  });
});

fs.writeFileSync('src/features/AIMockInterview/data/questions.json', JSON.stringify(questions, null, 2));
console.log('Generated 50 questions!');
