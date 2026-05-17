/**
 * Chapter Validator — InkForge Quality Gate
 * Validates chapters against writer_agent specifications
 */

export const WORD_COUNT_MIN = 2500;
export const WORD_COUNT_MAX = 4000;

/**
 * Count words in text (splits on whitespace)
 */
export function countWords(text) {
  if (!text) return 0;
  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
}

/**
 * Check if text appears to be placeholder/sample content
 */
function isPlaceholder(text) {
  const samplePatterns = [
    /lorem ipsum/i,
    /sample text/i,
    /TODO/,
    /PLACEHOLDER/i,
    /\[CHAPTER CONTENT HERE\]/i,
    /\[Your content here\]/i
  ];

  return samplePatterns.some(pattern => pattern.test(text));
}

/**
 * Validate a chapter meets writer_agent specifications
 *
 * @param {Object} chapter - Chapter object with content, metadata
 * @param {string} chapter.id - Chapter ID or number
 * @param {string} chapter.title - Chapter title
 * @param {string} chapter.content - Full chapter text
 * @param {number} chapter.wordCount - Declared word count
 * @returns {Object} Validation result
 */
export function validateChapter(chapter) {
  const result = {
    pass: false,
    chapter: chapter.id,
    errors: [],
    warnings: [],
    data: {}
  };

  // Check: content exists
  if (!chapter.content || chapter.content.trim().length === 0) {
    result.errors.push('Chapter content is empty');
    return result;
  }

  // Check: word count in valid range
  const actualWordCount = countWords(chapter.content);
  result.data.wordCount = actualWordCount;

  if (actualWordCount < WORD_COUNT_MIN) {
    result.errors.push(
      `Word count ${actualWordCount} is below minimum of ${WORD_COUNT_MIN} words`
    );
  }

  if (actualWordCount > WORD_COUNT_MAX) {
    result.errors.push(
      `Word count ${actualWordCount} exceeds maximum of ${WORD_COUNT_MAX} words`
    );
  }

  // Check: word count metadata matches actual
  if (chapter.wordCount && Math.abs(chapter.wordCount - actualWordCount) > 50) {
    result.warnings.push(
      `Declared word count (${chapter.wordCount}) differs from actual (${actualWordCount})`
    );
  }

  // Check: not placeholder text
  if (isPlaceholder(chapter.content)) {
    result.errors.push(
      'Chapter appears to contain placeholder text rather than original prose'
    );
  }

  // Check: minimum unique content (safety check)
  if (chapter.content.length < 5000) {
    result.warnings.push(
      `Chapter is quite short (${chapter.content.length} characters). Expected ~12,500-20,000 chars for 2500-4000 words`
    );
  }

  // Check: ends on a hook (heuristic)
  const lastSentence = chapter.content.trim().split(/[.!?]/).pop();
  if (lastSentence && lastSentence.length < 10) {
    result.warnings.push('Chapter ending seems abrupt — may not have clear hook');
  }

  // Determine pass/fail
  result.pass = result.errors.length === 0;

  if (!result.pass) {
    result.severity = 'HARD_STOP';
    result.action = 'Writer agent must revise chapter and resubmit';
  } else if (result.warnings.length > 0) {
    result.severity = 'WARNING';
    result.action = 'Chapter passes but has minor issues — review recommended';
  } else {
    result.severity = 'PASS';
    result.action = 'Chapter meets all specifications';
  }

  return result;
}

/**
 * Validate entire manuscript
 */
export function validateManuscript(chapters) {
  const results = chapters.map(ch => validateChapter(ch));

  const summary = {
    totalChapters: chapters.length,
    passedChapters: results.filter(r => r.pass).length,
    failedChapters: results.filter(r => r.errors.length > 0).length,
    warningChapters: results.filter(r => r.warnings.length > 0).length,
    totalWords: results.reduce((sum, r) => sum + (r.data.wordCount || 0), 0),
    results
  };

  return summary;
}

/**
 * Get human-readable validation message
 */
export function getValidationMessage(validation) {
  if (validation.pass && validation.warnings.length === 0) {
    return `✓ VALID — ${validation.data.wordCount} words`;
  }

  const messages = [
    validation.pass ? '✓ PASS' : '✗ FAIL',
    `${validation.data.wordCount} words`,
    ...validation.errors,
    ...validation.warnings.map(w => `⚠ ${w}`)
  ];

  return messages.join(' | ');
}

/**
 * Status color for UI display
 */
export function getValidationColor(validation) {
  if (!validation.pass) return 'error';      // red
  if (validation.warnings.length > 0) return 'warning'; // yellow
  return 'success';                          // green
}
