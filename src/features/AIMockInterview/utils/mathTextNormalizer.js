/**
 * mathTextNormalizer.js
 *
 * Converts numbers, math symbols, and expressions in question text
 * into fully speakable words — consistently, in either English or Hindi.
 *
 * This ensures the TTS voice never mixes languages mid-sentence
 * (e.g. says "twenty five percent" in English mode and
 *       "पच्चीस प्रतिशत" in Hindi mode).
 */

// ─── English number words ──────────────────────────────────────────────────

const EN_ONES = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen'
];

const EN_TENS = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty',
  'sixty', 'seventy', 'eighty', 'ninety'
];

function numberToEnglish(n) {
  const num = Math.abs(Math.floor(n));
  const prefix = n < 0 ? 'minus ' : '';

  if (num === 0) return 'zero';
  if (num < 20) return prefix + EN_ONES[num];
  if (num < 100) {
    const tens = EN_TENS[Math.floor(num / 10)];
    const ones = EN_ONES[num % 10];
    return prefix + (ones ? `${tens} ${ones}` : tens);
  }
  if (num < 1000) {
    const hundreds = EN_ONES[Math.floor(num / 100)] + ' hundred';
    const rest = num % 100;
    return prefix + (rest ? `${hundreds} ${numberToEnglish(rest)}` : hundreds);
  }
  if (num < 100000) {
    const thousands = numberToEnglish(Math.floor(num / 1000)) + ' thousand';
    const rest = num % 1000;
    return prefix + (rest ? `${thousands} ${numberToEnglish(rest)}` : thousands);
  }
  if (num < 10000000) {
    const lakhs = numberToEnglish(Math.floor(num / 100000)) + ' lakh';
    const rest = num % 100000;
    return prefix + (rest ? `${lakhs} ${numberToEnglish(rest)}` : lakhs);
  }
  const crores = numberToEnglish(Math.floor(num / 10000000)) + ' crore';
  const rest = num % 10000000;
  return prefix + (rest ? `${crores} ${numberToEnglish(rest)}` : crores);
}

// ─── Hindi number words ───────────────────────────────────────────────────

const HI_ONES = [
  '', 'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ',
  'दस', 'ग्यारह', 'बारह', 'तेरह', 'चौदह', 'पंद्रह', 'सोलह',
  'सत्रह', 'अठारह', 'उन्नीस', 'बीस'
];

const HI_TENS = [
  '', '', 'बीस', 'तीस', 'चालीस', 'पचास',
  'साठ', 'सत्तर', 'अस्सी', 'नब्बे'
];

// Hindi has distinct words for 21-99
const HI_COMPOUND = {
  21: 'इक्कीस', 22: 'बाईस', 23: 'तेईस', 24: 'चौबीस', 25: 'पच्चीस',
  26: 'छब्बीस', 27: 'सत्ताईस', 28: 'अट्ठाईस', 29: 'उनतीस',
  31: 'इकतीस', 32: 'बत्तीस', 33: 'तैंतीस', 34: 'चौंतीस', 35: 'पैंतीस',
  36: 'छत्तीस', 37: 'सैंतीस', 38: 'अड़तीस', 39: 'उनतालीस',
  41: 'इकतालीस', 42: 'बयालीस', 43: 'तैंतालीस', 44: 'चौंतालीस', 45: 'पैंतालीस',
  46: 'छियालीस', 47: 'सैंतालीस', 48: 'अड़तालीस', 49: 'उनचास',
  51: 'इक्यावन', 52: 'बावन', 53: 'तिरपन', 54: 'चौवन', 55: 'पचपन',
  56: 'छप्पन', 57: 'सत्तावन', 58: 'अट्ठावन', 59: 'उनसठ',
  61: 'इकसठ', 62: 'बासठ', 63: 'तिरसठ', 64: 'चौंसठ', 65: 'पैंसठ',
  66: 'छियासठ', 67: 'सड़सठ', 68: 'अड़सठ', 69: 'उनहत्तर',
  71: 'इकहत्तर', 72: 'बहत्तर', 73: 'तिहत्तर', 74: 'चौहत्तर', 75: 'पचहत्तर',
  76: 'छिहत्तर', 77: 'सतहत्तर', 78: 'अठहत्तर', 79: 'उनासी',
  81: 'इक्यासी', 82: 'बयासी', 83: 'तिरासी', 84: 'चौरासी', 85: 'पचासी',
  86: 'छियासी', 87: 'सत्तासी', 88: 'अट्ठासी', 89: 'नवासी',
  91: 'इक्यानवे', 92: 'बानवे', 93: 'तिरानवे', 94: 'चौरानवे', 95: 'पंचानवे',
  96: 'छियानवे', 97: 'सत्तानवे', 98: 'अट्ठानवे', 99: 'निन्यानवे'
};

function numberToHindi(n) {
  const num = Math.abs(Math.floor(n));
  const prefix = n < 0 ? 'माइनस ' : '';

  if (num === 0) return 'शून्य';
  if (num <= 20) return prefix + HI_ONES[num];
  if (num < 100) return prefix + (HI_COMPOUND[num] || HI_TENS[Math.floor(num / 10)]);
  if (num < 1000) {
    const hundreds = HI_ONES[Math.floor(num / 100)] + ' सौ';
    const rest = num % 100;
    return prefix + (rest ? `${hundreds} ${numberToHindi(rest)}` : hundreds);
  }
  if (num < 100000) {
    const thousands = numberToHindi(Math.floor(num / 1000)) + ' हज़ार';
    const rest = num % 1000;
    return prefix + (rest ? `${thousands} ${numberToHindi(rest)}` : thousands);
  }
  if (num < 10000000) {
    const lakhs = numberToHindi(Math.floor(num / 100000)) + ' लाख';
    const rest = num % 100000;
    return prefix + (rest ? `${lakhs} ${numberToHindi(rest)}` : lakhs);
  }
  const crores = numberToHindi(Math.floor(num / 10000000)) + ' करोड़';
  const rest = num % 10000000;
  return prefix + (rest ? `${crores} ${numberToHindi(rest)}` : crores);
}

