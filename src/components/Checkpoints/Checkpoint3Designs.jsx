import React, { useState } from 'react';
import { HiHeart, HiCheck } from 'react-icons/hi';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const Checkpoint3Designs = ({ designs = {}, onApprove, onRevise }) => {
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState('hardcover');
  const [feedback, setFeedback] = useState('');

  const designOptions = [
    {
      id: 1,
      name: 'Elegant Mystique',
      style: 'Glassmorphism + Mystical',
      colors: ['#1E40AF', '#D97706', '#06B6D4'],
      rating: 4.8,
      votes: 24,
    },
    {
      id: 2,
      name: 'Dark Romance',
      style: 'Dark Mode + Gothic',
      colors: ['#1a1a2e', '#e94560', '#16213e'],
      rating: 4.6,
      votes: 18,
    },
    {
      id: 3,
      name: 'Urban Legend',
      style: 'Modern + Street Art',
      colors: ['#2d3436', '#fd79a8', '#fdcb6e'],
      rating: 4.2,
      votes: 12,
    },
  ];

  const currentDesign = designOptions.find(d => d.id === selectedDesign) || designOptions[0];

  const formats = [
    { id: 'hardcover', label: 'Hardcover', dimensions: '6" × 9"' },
    { id: 'paperback', label: 'Paperback', dimensions: '5.5" × 8.5"' },
    { id: 'ebook', label: 'eBook', dimensions: 'Digital Format' },
  ];

  return (
    <div className="space-y-6">
      {/* Design Gallery */}
      <div>
        <h2 className="text-lg font-mono font-semibold text-primary-900 mb-4">Design Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {designOptions.map(design => (
            <button
              key={design.id}
              onClick={() => setSelectedDesign(design.id)}
              className={`
                relative group overflow-hidden rounded-lg border-2 transition
                ${selectedDesign === design.id
                  ? 'border-primary-500 shadow-lg'
                  : 'border-muted-200 hover:border-primary-300'
                }
              `}
            >
              {/* Design Mockup */}
              <div
                className="w-full aspect-[3/4] rounded-lg flex items-center justify-center text-white font-bold text-xl relative"
                style={{
                  background: `linear-gradient(135deg, ${design.colors[0]} 0%, ${design.colors[1]} 50%, ${design.colors[2]} 100%)`,
                }}
              >
                <div className="text-center">
                  <p className="text-sm opacity-75">Blood & Shadows</p>
                  <p className="text-lg font-bold">Design {design.id}</p>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 bg-white">
                <p className="font-mono font-semibold text-primary-900">{design.name}</p>
                <p className="text-xs text-black mt-1">{design.style}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-mono text-primary-500">★ {design.rating}</span>
                  <span className="text-xs text-black">({design.votes} votes)</span>
                </div>
              </div>

              {selectedDesign === design.id && (
                <div className="absolute top-2 right-2 bg-success text-white p-2 rounded-full">
                  <HiCheck className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Design Preview */}
      <Card title={`${currentDesign.name} - Format Preview`}>
        <div className="space-y-6">
          {/* Format Selector */}
          <div>
            <p className="text-sm font-mono font-semibold text-primary-900 mb-3">Select Format</p>
            <div className="flex gap-3">
              {formats.map(fmt => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`
                    px-4 py-2 rounded-md border transition text-sm
                    ${selectedFormat === fmt.id
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'border-muted-200 text-primary-900 hover:border-primary-300'
                    }
                  `}
                >
                  <p className="font-medium">{fmt.label}</p>
                  <p className="text-xs opacity-75">{fmt.dimensions}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Large Preview */}
          <div className="flex justify-center">
            <div
              className="w-48 aspect-[3/4] rounded-lg shadow-xl flex items-center justify-center text-white font-bold text-2xl"
              style={{
                background: `linear-gradient(135deg, ${currentDesign.colors[0]} 0%, ${currentDesign.colors[1]} 50%, ${currentDesign.colors[2]} 100%)`,
              }}
            >
              <div className="text-center">
                <p className="text-lg opacity-75">Blood & Shadows</p>
                <p className="text-3xl font-bold mt-4">✦</p>
                <p className="text-sm mt-4 opacity-75">The Midnight Court</p>
              </div>
            </div>
          </div>

          {/* Design Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center bg-muted-50 p-3 rounded-md">
              <p className="text-xs text-black uppercase font-medium">Primary Color</p>
              <div
                className="w-8 h-8 rounded-md mx-auto mt-2"
                style={{ backgroundColor: currentDesign.colors[0] }}
              />
              <p className="text-xs font-mono mt-1">{currentDesign.colors[0]}</p>
            </div>
            <div className="text-center bg-muted-50 p-3 rounded-md">
              <p className="text-xs text-black uppercase font-medium">Secondary</p>
              <div
                className="w-8 h-8 rounded-md mx-auto mt-2"
                style={{ backgroundColor: currentDesign.colors[1] }}
              />
              <p className="text-xs font-mono mt-1">{currentDesign.colors[1]}</p>
            </div>
            <div className="text-center bg-muted-50 p-3 rounded-md">
              <p className="text-xs text-black uppercase font-medium">Accent</p>
              <div
                className="w-8 h-8 rounded-md mx-auto mt-2"
                style={{ backgroundColor: currentDesign.colors[2] }}
              />
              <p className="text-xs font-mono mt-1">{currentDesign.colors[2]}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Approval */}
      <Card title="Design Approval">
        <div className="space-y-4">
          <div className="bg-muted-50 p-4 rounded-md">
            <p className="text-sm font-mono font-semibold text-primary-900 mb-2">
              Selected: {currentDesign.name}
            </p>
            <p className="text-xs text-black">
              Community rating: ★ {currentDesign.rating} ({currentDesign.votes} votes)
            </p>
          </div>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Add feedback on the design, color scheme, or suggestions for changes..."
            className="w-full p-3 border border-muted-200 rounded-md text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary-500"
            style={{ color: '#000000' }}
            rows={4}
          />

          <div className="border-t border-muted-100 pt-4 flex gap-3">
            <Button
              variant="primary"
              onClick={() => onApprove?.({ checkpoint: 3, designId: selectedDesign, format: selectedFormat, feedback })}
              className="flex-1"
            >
              ✓ Approve Design
            </Button>
            <Button
              variant="secondary"
              onClick={() => onRevise?.({ checkpoint: 3 })}
              className="flex-1"
            >
              ↺ Select Different Design
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Checkpoint3Designs;
