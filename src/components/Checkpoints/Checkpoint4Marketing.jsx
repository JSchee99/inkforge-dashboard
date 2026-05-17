import React, { useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { FaCopy, FaDownload } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const Checkpoint4Marketing = ({ marketingData = {}, onApprove, onRevise }) => {
  const [activeTab, setActiveTab] = useState('ads');
  const [checkedItems, setCheckedItems] = useState({});
  const [copied, setCopied] = useState(null);

  const ads = [
    {
      id: 'ad1',
      platform: 'Instagram',
      type: 'Story Ad',
      preview: 'Discover the magic within. Blood & Shadows—a paranormal romance that will haunt you.',
      cta: 'Shop Now',
    },
    {
      id: 'ad2',
      platform: 'TikTok',
      type: 'Video Teaser',
      preview: '30-second video: Iris discovers her powers as she meets Dorian. Perfect for viral reach.',
      cta: 'Watch Teaser',
    },
    {
      id: 'ad3',
      platform: 'Facebook',
      type: 'Carousel Ad',
      preview: 'Multi-image carousel: Characters, Cover, Magic System, Themes.',
      cta: 'Learn More',
    },
  ];

  const socialPosts = [
    {
      id: 'post1',
      platform: 'Twitter/X',
      content: 'New paranormal romance alert! 🩸✨ Blood & Shadows releases next month. A college student discovers she\'s destined to bridge human and vampire worlds. Pre-order now → #ParanormalRomance #BloodAndShadows',
    },
    {
      id: 'post2',
      platform: 'Instagram Caption',
      content: 'Meet Iris Asher. 22. College student. Vampire hunter. Except... she\'s not quite what she thinks she is. Blood & Shadows coming soon 🖤⚡ #ParanormalRomance #BookRelease #VampireRomance',
    },
    {
      id: 'post3',
      platform: 'TikTok Bio Link',
      content: '"A college student discovers she\'s the prophesied child of a blood moon, destined to bridge the human and vampire worlds." — Blood & Shadows',
    },
  ];

  const audioSamples = [
    {
      id: 'audio1',
      character: 'Iris Asher (Protagonist)',
      narrator: 'Sarah Beth Durst',
      preview: '0:00 / 0:45',
      sample: 'The rain fell like shattered glass...',
    },
    {
      id: 'audio2',
      character: 'Dorian Shade (Antagonist)',
      narrator: 'Michael Kramer',
      preview: '0:00 / 0:45',
      sample: 'Well, this is interesting...',
    },
  ];

  const toggleCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const copyToClipboard = (text, itemId) => {
    navigator.clipboard.writeText(text);
    setCopied(itemId);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-muted-100">
        <div className="flex gap-0">
          {[
            { id: 'ads', label: 'Ads' },
            { id: 'social', label: 'Social Media' },
            { id: 'audio', label: 'Audio Samples' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-4 font-medium border-b-2 transition
                ${activeTab === tab.id
                  ? 'border-primary-500 text-primary-900 bg-primary-50'
                  : 'border-transparent text-muted-600 hover:text-primary-900'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ads Tab */}
      {activeTab === 'ads' && (
        <div className="space-y-4">
          {ads.map(ad => (
            <Card key={ad.id} title={ad.platform} subtitle={ad.type}>
              <div className="space-y-3">
                <div className="bg-muted-50 p-4 rounded-md border-l-4 border-primary-500">
                  <p className="text-sm text-black">{ad.preview}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="info" label={`CTA: ${ad.cta}`} />
                  <input
                    type="checkbox"
                    checked={checkedItems[ad.id] || false}
                    onChange={() => toggleCheck(ad.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Social Media Tab */}
      {activeTab === 'social' && (
        <div className="space-y-4">
          {socialPosts.map(post => (
            <Card key={post.id} title={post.platform}>
              <div className="space-y-3">
                <div className="bg-muted-50 p-4 rounded-md border-l-4 border-accent-500">
                  <p className="text-sm text-black leading-relaxed whitespace-pre-wrap">{post.content}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="tertiary"
                      size="sm"
                      icon={FaCopy}
                      onClick={() => copyToClipboard(post.content, post.id)}
                    >
                      {copied === post.id ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  <input
                    type="checkbox"
                    checked={checkedItems[post.id] || false}
                    onChange={() => toggleCheck(post.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Audio Samples Tab */}
      {activeTab === 'audio' && (
        <div className="space-y-4">
          {audioSamples.map(audio => (
            <Card key={audio.id} title={audio.character} subtitle={`Narrator: ${audio.narrator}`}>
              <div className="space-y-3">
                <div className="bg-muted-50 p-4 rounded-md">
                  <p className="text-xs text-muted-600 mb-2">SAMPLE</p>
                  <p className="text-sm italic text-black">"{audio.sample}"</p>
                </div>
                <div className="bg-white border border-muted-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-muted-600">{audio.preview}</span>
                    <Button variant="secondary" size="sm" icon={FaDownload}>
                      Download
                    </Button>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={checkedItems[audio.id] || false}
                  onChange={() => toggleCheck(audio.id)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Approval Section */}
      <Card title="Marketing Approval">
        <div className="space-y-4">
          <div className="bg-muted-50 p-4 rounded-md">
            <p className="text-sm font-mono font-semibold text-primary-900 mb-2">Approval Summary</p>
            <div className="space-y-2 text-sm text-black">
              <p>Ads approved: {Object.entries(checkedItems).filter(([k]) => k.startsWith('ad') && checkedItems[k]).length} / {ads.length}</p>
              <p>Social posts approved: {Object.entries(checkedItems).filter(([k]) => k.startsWith('post') && checkedItems[k]).length} / {socialPosts.length}</p>
              <p>Audio samples approved: {Object.entries(checkedItems).filter(([k]) => k.startsWith('audio') && checkedItems[k]).length} / {audioSamples.length}</p>
            </div>
          </div>

          <textarea
            placeholder="Add any final notes or feedback on the marketing materials..."
            className="w-full p-3 border border-muted-200 rounded-md text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary-500"
            style={{ color: '#000000' }}
            rows={4}
          />

          <div className="border-t border-muted-100 pt-4 flex gap-3">
            <Button
              variant="primary"
              onClick={() => onApprove?.({ checkpoint: 4, approvedItems: Object.keys(checkedItems).filter(k => checkedItems[k]).length })}
              className="flex-1"
            >
              ✓ Approve All Marketing
            </Button>
            <Button
              variant="secondary"
              onClick={() => onRevise?.({ checkpoint: 4 })}
              className="flex-1"
            >
              ↺ Request Changes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Checkpoint4Marketing;