// ─── Decimal helper ───────────────────────────────────────────────────────

function decimalToWords(decimalPart, isHindi) {
  // Speak each digit after decimal point individually
  const digits = decimalPart.split('');
  const digitWords = digits.map(d => {
    const n = parseInt(d, 10);
    return isHindi ? HI_ONES[n] || 'शून्य' : EN_ONES[n] || 'zero';
  });
  return (isHindi ? 'दशमलव ' : 'point ') + digitWords.join(' ');
}

// ─── Symbol maps ──────────────────────────────────────────────────────────

const EN_SYMBOLS = {
  '+': ' plus ',
  '-': ' minus ',
  '×': ' multiplied by ',
  '÷': ' divided by ',
  '=': ' equals ',
  '>': ' greater than ',
  '<': ' less than ',
  '≥': ' greater than or equal to ',
  '≤': ' less than or equal to ',
  '≠': ' not equal to ',
  '^': ' to the power ',
  '√': ' square root of ',
  '%': ' percent ',
  '²': ' squared ',
  '³': ' cubed ',
  '₹': ' rupees ',
  '$': ' dollars ',
  '∑': ' sum of ',
  '∞': ' infinity ',
  '°': ' degrees ',
};

const HI_SYMBOLS = {
  '+': ' जमा ',
  '-': ' घटा ',
  '×': ' गुणा ',
  '÷': ' भाग ',
  '=': ' बराबर ',
  '>': ' से बड़ा ',
  '<': ' से छोटा ',
  '≥': ' से बड़ा या बराबर ',
  '≤': ' से छोटा या बराबर ',
  '≠': ' बराबर नहीं ',
  '^': ' की घात ',
  '√': ' का वर्गमूल ',
  '%': ' प्रतिशत ',
  '²': ' का वर्ग ',
  '³': ' का घन ',
  '₹': ' रुपये ',
  '$': ' डॉलर ',
  '∑': ' का योग ',
  '∞': ' अनंत ',
  '°': ' डिग्री ',
};

// ─── Fraction helper ──────────────────────────────────────────────────────

function fractionToWords(numerator, denominator, isHindi) {
  const num = parseInt(numerator, 10);
  const den = parseInt(denominator, 10);

  const numWord = isHindi ? numberToHindi(num) : numberToEnglish(num);

  if (isHindi) {
    const denWords = {
      2: 'आधा', 3: 'तिहाई', 4: 'चौथाई', 5: 'पाँचवाँ',
      6: 'छठा', 7: 'सातवाँ', 8: 'आठवाँ', 9: 'नौवाँ', 10: 'दसवाँ'
    };
    const denWord = denWords[den] || (numberToHindi(den) + 'वाँ भाग');
    return `${numWord} ${denWord}`;
  } else {
    const denWords = {
      2: 'half', 3: 'third', 4: 'quarter', 5: 'fifth',
      6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth'
    };
    const denWord = denWords[den] || (numberToEnglish(den) + 'th');
    return `${numWord} ${denWord}`;
  }
}

// ─── Main normalizer ──────────────────────────────────────────────────────

/**
 * Normalizes math/number text for TTS.
 * @param {string} text  - Raw question or script text
 * @param {string} lang  - 'hi-IN' for Hindi, 'en-IN' for English
 * @returns {string}     - TTS-ready string
 */
export function normalizeMathText(text, lang) {
  if (!text) return '';

  const isHindi = lang === 'hi-IN';
  const symbols = isHindi ? HI_SYMBOLS : EN_SYMBOLS;

  let result = text;

  // 1. Replace fractions like 3/4
  result = result.replace(/(\d+)\/(\d+)/g, (_, num, den) =>
    fractionToWords(num, den, isHindi)
  );

  // 2. Replace decimal numbers like 3.14 or -2.5
  result = result.replace(/-?\d+\.\d+/g, (match) => {
    const negative = match.startsWith('-');
    const abs = negative ? match.slice(1) : match;
    const [intPart, decPart] = abs.split('.');
    const intWord = isHindi ? numberToHindi(parseInt(intPart, 10)) : numberToEnglish(parseInt(intPart, 10));
    const decWord = decimalToWords(decPart, isHindi);
    return (negative ? (isHindi ? 'माइनस ' : 'minus ') : '') + intWord + ' ' + decWord;
  });

  // 3. Replace integers (standalone numbers, possibly negative)
  //    Avoid replacing numbers already embedded in Hindi/Devanagari words
  result = result.replace(/-?\b\d+\b/g, (match) => {
    const n = parseInt(match, 10);
    return isHindi ? numberToHindi(n) : numberToEnglish(n);
  });

  // 4. Replace math symbols
  Object.entries(symbols).forEach(([symbol, word]) => {
    // Escape special regex chars
    const escaped = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(escaped, 'g'), word);
  });

  // 5. Clean up extra whitespace
  result = result.replace(/\s{2,}/g, ' ').trim();

  return result;
}
