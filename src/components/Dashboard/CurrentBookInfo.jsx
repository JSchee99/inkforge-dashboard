import React from 'react';
import { HiArrowRight } from 'react-icons/hi';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

const CurrentBookInfo = ({ bookData = {} }) => {
  const book = {
    title: bookData.title || 'Blood & Shadows',
    series: bookData.series || 'The Midnight Court',
    genre: bookData.genre || 'Paranormal Romance',
    themes: bookData.themes || ['Magic', 'Romance', 'Mystery'],
    protagonist: bookData.protagonist || 'Iris Asher',
    antagonist: bookData.antagonist || 'Dorian Shade',
    wordCountTarget: bookData.wordCountTarget || '90,000',
    currentCheckpoint: bookData.currentCheckpoint || 'Outline Approval',
    characters: bookData.characters || [
      { name: 'Iris Asher', role: 'Protagonist', status: '✓' },
      { name: 'Dorian Shade', role: 'Antagonist', status: '✓' },
      { name: 'Kira Chen', role: 'Best Friend', status: '✓' },
    ],
    nextDeadline: bookData.nextDeadline || 'Today at 5:00 PM',
  };

  return (
    <Card
      title={book.title}
      subtitle={book.series}
      className="sticky top-20"
    >
      <div className="space-y-4">
        {/* Genre & Themes */}
        <div>
          <p className="text-xs text-muted-600 uppercase font-medium mb-2">Genre & Themes</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="neutral" label={book.genre} />
            {book.themes.map(theme => (
              <Badge key={theme} variant="info" label={theme} />
            ))}
          </div>
        </div>

        {/* Characters */}
        <div>
          <p className="text-xs text-muted-600 uppercase font-medium mb-2">Main Characters</p>
          <div className="space-y-2">
            {book.characters.map(char => (
              <div key={char.name} className="flex items-center justify-between bg-muted-100 p-2 rounded-md">
                <div>
                  <p className="text-sm font-medium text-primary-900">{char.name}</p>
                  <p className="text-xs text-muted-600">{char.role}</p>
                </div>
                <span className="text-success font-bold">{char.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Checkpoint Status */}
        <div className="border-t border-muted-100 pt-4">
          <p className="text-xs text-muted-600 uppercase font-medium mb-2">Current Checkpoint</p>
          <div className="bg-accent-50 border border-accent-200 rounded-md p-3 mb-3">
            <p className="font-mono font-semibold text-primary-900">{book.currentCheckpoint}</p>
            <p className="text-xs text-muted-600 mt-1">Due: {book.nextDeadline}</p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={HiArrowRight}
            onClick={() => console.log('Navigate to checkpoint')}
            className="w-full"
          >
            Review & Approve
          </Button>
        </div>

        {/* Metadata */}
        <div className="border-t border-muted-100 pt-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-muted-600 uppercase font-medium">Word Count Target</p>
            <p className="text-primary-900 font-mono font-semibold mt-1">{book.wordCountTarget}</p>
          </div>
          <div>
            <p className="text-muted-600 uppercase font-medium">Status</p>
            <p className="text-success font-mono font-semibold mt-1">In Progress</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentBookInfo;
