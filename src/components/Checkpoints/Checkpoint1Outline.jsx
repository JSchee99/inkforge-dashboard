import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const Checkpoint1Outline = ({ bookData = {}, onApprove, onRevise, onReject }) => {
  const [expandedSections, setExpandedSections] = useState({
    concept: true,
    characters: true,
    worldbuilding: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const book = {
    title: bookData.title || 'Blood & Shadows',
    series: bookData.series || 'The Midnight Court',
    premise: bookData.premise || 'A college student discovers she is the prophesied child of a blood moon, destined to bridge the human and vampire worlds.',
    genre: bookData.genre || 'Paranormal Romance',
    themes: bookData.themes || ['Magic', 'Romance', 'Mystery', 'Destiny'],
    wordCountTarget: bookData.wordCountTarget || '90,000',
    characters: bookData.characters || [
      {
        name: 'Iris Asher',
        role: 'Protagonist',
        age: '22',
        description: 'College student, seemingly ordinary until her powers manifest. Driven, intelligent, determined.',
        arc: 'From doubt to acceptance of her destiny',
      },
      {
        name: 'Dorian Shade',
        role: 'Antagonist/Love Interest',
        age: '347',
        description: 'Ancient vampire, powerful and mysterious. Hides a crucial secret about Iris\' past.',
        arc: 'From manipulation to redemption',
      },
      {
        name: 'Kira Chen',
        role: 'Best Friend',
        age: '22',
        description: 'Iris\' grounded best friend, provides comic relief and emotional support.',
        arc: 'Discovers supernatural world',
      },
      {
        name: 'Evelyn Shade',
        role: 'Villain',
        age: '500+',
        description: 'Dorian\'s sister, ancient and ruthless. Wants to eradicate humans.',
        arc: 'From hidden threat to final antagonist',
      },
    ],
    worldBuilding: bookData.worldBuilding || {
      setting: 'Blackwood University, Portland, Oregon + Hidden Supernatural Zones',
      zones: ['Human World (Public Campus)', 'Vampire Enclave (Underground)', 'Neutral Ground (Auction House)'],
      magicSystem: 'Blood Magic - Power derived from bloodline connections. Iris has unprecedented potential.',
      rules: ['Vampires cannot compel other vampires', 'Witches are rare and powerful', 'The blood moon prophecy is ancient and binding'],
    },
    chapters: 27,
    outline: bookData.outline || [
      { num: 1, title: 'Raven in the Rain', chapters: '1-2', summary: 'Iris hunts a vampire through Portland, discovers her abilities' },
      { num: 2, title: 'Blackwood Academy', chapters: '3-4', summary: 'Iris enrolls at prestigious university, meets Dorian' },
      { num: 3, title: 'Blood and Shadow', chapters: '5-7', summary: 'Dorian\'s attraction grows, Iris learns of supernatural world' },
      { num: 4, title: 'Inciting Incident', chapters: '8-10', summary: 'Iris\' blood burns Dorian, she learns she\'s the prophecy child' },
    ],
  };

  const [feedback, setFeedback] = useState('');
  const [selectedApproval, setSelectedApproval] = useState('pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card title={book.title} subtitle={`Series: ${book.series}`}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p className="text-xs text-muted-600 uppercase font-medium">Genre</p>
            <p className="text-sm font-mono font-semibold text-primary-900 mt-1">{book.genre}</p>
          </div>
          <div>
            <p className="text-xs text-muted-600 uppercase font-medium">Word Count</p>
            <p className="text-sm font-mono font-semibold text-primary-900 mt-1">{book.wordCountTarget}</p>
          </div>
          <div>
            <p className="text-xs text-muted-600 uppercase font-medium">Chapters</p>
            <p className="text-sm font-mono font-semibold text-primary-900 mt-1">{book.chapters}</p>
          </div>
          <div>
            <p className="text-xs text-muted-600 uppercase font-medium">Status</p>
            <p className="text-sm font-mono font-semibold text-primary-900 mt-1">Review</p>
          </div>
        </div>
      </Card>

      {/* Story Concept */}
      <Card>
        <button
          onClick={() => toggleSection('concept')}
          className="w-full flex items-center justify-between p-4 -m-4 hover:bg-muted-50 rounded-md transition"
        >
          <h3 className="text-lg font-mono font-semibold text-primary-900">Story Concept</h3>
          {expandedSections.concept ? <HiChevronUp /> : <HiChevronDown />}
        </button>

        {expandedSections.concept && (
          <div className="space-y-4 border-t border-muted-100 pt-4">
            <div>
              <h4 className="font-mono font-semibold text-primary-900 mb-2">Premise</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#000000' }}>{book.premise}</p>
            </div>
            <div>
              <h4 className="font-mono font-semibold text-primary-900 mb-2">Themes</h4>
              <div className="flex flex-wrap gap-2">
                {book.themes.map(theme => (
                  <Badge key={theme} variant="info" label={theme} />
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Characters */}
      <Card>
        <button
          onClick={() => toggleSection('characters')}
          className="w-full flex items-center justify-between p-4 -m-4 hover:bg-muted-50 rounded-md transition"
        >
          <h3 className="text-lg font-mono font-semibold text-primary-900">Characters</h3>
          {expandedSections.characters ? <HiChevronUp /> : <HiChevronDown />}
        </button>

        {expandedSections.characters && (
          <div className="space-y-4 border-t border-muted-100 pt-4">
            {book.characters.map(char => (
              <div key={char.name} className="bg-muted-50 p-4 rounded-md">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-mono font-semibold text-primary-900">{char.name}</h4>
                    <p className="text-xs text-muted-600">{char.role} • Age {char.age}</p>
                  </div>
                  <Badge variant="neutral" label={char.role} />
                </div>
                <p className="text-sm mb-2" style={{ color: '#000000' }}>{char.description}</p>
                <p className="text-xs text-primary-500 font-mono">Arc: {char.arc}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* World Building */}
      <Card>
        <button
          onClick={() => toggleSection('worldbuilding')}
          className="w-full flex items-center justify-between p-4 -m-4 hover:bg-muted-50 rounded-md transition"
        >
          <h3 className="text-lg font-mono font-semibold text-primary-900">World Building</h3>
          {expandedSections.worldbuilding ? <HiChevronUp /> : <HiChevronDown />}
        </button>

        {expandedSections.worldbuilding && (
          <div className="space-y-4 border-t border-muted-100 pt-4">
            <div>
              <h4 className="font-mono font-semibold text-primary-900 mb-2">Setting</h4>
              <p className="text-sm" style={{ color: '#000000' }}>{book.worldBuilding.setting}</p>
            </div>
            <div>
              <h4 className="font-mono font-semibold text-primary-900 mb-2">Zones</h4>
              <div className="space-y-1">
                {book.worldBuilding.zones.map(zone => (
                  <p key={zone} className="text-sm" style={{ color: '#000000' }}>• {zone}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-mono font-semibold text-primary-900 mb-2">Magic System</h4>
              <p className="text-sm" style={{ color: '#000000' }}>{book.worldBuilding.magicSystem}</p>
            </div>
            <div>
              <h4 className="font-mono font-semibold text-primary-900 mb-2">Rules</h4>
              <ul className="space-y-1">
                {book.worldBuilding.rules.map(rule => (
                  <li key={rule} className="text-sm" style={{ color: '#000000' }}>• {rule}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>

      {/* Chapter Outline */}
      <Card title="Chapter Outline">
        <div className="space-y-3">
          {book.outline.map(section => (
            <div key={section.num} className="border-l-4 border-primary-500 pl-4 py-2">
              <h4 className="font-mono font-semibold text-primary-900">Act {section.num}: {section.title}</h4>
              <p className="text-xs text-muted-600 mt-1">Chapters {section.chapters}</p>
              <p className="text-sm text-muted-700 mt-1">{section.summary}</p>
            </div>
          ))}
          <p className="text-xs text-center text-muted-600 pt-4 border-t border-muted-100 mt-4">
            View full {book.chapters}-chapter breakdown in detailed outline
          </p>
        </div>
      </Card>

      {/* Feedback Section */}
      <Card title="Approval Feedback">
        <div className="space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Add any notes, suggestions, or concerns..."
            className="w-full p-3 border border-muted-200 rounded-md font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            style={{ color: '#000000' }}
            rows={4}
          />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-muted-100">
            <Button
              variant="primary"
              onClick={() => onApprove?.({ feedback, checkpoint: 1 })}
              className="flex-1"
            >
              ✓ Approve Outline
            </Button>
            <Button
              variant="secondary"
              onClick={() => onRevise?.({ feedback, checkpoint: 1 })}
              className="flex-1"
            >
              ↺ Request Revision
            </Button>
            <Button
              variant="destructive"
              onClick={() => onReject?.({ feedback, checkpoint: 1 })}
              className="flex-1"
            >
              ✗ Reject
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Checkpoint1Outline;
