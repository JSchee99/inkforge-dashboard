import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ variant = 'neutral', label, icon: Icon, className = '' }) => {
  const variantStyles = {
    active: 'bg-success text-white',
    pending: 'bg-warning text-white',
    completed: 'bg-info text-white',
    failed: 'bg-destructive text-white',
    neutral: 'bg-muted-100 text-primary-900',
  };

  return (
    <span className={`
      inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium
      ${variantStyles[variant]}
      ${className}
    `}>
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf(['active', 'pending', 'completed', 'failed', 'neutral']),
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  className: PropTypes.string,
};

export default Badge;
