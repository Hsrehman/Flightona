import React, { useState } from 'react';

const DEFAULT_FALLBACK = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="Arial, Helvetica, sans-serif" font-size="16">Image not available</text></svg>';

function SafeImage({ src, alt, className, style, fallback = DEFAULT_FALLBACK, loading = 'lazy', fetchPriority }) {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);
  const handleError = () => {
    if (currentSrc !== fallback) setCurrentSrc(fallback);
  };
  return (
    <img
      src={currentSrc}
      alt={alt || ''}
      className={className}
      style={style}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={handleError}
      referrerPolicy="no-referrer"
      decoding="async"
    />
  );
}

export default SafeImage;


