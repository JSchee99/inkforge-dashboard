/**
 * Validation rules and checker for InkForge agent outputs
 */

export const VALIDATION_RULES = {
  manuscript: {
    minWordCount: 3000,
    maxWordCount: 5000,
    requiredSections: ['introduction', 'body', 'conclusion'],
    minParagraphs: 15,
  },
  outline: {
    minChapters: 5,
    maxChapters: 50,
    minChapterTitle: 5,
    maxChapterTitle: 100,
  },
  cover: {
    requiresImage: true,
    requiredElements: ['title', 'author', 'tagline'],
  },
  blurb: {
    minLength: 100,
    maxLength: 400,
    requiredElements: ['hook', 'conflict', 'stakes'],
  },
  audio: {
    minDuration: 180, // 3 minutes in seconds
    requiresVoiceActing: true,
  },
};

/**
 * Count words in text using a simple word-split algorithm
 */
export const countWords = (text) => {
  if (!text) return 0;
  // Remove extra whitespace and split by spaces
  const words = text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0);
  return words.length;
};

/**
 * Validate manuscript chapter
 */
export const validateManuscript = (content, rules = VALIDATION_RULES.manuscript) => {
  const wordCount = countWords(content);

  const errors = [];
  const warnings = [];

  // Check word count
  if (wordCount < rules.minWordCount) {
    errors.push({
      code: 'INSUFFICIENT_WORD_COUNT',
      message: `Chapter is ${wordCount} words. Minimum required: ${rules.minWordCount} words.`,
      severity: 'error',
      value: wordCount,
      required: rules.minWordCount,
    });
  }

  if (wordCount > rules.maxWordCount) {
    warnings.push({
      code: 'EXCESSIVE_WORD_COUNT',
      message: `Chapter is ${wordCount} words. Maximum recommended: ${rules.maxWordCount} words.`,
      severity: 'warning',
      value: wordCount,
      max: rules.maxWordCount,
    });
  }

  // Check paragraph count
  const paragraphs = content
    .split('\n\n')
    .filter(p => p.trim().length > 0);

  if (paragraphs.length < rules.minParagraphs) {
    warnings.push({
      code: 'INSUFFICIENT_PARAGRAPHS',
      message: `Chapter has ${paragraphs.length} paragraphs. Recommended minimum: ${rules.minParagraphs}.`,
      severity: 'warning',
      value: paragraphs.length,
      required: rules.minParagraphs,
    });
  }

  return {
    valid: errors.length === 0,
    wordCount,
    paragraphCount: paragraphs.length,
    errors,
    warnings,
    score: calculateValidationScore(wordCount, rules.minWordCount, rules.maxWordCount),
  };
};

/**
 * Validate outline structure
 */
export const validateOutline = (chapters, rules = VALIDATION_RULES.outline) => {
  const errors = [];
  const warnings = [];

  if (!Array.isArray(chapters) || chapters.length === 0) {
    errors.push({
      code: 'INVALID_OUTLINE',
      message: 'Outline must contain at least one chapter.',
      severity: 'error',
    });
    return { valid: false, errors, warnings };
  }

  // Check chapter count
  if (chapters.length < rules.minChapters) {
    errors.push({
      code: 'INSUFFICIENT_CHAPTERS',
      message: `Outline has ${chapters.length} chapters. Minimum required: ${rules.minChapters}.`,
      severity: 'error',
      value: chapters.length,
      required: rules.minChapters,
    });
  }

  if (chapters.length > rules.maxChapters) {
    errors.push({
      code: 'EXCESSIVE_CHAPTERS',
      message: `Outline has ${chapters.length} chapters. Maximum allowed: ${rules.maxChapters}.`,
      severity: 'error',
      value: chapters.length,
      max: rules.maxChapters,
    });
  }

  // Check chapter titles
  chapters.forEach((chapter, idx) => {
    if (!chapter.title || chapter.title.length < rules.minChapterTitle) {
      errors.push({
        code: 'INVALID_CHAPTER_TITLE',
        message: `Chapter ${idx + 1}: Title is too short. Minimum length: ${rules.minChapterTitle} characters.`,
        severity: 'error',
        chapter: idx + 1,
      });
    }

    if (chapter.title && chapter.title.length > rules.maxChapterTitle) {
      warnings.push({
        code: 'LONG_CHAPTER_TITLE',
        message: `Chapter ${idx + 1}: Title is ${chapter.title.length} characters. Consider shortening to ${rules.maxChapterTitle} max.`,
        severity: 'warning',
        chapter: idx + 1,
      });
    }
  });

  return {
    valid: errors.length === 0,
    chapterCount: chapters.length,
    errors,
    warnings,
  };
};

/**
 * Calculate a validation score (0-100)
 */
const calculateValidationScore = (wordCount, minWords, maxWords) => {
  if (wordCount < minWords) {
    return Math.round((wordCount / minWords) * 50); // 0-50 if below minimum
  }
  if (wordCount > maxWords) {
    return Math.round(50 + ((maxWords / wordCount) * 50)); // 50-100 if above max
  }
  return 100; // Perfect score if in range
};

/**
 * Validate all agent outputs in a pipeline state
 */
export const validatePipelineState = (state) => {
  const results = {};

  if (state.manuscript && state.manuscript.chapters) {
    results.manuscript = state.manuscript.chapters.map((chapter, idx) =>
      validateManuscript(chapter.content || '')
    );
  }

  if (state.outline && state.outline.chapters) {
    results.outline = validateOutline(state.outline.chapters);
  }

  return {
    timestamp: new Date().toISOString(),
    results,
    allValid: Object.values(results).every(r =>
      Array.isArray(r) ? r.every(v => v.valid) : r.valid
    ),
  };
};
