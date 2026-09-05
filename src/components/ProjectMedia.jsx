import React, { useState } from 'react';
import { Code2, Video, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';

/**
 * Parses Google Drive links to usable preview / direct URLs.
 */
function parseGoogleDriveUrl(url, isVideo = false) {
  if (!url || typeof url !== 'string') return null;

  // Pattern 1: drive.google.com/file/d/ID/view...
  const matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchD && matchD[1]) {
    const fileId = matchD[1];
    return isVideo
      ? `https://drive.google.com/file/d/${fileId}/preview`
      : `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // Pattern 2: drive.google.com/open?id=ID
  const matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) {
    const fileId = matchId[1];
    return isVideo
      ? `https://drive.google.com/file/d/${fileId}/preview`
      : `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return url;
}

export default function ProjectMedia({
  image,
  video,
  title = 'Project Preview',
  category = 'Engineering',
  aspectRatio = '16/9',
  className = '',
  autoplayVideo = true,
  controls = true,
}) {
  const [mediaError, setMediaError] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  // Check if video is provided
  const hasVideo = Boolean(video && typeof video === 'string' && video.trim() !== '');
  const hasImage = Boolean(image && typeof image === 'string' && image.trim() !== '');

  // Determine resolved video URL
  let parsedVideoUrl = null;
  let isGoogleDriveVideo = false;
  let isDirectVideo = false;

  if (hasVideo) {
    if (video.includes('drive.google.com')) {
      parsedVideoUrl = parseGoogleDriveUrl(video, true);
      isGoogleDriveVideo = true;
    } else if (video.endsWith('.mp4') || video.endsWith('.webm') || video.endsWith('.ogg')) {
      parsedVideoUrl = video;
      isDirectVideo = true;
    } else {
      parsedVideoUrl = video;
      isDirectVideo = true;
    }
  }

  // Determine resolved image URL
  let parsedImageUrl = null;
  if (hasImage) {
    if (image.includes('drive.google.com')) {
      parsedImageUrl = parseGoogleDriveUrl(image, false);
    } else {
      parsedImageUrl = image;
    }
  }

  // Fallback UI when neither image nor video exists, or error occurred
  const renderFallback = () => (
    <div
      style={{
        width: '100%',
        aspectRatio,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(9, 13, 22, 0.95) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        border: '1px solid var(--glass-border-subtle)',
        borderRadius: 'var(--radius-md)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-blue)',
          marginBottom: '12px',
        }}
      >
        <Code2 size={26} />
      </div>
      <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
        {title}
      </h4>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        {category} • Interactive Showcase
      </p>
    </div>
  );

  if (mediaError || (!hasVideo && !hasImage)) {
    return renderFallback();
  }

  return (
    <div
      className={`project-media-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--glass-border-subtle)',
      }}
    >
      {/* 1. Video Priority Mode */}
      {hasVideo && parsedVideoUrl ? (
        isGoogleDriveVideo ? (
          <iframe
            src={parsedVideoUrl}
            title={`${title} video presentation`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: 'inherit',
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            onError={() => setMediaError(true)}
          />
        ) : (
          <video
            src={parsedVideoUrl}
            title={`${title} video preview`}
            controls={controls}
            autoPlay={autoplayVideo}
            muted
            loop
            playsInline
            onError={() => setMediaError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'inherit',
              display: 'block',
            }}
          />
        )
      ) : hasImage && parsedImageUrl ? (
        /* 2. Image Mode */
        <img
          src={parsedImageUrl}
          alt={title}
          loading="lazy"
          onLoad={() => setMediaLoaded(true)}
          onError={() => setMediaError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
            display: 'block',
            transition: 'transform var(--transition-normal), opacity var(--transition-normal)',
            opacity: mediaLoaded ? 1 : 0.85,
          }}
        />
      ) : (
        renderFallback()
      )}

      {/* Subtle Bottom Vignette for crisp text contrast */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(9, 13, 22, 0.8) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
