import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  animated = true,
  color = 'primary',
  showPercentage = true,
  className = '',
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-400',
    success: 'bg-success',
    warning: 'bg-warning',
    destructive: 'bg-destructive',
  };

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <label className="text-sm font-medium text-primary-900">{label}</label>}
          {showPercentage && <span className="text-xs text-muted-600">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="w-full bg-muted-100 rounded-full h-1.5 overflow-hidden">
        <div
          className={`
            h-full rounded-full transition-all duration-500
            ${colorClasses[color]}
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
  animated: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'success', 'warning', 'destructive']),
  showPercentage: PropTypes.bool,
  className: PropTypes.string,
};

export default ProgressBar;
