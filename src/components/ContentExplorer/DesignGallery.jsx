import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { HiDownload, HiEye } from 'react-icons/hi';

const DesignGallery = () => {
  const designs = [
    { id: 1, name: 'Elegant Mystique', book: 'Blood & Shadows', date: '2026-05-15', status: 'approved' },
    { id: 2, name: 'Dark Romance', book: 'Blood & Shadows', date: '2026-05-14', status: 'reviewed' },
    { id: 3, name: 'Urban Legend', book: 'Blood & Shadows', date: '2026-05-13', status: 'variant' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-mono font-bold text-primary-900">Cover Design Gallery</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {designs.map(design => (
          <Card key={design.id} title={design.name} subtitle={design.book}>
            <div className="space-y-3">
              <div className="aspect-[3/4] bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white">
                <p className="text-center">Design Preview</p>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant={design.status === 'approved' ? 'completed' : 'pending'} label={design.status} />
                <span className="text-xs text-muted-600">{design.date}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" icon={HiEye}>View</Button>
                <Button variant="secondary" size="sm" icon={HiDownload}>Download</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DesignGallery;
