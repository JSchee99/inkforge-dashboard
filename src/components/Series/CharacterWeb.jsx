import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const CharacterWeb = ({ seriesId = 1 }) => {
  const [selectedCharacter, setSelectedCharacter] = useState('iris');

  const characters = {
    iris: { name: 'Iris Asher', role: 'Protagonist', bio: '22-year-old college student with dormant powers' },
    dorian: { name: 'Dorian Shade', role: 'Love Interest', bio: '347-year-old vampire with a hidden past' },
    kira: { name: 'Kira Chen', role: 'Friend', bio: 'Iris\' grounded best friend, normie' },
    evelyn: { name: 'Evelyn Shade', role: 'Antagonist', bio: '500+ year old vampire, Dorian\'s sister' },
  };

  const relationships = [
    { from: 'iris', to: 'dorian', type: 'romance', status: 'Developing' },
    { from: 'iris', to: 'kira', type: 'friendship', status: 'Strong' },
    { from: 'dorian', to: 'evelyn', type: 'family', status: 'Conflict' },
    { from: 'iris', to: 'evelyn', type: 'enemy', status: 'Opposing' },
  ];

  const currentChar = characters[selectedCharacter];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Character List */}
      <div className="lg:col-span-1">
        <Card title="Characters">
          <div className="space-y-2">
            {Object.entries(characters).map(([key, char]) => (
              <button
                key={key}
                onClick={() => setSelectedCharacter(key)}
                className={`
                  w-full text-left p-3 rounded-md transition
                  ${selectedCharacter === key
                    ? 'bg-primary-500 text-white'
                    : 'bg-muted-50 text-primary-900 hover:bg-muted-100'
                  }
                `}
              >
                <p className="font-medium">{char.name}</p>
                <p className="text-xs opacity-75">{char.role}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Character Details */}
      <div className="lg:col-span-2 space-y-6">
        <Card title={currentChar.name} subtitle={currentChar.role}>
          <p className="text-sm text-muted-700">{currentChar.bio}</p>
        </Card>

        {/* Related Characters */}
        <Card title="Relationships">
          <div className="space-y-3">
            {relationships
              .filter(r => r.from === selectedCharacter || r.to === selectedCharacter)
              .map((rel, i) => {
                const otherChar = rel.from === selectedCharacter ? rel.to : rel.from;
                const direction = rel.from === selectedCharacter ? 'to' : 'from';
                return (
                  <div key={i} className="p-3 bg-muted-50 rounded-md border-l-4 border-primary-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary-900">
                          {direction === 'to' ? '→' : '←'} {characters[otherChar].name}
                        </p>
                        <p className="text-xs text-muted-600 capitalize mt-1">{rel.type}</p>
                      </div>
                      <Badge variant="info" label={rel.status} />
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CharacterWeb;
