import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

const SeriesList = ({ series = {}, onSelectSeries }) => {
  const seriesList = [
    {
      id: 1,
      name: 'The Midnight Court',
      booksPlanned: 3,
      booksPublished: 0,
      currentBook: 'Blood & Shadows',
      status: 'In Progress',
      completion: 35,
      genres: ['Paranormal Romance', 'Fantasy'],
    },
    {
      id: 2,
      name: 'Urban Legends',
      booksPlanned: 2,
      booksPublished: 0,
      currentBook: 'TBD',
      status: 'Planned',
      completion: 0,
      genres: ['Urban Fantasy', 'Thriller'],
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-mono font-bold text-primary-900">Series Management</h1>

      <div className="grid grid-cols-1 gap-4">
        {seriesList.map(s => (
          <Card
            key={s.id}
            title={s.name}
            clickable
            onClick={() => onSelectSeries?.(s.id)}
            className="cursor-pointer hover:shadow-lg"
          >
            <div className="space-y-4">
              {/* Metadata */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-600 uppercase font-medium">Books Planned</p>
                  <p className="text-2xl font-bold text-primary-500 mt-1">{s.booksPlanned}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-600 uppercase font-medium">Published</p>
                  <p className="text-2xl font-bold text-success mt-1">{s.booksPublished}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-600 uppercase font-medium">Completion</p>
                  <p className="text-2xl font-bold text-accent-500 mt-1">{s.completion}%</p>
                </div>
              </div>

              {/* Current Book */}
              <div className="bg-muted-50 p-3 rounded-md border-l-4 border-primary-500">
                <p className="text-xs text-muted-600 uppercase font-medium">Current Book</p>
                <p className="text-sm font-mono font-semibold text-primary-900 mt-1">{s.currentBook}</p>
                <Badge variant="pending" label={s.status} className="mt-2" />
              </div>

              {/* Genres */}
              <div>
                <p className="text-xs text-muted-600 uppercase font-medium mb-2">Genres</p>
                <div className="flex flex-wrap gap-2">
                  {s.genres.map(genre => (
                    <Badge key={genre} variant="info" label={genre} />
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div>
                <p className="text-xs text-muted-600 uppercase font-medium mb-2">Series Progress</p>
                <div className="w-full bg-muted-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-400 h-full rounded-full"
                    style={{ width: `${s.completion}%` }}
                  />
                </div>
              </div>

              {/* Action */}
              <Button
                variant="secondary"
                onClick={() => onSelectSeries?.(s.id)}
                className="w-full"
              >
                View Series Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SeriesList;
