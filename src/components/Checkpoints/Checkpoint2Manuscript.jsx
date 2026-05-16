import React, { useState } from 'react';
import { HiDownload, HiEye, HiSearch } from 'react-icons/hi';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const Checkpoint2Manuscript = ({ manuscript = {}, onApprove, onRevise }) => {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedChapters, setCheckedChapters] = useState({});

  const chapters = manuscript.chapters || [
    { id: 1, title: 'Raven in the Rain', wordCount: 3500, status: 'complete' },
    { id: 2, title: 'The University', wordCount: 4200, status: 'complete' },
    { id: 3, title: 'First Meeting', wordCount: 3800, status: 'complete' },
    { id: 4, title: 'Blood in the Dark', wordCount: 4100, status: 'complete' },
    { id: 5, title: 'Secrets Revealed', wordCount: 3900, status: 'complete' },
  ];

  const currentChapter = chapters.find(c => c.id === selectedChapter) || chapters[0];

  const chapterContent = `The rain fell like shattered glass against the Portland skyline. Iris Asher crouched on the fire escape of the old warehouse, her heart pounding in her chest as she tracked the figure below.

He moved with impossible grace—too fast, too fluid. Not human. The crimson scarf around his neck caught the streetlight, and Iris knew she'd found him.

She'd been hunting this vampire for three weeks. Ever since he'd killed Marcus, her mentor, she'd been obsessed with revenge. The training, the sacrifice, the sleepless nights—it all led to this moment.

Her fingers tightened on the wooden stake hidden in her jacket. Oak, carved with silver symbols she didn't fully understand yet. But Marcus had said it would work.

The figure below suddenly stopped. His head tilted, as if he could sense her presence.

Iris held her breath.

Then something unexpected happened. The vampire looked up—directly at her—and smiled. Not a snarl or a grimace, but an actual smile. And in that moment, Iris felt something shift inside her. Something ancient and powerful, awakening.

Her hands began to glow with a soft, ethereal light.

She gasped, nearly dropping the stake as power surged through her veins. The glow intensified, bathing the entire alley in an otherworldly luminescence.

The vampire's smile widened.

"Well," he said, his voice smooth as silk, "this is interesting."

And that's when Iris Asher's normal life ended forever.`;

  const toggleChapterCheck = (chapterId) => {
    setCheckedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const filteredChapters = chapters.filter(ch =>
    ch.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const checkedCount = Object.values(checkedChapters).filter(Boolean).length;
  const totalChapters = chapters.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Chapter List */}
      <div className="lg:col-span-1">
        <Card title="Chapters" subtitle={`${checkedCount}/${totalChapters} approved`}>
          <div className="space-y-2">
            {/* Search */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Search chapters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-muted-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Chapter Items */}
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {filteredChapters.map(chapter => (
                <div key={chapter.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checkedChapters[chapter.id] || false}
                    onChange={() => toggleChapterCheck(chapter.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <button
                    onClick={() => setSelectedChapter(chapter.id)}
                    className={`
                      flex-1 text-left px-3 py-2 rounded-md transition
                      ${selectedChapter === chapter.id
                        ? 'bg-primary-500 text-white'
                        : 'text-primary-900 hover:bg-muted-100'
                      }
                    `}
                  >
                    <p className="text-sm font-medium">Ch {chapter.id}</p>
                    <p className="text-xs opacity-75">{chapter.title}</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Manuscript Reader */}
      <div className="lg:col-span-3 space-y-6">
        {/* Chapter Header */}
        <Card title={`Chapter ${currentChapter.id}: ${currentChapter.title}`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-600">
                <span className="font-mono">{currentChapter.wordCount}</span> words
              </p>
              <Badge variant="completed" label="Complete" />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" icon={HiDownload}>
                Download
              </Button>
            </div>
          </div>
        </Card>

        {/* Chapter Content */}
        <Card title="Content">
          <div className="prose prose-sm max-w-none">
            <p className="text-sm leading-relaxed text-muted-800 whitespace-pre-wrap">
              {chapterContent}
            </p>
          </div>
        </Card>

        {/* Chapter Notes */}
        <Card title="Notes & Feedback">
          <textarea
            placeholder="Add notes about this chapter, suggestions for revision, or approval feedback..."
            className="w-full p-3 border border-muted-200 rounded-md text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={4}
          />
        </Card>

        {/* Overall Approval */}
        <Card title="Manuscript Approval">
          <div className="space-y-4">
            <div className="bg-muted-50 p-4 rounded-md">
              <p className="text-sm font-mono font-semibold text-primary-900">
                Progress: {checkedCount} of {totalChapters} chapters approved
              </p>
              <div className="w-full bg-muted-200 rounded-full h-2 mt-3">
                <div
                  className="bg-gradient-to-r from-primary-500 to-secondary-400 h-full rounded-full transition-all"
                  style={{ width: `${(checkedCount / totalChapters) * 100}%` }}
                />
              </div>
            </div>

            <div className="border-t border-muted-100 pt-4 space-y-3">
              {checkedCount === totalChapters && (
                <div className="bg-success bg-opacity-10 border border-success text-success p-3 rounded-md text-sm">
                  ✓ All chapters approved! Ready to proceed.
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  onClick={() => onApprove?.({ checkpoint: 2, approvedChapters: Object.keys(checkedChapters).length })}
                  className="flex-1"
                >
                  ✓ Approve Manuscript
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => onRevise?.({ checkpoint: 2 })}
                  className="flex-1"
                >
                  ↺ Request Revision
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Checkpoint2Manuscript;
