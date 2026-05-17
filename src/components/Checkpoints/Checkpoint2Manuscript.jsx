import React, { useState, useMemo } from 'react';
import { HiEye } from 'react-icons/hi';
import { FaDownload } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { validateChapter, getValidationMessage, getValidationColor } from '../../utils/chapterValidator';

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

  // Memoized validation for all chapters
  const chapterValidations = useMemo(() => {
    const validations = {};
    chapters.forEach(ch => {
      validations[ch.id] = validateChapter(ch);
    });
    return validations;
  }, [chapters]);

  const chapterContent = `The rain fell like shattered glass against the Portland skyline, each droplet catching the sodium lights of the empty street below. Iris Asher crouched on the rusted fire escape of the old warehouse, her heart pounding in her chest as she tracked the figure moving through the shadows. Three weeks of surveillance, three weeks of sleepless nights, had led her here. Her fingers were numb from the cold, her muscles aching from staying perfectly still, but she couldn't afford to miss this moment.

He moved with impossible grace through the alley—too fast, too fluid for any human being. His body seemed to flow rather than walk, each step predatory and precise. The crimson scarf wrapped around his neck caught the streetlight, fluttering slightly in the autumn wind. Iris's breath caught. She'd only seen him twice before this, but that scarf was unmistakable. It was his trademark, his calling card. He wore it like a badge of honor, like he was proud of what he'd done.

She'd been hunting this vampire for three weeks, ever since he'd killed Marcus. Her mentor, her trainer, the man who'd taken her in when she had nowhere else to go. Marcus had been more than just a teacher to her—he'd been family. She'd watched him die, watched the life drain from his eyes as this creature fed on him. And his smile the entire time—that horrible, satisfied smile. That image would be burned into her mind forever.

The training, the sacrifice, the sleepless nights—it all led to this moment. She'd spent countless hours learning the old ways, the traditions that had been passed down through generations of hunters. How to move silently. How to recognize the signs of the undead. How to strike with precision and finality. Marcus had been thorough, sometimes brutal in his teaching methods, but he'd prepared her for exactly this.

Her fingers tightened on the wooden stake hidden in her jacket pocket. Oak, carved carefully with silver symbols she didn't fully understand yet, but that Marcus had insisted were crucial. The symbols supposedly weakened the creature, made it more vulnerable to the blessed wood. She'd asked him repeatedly what they meant, but he'd always said she'd understand when the time came. "You'll feel it," he'd told her. "When you're standing face to face with the darkness, your instincts will tell you everything you need to know."

The figure below suddenly stopped dead in his tracks, freezing in the middle of the alley. Iris's entire body tensed. Had he sensed her? His head tilted slowly, like a predator catching a scent on the wind. For a terrible moment, nothing moved. The world seemed to hold its breath.

Iris didn't dare move. She'd practiced this—holding still through fear, through the desperate urge to run. Marcus had made her stand in the cold rain for hours, motionless, while he circled her like prey. She'd learned to control her breathing, to minimize the rise and fall of her chest, to become as still as stone.

Then the figure moved again, continuing down the alley. Relief flooded through her, but she stayed frozen. This was the moment she'd been waiting for. The creature was moving away from the main street, deeper into the industrial district where the buildings were abandoned and the streets were empty. He was heading toward the old brewery—the vampire's nest, if her intelligence was correct.

She waited a full five minutes after he passed before carefully rising from her crouch. Her legs screamed in protest, muscles burning as blood rushed back into numbed limbs. She'd practiced this descent a hundred times. The stairs creaked ominously as she made her way down the fire escape, but she took her time, testing each step before putting her full weight on it.

The rain was heavier now, coming down in thick sheets that both helped and hindered her. It masked the sound of her footsteps, but it also obscured her vision. She kept her hand on the stake, drawing comfort from its solid presence. She'd practiced this moment so many times. In her mind. In training sessions with Marcus. In the dark hours before dawn when she couldn't sleep, playing the scenario over and over.

She was halfway down the alley when she heard voices ahead. Multiple voices. Her heart rate spiked. There were more of them. The vampire had brought others. She should fall back, replan, report to the council. That's what Marcus would have done. That's what her training dictated.

But her feet kept moving forward.

The voices grew louder. She could make out words now. They were laughing, celebrating something. The sound made her skin crawl. She rounded the corner of the brewery and saw them—five vampires, their pale skin seeming to glow in the darkness, their eyes burning with an eerie red light. They had something. Someone. A body, limp and unmoving, draped between two of them.

Iris's breath caught in her throat. The body's clothing was familiar. Black leather jacket, torn and bloodstained. The dark hair matted with blood. Oh God. She knew this person. Rebecca. Rebecca Chen from the university. She'd been in Marcus's class last semester. She'd been a student, just a normal girl who had no idea what monsters walked among them.

The vampire with the crimson scarf stepped closer to the body and laughed—a sound like breaking glass, cruel and sharp. "She had some fight in her," he said, his voice smooth as silk but edged with something ancient and hungry. "Not enough, of course, but enough to make it interesting."

Iris's hands were shaking. Her vision blurred with tears of rage. She wasn't thinking anymore. Her training, her careful plans, her logical mind—all of it fell away. There was only fury. Only the desperate, overwhelming need to make them pay.

She reached for the stake, her hand moving almost of its own accord. This was insane. This was suicide. She was one person, untested in real combat, facing five vampires. But she was moving anyway, stepping out from the shadows before she could stop herself.

"Let her go," she said, her voice surprisingly steady.

The vampires turned as one. The one with the crimson scarf—the one who'd killed Marcus—his face twisted into something between a smile and a snarl. "Well," he said, tilting his head as he looked at her, studying her with ancient, intelligent eyes that had seen centuries pass. "This is interesting."

In that moment, something shifted inside Iris. Something deep and ancient and powerful, awakening from a long slumber. Her hands began to glow with a soft, ethereal light, a luminescence that seemed to come from somewhere deep within her very soul. The light was faint at first, barely visible even to her own eyes, but it grew stronger with each heartbeat.

The vampires hissed and stepped backward, shielding their eyes from the glow. Even the one with the crimson scarf seemed momentarily taken aback, his confident expression faltering.

Iris gasped, nearly dropping the stake as power surged through her veins like lightning. The glow intensified rapidly, bathing her entire body in an otherworldly luminescence that turned the dark alley into something from a dream. She could feel the power flowing through her, ancient and vast, and she suddenly understood what Marcus had been trying to tell her all along.

The symbols on the stake weren't just to weaken the vampires. They were a key, unlocking something that had been sleeping within her bloodline since time immemorial. A hunter's mark, passed down through generations, lying dormant until the moment of greatest need.

The vampire with the crimson scarf watched her with new eyes—not contempt anymore, but something that might have been respect. Or fear. "What are you?" he whispered.

"I'm Iris Asher," she said, and her voice seemed to echo with power that wasn't her own. "And I'm here to end this."

The vampire's smile widened, but this time it wasn't cruel. It was almost predatory in a different way, like a warrior recognizing a worthy opponent. "Then let's dance, little hunter. Let's see what you're really made of."

And that's when Iris Asher's normal life ended forever. That's when she stepped fully into her power, into her purpose, into the eternal war between light and darkness that had been raging since the beginning of time. She was no longer just a grieving student seeking revenge. She was a Lightbringer, one of the rare few born with the power to challenge the creatures of the night.

The rain continued to fall around them, but now it seemed to shimmer in the glow of her power. The vampires circled her, and Iris circled back, the wooden stake in her hand feeling suddenly light, suddenly inevitable. She could feel Marcus's presence with her, his training, his wisdom, his belief in her.

And she could feel something else too—the countless generations of hunters who had come before her, all of their power flowing through her veins, all of their experience guiding her hands. She was not alone. She would never be alone again.

The battle was about to begin.`;

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
              {(() => {
                const validation = chapterValidations[currentChapter.id];
                return (
                  <>
                    <p className="text-sm" style={{ color: '#000000' }}>
                      <span className="font-mono">{validation?.data?.wordCount || currentChapter.wordCount}</span> words
                      {validation && (
                        <span style={{
                          marginLeft: '8px',
                          fontSize: '0.85em',
                          color: validation.pass ? '#10b981' : '#ef4444'
                        }}>
                          {validation.pass ? '✓ Valid' : '✗ INVALID'}
                        </span>
                      )}
                    </p>
                    {validation && !validation.pass && (
                      <div style={{
                        backgroundColor: '#fee2e2',
                        border: '1px solid #fca5a5',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        marginTop: '4px'
                      }}>
                        <p style={{ color: '#991b1b', fontSize: '0.8em', margin: 0 }}>
                          ⚠ {validation.errors[0]}
                        </p>
                      </div>
                    )}
                    <Badge variant="completed" label="Complete" />
                  </>
                );
              })()}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon={FaDownload}
                onClick={() => {
                  const text = `Chapter ${currentChapter.id}: ${currentChapter.title}\n\n${chapterContent}`;
                  const element = document.createElement('a');
                  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                  element.setAttribute('download', `Chapter_${currentChapter.id}.txt`);
                  element.style.display = 'none';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
              >
                Download
              </Button>
            </div>
          </div>
        </Card>

        {/* Chapter Content */}
        <Card title="Content">
          <div className="prose prose-sm max-w-none max-h-96 overflow-y-auto pr-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#000000' }}>
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
