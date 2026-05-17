import React, { useState } from 'react';
import { HiPlay, HiPause } from 'react-icons/hi';
import { FaDownload } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';

const AudioPlayer = () => {
  const [playing, setPlaying] = useState(null);
  const [currentTime, setCurrentTime] = useState({});

  const samples = [
    {
      id: 1,
      character: 'Iris Asher (Protagonist)',
      narrator: 'Sarah Beth Durst',
      duration: '45 sec',
      sample: '"The rain fell like shattered glass. I had to find him."',
    },
    {
      id: 2,
      character: 'Dorian Shade (Love Interest)',
      narrator: 'Michael Kramer',
      duration: '38 sec',
      sample: '"Well, this is interesting. A girl who can burn a vampire with her touch."',
    },
    {
      id: 3,
      character: 'Kira Chen (Best Friend)',
      narrator: 'Amanda Duckworth',
      duration: '42 sec',
      sample: '"Iris, what are you getting yourself into? This is insane."',
    },
    {
      id: 4,
      character: 'Full Chapter Sample',
      narrator: 'Full Cast',
      duration: '8 min 23 sec',
      sample: 'Chapter 1: Raven in the Rain - Complete narration',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-mono font-bold text-primary-900">Audio Samples</h2>

      <div className="grid grid-cols-1 gap-4">
        {samples.map(sample => (
          <Card key={sample.id} title={sample.character} subtitle={sample.narrator}>
            <div className="space-y-4">
              {/* Sample Text */}
              <p className="text-sm italic text-muted-700 bg-muted-50 p-3 rounded-md border-l-4 border-primary-500">
                "{sample.sample}"
              </p>

              {/* Player */}
              <div className="bg-white border border-muted-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPlaying(playing === sample.id ? null : sample.id)}
                      className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
                    >
                      {playing === sample.id ? (
                        <HiPause className="w-5 h-5" />
                      ) : (
                        <HiPlay className="w-5 h-5" />
                      )}
                    </button>
                    <div>
                      <p className="text-xs text-muted-600 uppercase font-medium">Duration</p>
                      <p className="text-sm font-mono font-semibold text-primary-900">{sample.duration}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" icon={FaDownload}>
                    Download
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted-200 rounded-full h-1">
                  <div className="bg-primary-500 h-full rounded-full w-1/3" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer;
