import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const ManuscriptBrowser = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const manuscripts = [
    { id: 1, title: 'Blood & Shadows Draft 1', book: 'Blood & Shadows', version: 'v1.0', date: '2026-05-15', format: ['PDF', 'DOCX', 'EPUB'] },
    { id: 2, title: 'Blood & Shadows Draft 2 (Revised)', book: 'Blood & Shadows', version: 'v2.0', date: '2026-05-14', format: ['PDF', 'DOCX', 'EPUB'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search manuscripts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-muted-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {manuscripts.map(ms => (
          <Card key={ms.id} title={ms.title} subtitle={ms.book}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="completed" label={ms.version} />
                  <p className="text-xs text-muted-600 mt-2">{ms.date}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {ms.format.map(fmt => (
                  <Button key={fmt} variant="secondary" size="sm" icon={FaDownload}>
                    {fmt}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManuscriptBrowser;
