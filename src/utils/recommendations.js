export const normalizeText = (text) => {
  if (!text) return "";
  return text.toString().toLowerCase().trim();
};

export const tokenize = (text) => {
  if (!text) return [];
  return normalizeText(text).split(/\s+/).filter(Boolean);
};

// Feature 1: Search-Based Recommendations Scoring
export const getSearchRecommendations = (allCourses, exactResults, query) => {
  if (!query ||
    !query.trim() || !allCourses || !allCourses.length) return [];

  const normalizedQuery = normalizeText(query);
  const queryTokens = tokenize(query);

  const exactResultIds = new Set((exactResults || []).map(c => c?._id).filter(Boolean));

  const scoredCourses = allCourses.map(course => {
    let score = 0;
    if (!course) return { score: -1 };

    // Normalize course fields
    const title = normalizeText(course.title);
    const shortDesc = normalizeText(course.shortDescription);
    const longDesc = normalizeText(course.longDescription);
    const examName = normalizeText(course.exam?.name);
    const language = normalizeText(course.language);

    // Exact full string matches or token matches
    if (title && (title.includes(normalizedQuery) || queryTokens.some(t => title.includes(t)))) score += 5;
    if (examName && (examName.includes(normalizedQuery) || queryTokens.some(t => examName.includes(t)))) score += 4;

    // Match in topics array
    if (course.topics && Array.isArray(course.topics)) {
      const match = course.topics.some(topic => {
        const normTopic = normalizeText(topic);
        return normTopic && (normTopic.includes(normalizedQuery) || queryTokens.some(t => normTopic.includes(t)));
      });
      if (match) score += 3;
    }

    // Match in subjects array
    if (course.subjects && Array.isArray(course.subjects)) {
      const match = course.subjects.some(subject => {
        const normSub = normalizeText(subject?.title);
        return normSub && (normSub.includes(normalizedQuery) || queryTokens.some(t => normSub.includes(t)));
      });
      if (match) score += 3;
    }

    // Description match
    if ((shortDesc && shortDesc.includes(normalizedQuery)) || (longDesc && longDesc.includes(normalizedQuery))) score += 1;

    // Language match (if query mentions a language)
    if (language && queryTokens.includes(language)) score += 1;

    return { ...course, score };
  });

  // Exclude courses already in exact search results, score <= 0
  const recommendations = scoredCourses
    .filter(c => c.score > 0 && c._id && !exactResultIds.has(c._id))
    .sort((a, b) => b.score - a.score);

  // Deduplicate by ID
  const uniqueRecommendations = [];
  const seenIds = new Set();

  for (const course of recommendations) {
    if (!seenIds.has(course._id)) {
      seenIds.add(course._id);
      uniqueRecommendations.push(course);
    }
  }

  return uniqueRecommendations.slice(0, 4);
};

// Feature 2: Course-Based Recommendations Scoring
export const getSimilarCourses = (allCourses, currentCourse) => {
  if (!allCourses || !allCourses.length || !currentCourse) return [];

  const currentCourseId = currentCourse._id;
  const currentExamId = currentCourse.exam?._id;
  const currentExamType = currentCourse.exam?.examType;

  const currentTopics = (currentCourse.topics || [])
    .map(normalizeText)
    .filter(Boolean);

  const currentSubjects = (currentCourse.subjects || [])
    .map(s => normalizeText(s?.title))
    .filter(Boolean);

  const currentLanguage = normalizeText(currentCourse.language);

  const scoredCourses = allCourses.map(course => {
    if (!course || course._id === currentCourseId) return { ...course, score: -1 }; // Exclude self

    let score = 0;

    // Ensure we only match if current IDs actually exist (prevent undefined === undefined)
    if (currentExamId && course.exam?._id === currentExamId) score += 5;
    if (currentExamType && course.exam?.examType === currentExamType) score += 4;

    if (course.topics && Array.isArray(course.topics)) {
      course.topics.forEach(topic => {
        const normTopic = normalizeText(topic);
        if (normTopic && currentTopics.includes(normTopic)) score += 3;
      });
    }

    if (course.subjects && Array.isArray(course.subjects)) {
      course.subjects.forEach(subject => {
        const normSub = normalizeText(subject?.title);
        if (normSub && currentSubjects.includes(normSub)) score += 3;
      });
    }

    if (currentLanguage && normalizeText(course.language) === currentLanguage) score += 1;

    return { ...course, score };
  });

  const recommendations = scoredCourses
    .filter(c => c.score > 0 && c._id && c._id !== currentCourseId)
    .sort((a, b) => b.score - a.score);

  const uniqueRecommendations = [];
  const seenIds = new Set();

  for (const course of recommendations) {
    if (!seenIds.has(course._id)) {
      seenIds.add(course._id);
      uniqueRecommendations.push(course);
    }
  }

  return uniqueRecommendations.slice(0, 4);
};
