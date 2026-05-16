import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  title,
  subtitle,
  status,
  children,
  onClick,
  clickable = false,
  className = '',
  headerAction,
}) => {
  const statusColors = {
    active: 'bg-success border-l-4 border-success',
    pending: 'bg-white border-l-4 border-warning',
    completed: 'bg-white border-l-4 border-info',
    failed: 'bg-white border-l-4 border-destructive',
    neutral: 'bg-white',
  };

  const handleKeyDown = (e) => {
    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={`
        bg-white rounded-md border border-primary-100 shadow-md
        transition-all duration-200
        ${clickable ? 'cursor-pointer hover:shadow-lg hover:border-primary-300 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:outline-none' : ''}
        ${className}
      `}
      onClick={clickable ? onClick : undefined}
      onKeyDown={handleKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable && title ? `${title}. Click to view details` : undefined}
    >
      {(title || subtitle || status) && (
        <div className="border-b border-muted-100 px-4 py-3 flex items-start justify-between">
          <div>
            {title && <h3 className="font-mono font-semibold text-primary-900">{title}</h3>}
            {subtitle && <p className="text-sm text-muted-600 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {status && (
              <span className={`
                inline-block px-2 py-1 rounded text-xs font-medium text-white
                ${status === 'active' ? 'bg-success' : ''}
                ${status === 'pending' ? 'bg-warning' : ''}
                ${status === 'completed' ? 'bg-info' : ''}
                ${status === 'failed' ? 'bg-destructive' : ''}
              `}>
                {status}
              </span>
            )}
            {headerAction && headerAction}
          </div>
        </div>
      )}
      <div className="px-4 py-4">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  status: PropTypes.oneOf(['active', 'pending', 'completed', 'failed', 'neutral']),
  children: PropTypes.node,
  onClick: PropTypes.func,
  clickable: PropTypes.bool,
  className: PropTypes.string,
  headerAction: PropTypes.node,
};

export default Card;
