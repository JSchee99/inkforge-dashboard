import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { validateManuscript, VALIDATION_RULES } from '../../utils/validation';

const ChapterValidator = ({ chapterContent, chapterTitle, wordCountTarget = 3500 }) => {
  const [validation, setValidation] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (chapterContent) {
      validateChapter();
    }
  }, [chapterContent]);

  const validateChapter = () => {
    setIsValidating(true);
    // Simulate async validation
    setTimeout(() => {
      const result = validateManuscript(chapterContent, {
        ...VALIDATION_RULES.manuscript,
        minWordCount: wordCountTarget,
        maxWordCount: wordCountTarget + 1500,
      });
      setValidation(result);
      setIsValidating(false);
    }, 300);
  };

  if (!validation && !isValidating) {
    return null;
  }

  if (isValidating) {
    return (
      <Card title="Chapter Validation" subtitle="Checking quality metrics...">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full" />
            <p className="text-sm text-muted-900">Validating chapter...</p>
          </div>
        </div>
      </Card>
    );
  }

  const passStatus = validation.valid ? 'success' : 'error';
  const passMessage = validation.valid
    ? '✓ Chapter meets all quality requirements'
    : '✗ Chapter does not meet quality standards';

  return (
    <Card title="Chapter Validation" subtitle={`Quality Score: ${validation.score}/100`}>
      <div className="space-y-4">
        {/* Overall Status */}
        <div
          className={`p-4 rounded-md border-l-4 ${
            validation.valid
              ? 'bg-success bg-opacity-10 border-success'
              : 'bg-destructive bg-opacity-10 border-destructive'
          }`}
        >
          <div className="flex items-center gap-2">
            {validation.valid ? (
              <FiCheck className="w-5 h-5 text-success" />
            ) : (
              <FiX className="w-5 h-5 text-destructive" />
            )}
            <p
              className="text-sm font-medium"
              style={{
                color: validation.valid ? '#16a34a' : '#dc2626',
              }}
            >
              {passMessage}
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-muted-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-primary-900">{validation.wordCount}</p>
            <p className="text-xs text-muted-900 uppercase mt-1">Words</p>
            <p className="text-xs text-muted-600 mt-1">Target: {wordCountTarget}</p>
          </div>

          <div className="bg-muted-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-primary-900">{validation.paragraphCount}</p>
            <p className="text-xs text-muted-900 uppercase mt-1">Paragraphs</p>
            <p className="text-xs text-muted-600 mt-1">Min: 15</p>
          </div>

          <div className="bg-muted-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-primary-900">{validation.score}</p>
            <p className="text-xs text-muted-900 uppercase mt-1">Quality</p>
            <p className="text-xs text-muted-600 mt-1">Score</p>
          </div>
        </div>

        {/* Errors */}
        {validation.errors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FiX className="w-4 h-4 text-destructive" />
              <p className="text-sm font-semibold text-destructive">Issues Found</p>
            </div>
            {validation.errors.map((error, idx) => (
              <div key={idx} className="bg-destructive bg-opacity-5 p-3 rounded-md border border-destructive border-opacity-20">
                <p className="text-sm text-destructive font-medium">{error.message}</p>
                {error.code === 'INSUFFICIENT_WORD_COUNT' && (
                  <p className="text-xs text-destructive mt-1 opacity-75">
                    Need {error.required - error.value} more words
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Warnings */}
        {validation.warnings.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FiAlertCircle className="w-4 h-4 text-warning" />
              <p className="text-sm font-semibold text-warning">Warnings</p>
            </div>
            {validation.warnings.map((warning, idx) => (
              <div key={idx} className="bg-warning bg-opacity-5 p-3 rounded-md border border-warning border-opacity-20">
                <p className="text-sm text-warning font-medium">{warning.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Validation Passed Message */}
        {validation.valid && (
          <div className="bg-success bg-opacity-5 p-3 rounded-md border border-success border-opacity-20 flex items-start gap-2">
            <FiInfo className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <p className="text-sm text-success">
              Chapter is ready for approval. All quality metrics have been met.
            </p>
          </div>
        )}

        {/* Requirements Checklist */}
        <div className="pt-3 border-t border-muted-200">
          <p className="text-xs font-semibold text-muted-900 uppercase mb-2">Requirements</p>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              {validation.wordCount >= wordCountTarget ? (
                <FiCheck className="w-3 h-3 text-success" />
              ) : (
                <FiX className="w-3 h-3 text-destructive" />
              )}
              <span style={{ color: validation.wordCount >= wordCountTarget ? '#16a34a' : '#dc2626' }}>
                Minimum {wordCountTarget} words ({validation.wordCount})
              </span>
            </div>

            <div className="flex items-center gap-2">
              {validation.paragraphCount >= 15 ? (
                <FiCheck className="w-3 h-3 text-success" />
              ) : (
                <FiX className="w-3 h-3 text-destructive" />
              )}
              <span style={{ color: validation.paragraphCount >= 15 ? '#16a34a' : '#dc2626' }}>
                Minimum 15 paragraphs ({validation.paragraphCount})
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChapterValidator;
