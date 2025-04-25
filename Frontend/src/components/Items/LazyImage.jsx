import React from 'react';

const LazyImage = ({ src, alt, className = '', fallback = '/placeholder.jpg' }) => {
  const handleError = (e) => {
    e.target.src = fallback;
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  );
};

export default LazyImage;
