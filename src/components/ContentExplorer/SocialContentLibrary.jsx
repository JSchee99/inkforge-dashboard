import React, { useState } from 'react';
import { HiCopy, HiDownload } from 'react-icons/hi';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const SocialContentLibrary = () => {
  const [copied, setCopied] = useState(null);

  const content = [
    {
      id: 1,
      platform: 'Twitter/X',
      type: 'Promotional Tweet',
      text: 'New paranormal romance alert! 🩸✨ Blood & Shadows releases next month. A college student discovers she\'s destined to bridge human and vampire worlds. Pre-order now → #ParanormalRomance',
      engagement: '2.3K likes',
    },
    {
      id: 2,
      platform: 'Instagram',
      type: 'Caption',
      text: 'Meet Iris Asher. 22. College student. Vampire hunter. Except... she\'s not quite what she thinks she is. Blood & Shadows coming soon 🖤⚡ #ParanormalRomance #BookRelease',
      engagement: '1.8K likes',
    },
    {
      id: 3,
      platform: 'TikTok',
      type: 'Video Description',
      text: '"A college student discovers she\'s the prophesied child of a blood moon, destined to bridge the human and vampire worlds." — Blood & Shadows',
      engagement: '156K views',
    },
    {
      id: 4,
      platform: 'Facebook',
      type: 'Event Announcement',
      text: '📚✨ Blood & Shadows Book Release ✨📚 Join us for the official release party! Features: Cover reveal, character Q&A, exclusive audiobook previews, and giveaways! Mark your calendars for August 15.',
      engagement: '4.2K shares',
    },
  ];

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-mono font-bold text-primary-900">Social Media Content Library</h2>

      <div className="grid grid-cols-1 gap-4">
        {content.map(item => (
          <Card key={item.id} title={item.platform} subtitle={item.type}>
            <div className="space-y-3">
              {/* Content */}
              <div className="bg-muted-50 p-4 rounded-md border-l-4 border-accent-500">
                <p className="text-sm text-muted-800 leading-relaxed">{item.text}</p>
              </div>

              {/* Engagement */}
              <div className="flex items-center justify-between">
                <Badge variant="info" label={item.engagement} />
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={HiCopy}
                    onClick={() => copyToClipboard(item.text, item.id)}
                  >
                    {copied === item.id ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={HiDownload}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialContentLibrary;
