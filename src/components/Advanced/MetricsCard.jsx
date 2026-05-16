import React from 'react';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';

const MetricsCard = ({ label, value, unit, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary-500 bg-primary-50',
    secondary: 'text-secondary-500 bg-secondary-50',
    accent: 'text-accent-500 bg-accent-50',
    success: 'text-success-500 bg-success-50',
    warning: 'text-warning-500 bg-warning-50',
  };

  const isTrendingUp = trend === 'up';

  return (
    <div className="bg-white rounded-lg border border-muted-200 p-4 shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-muted-600 uppercase font-medium tracking-wider">{label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className={`text-3xl font-bold ${colorClasses[color].split(' ')[0]}`}>
              {value}
            </p>
            {unit && <p className="text-sm text-muted-600">{unit}</p>}
          </div>
        </div>

        {/* Trend Indicator */}
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
            isTrendingUp
              ? 'bg-success-50 text-success-600'
              : 'bg-warning-50 text-warning-600'
          }`}>
            {isTrendingUp ? (
              <HiArrowUp className="w-4 h-4" />
            ) : (
              <HiArrowDown className="w-4 h-4" />
            )}
            <span className="text-xs font-semibold">{trendValue}%</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-muted-100">
        <p className="text-xs text-muted-500">
          {isTrendingUp ? 'Increasing' : 'Decreasing'} trend
        </p>
      </div>
    </div>
  );
};

MetricsCard.defaultProps = {
  color: 'primary',
  trend: null,
  trendValue: 0,
};

export default MetricsCard;
