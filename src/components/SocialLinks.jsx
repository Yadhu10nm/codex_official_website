import React from 'react';
import { Globe, Mail, ExternalLink } from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  DiscordIcon,
  YoutubeIcon,
  TwitterIcon,
} from './SocialIcons';

export function getSocialIcon(iconName, size = 18) {
  const norm = (iconName || '').toLowerCase();
  switch (norm) {
    case 'github':
      return <GithubIcon size={size} />;
    case 'linkedin':
      return <LinkedinIcon size={size} />;
    case 'instagram':
      return <InstagramIcon size={size} />;
    case 'discord':
    case 'messagesquare':
      return <DiscordIcon size={size} />;
    case 'youtube':
      return <YoutubeIcon size={size} />;
    case 'twitter':
    case 'x':
      return <TwitterIcon size={size} />;
    case 'mail':
    case 'email':
      return <Mail size={size} />;
    default:
      return <Globe size={size} />;
  }
}

export default function SocialLinks({
  socials = [],
  variant = 'icon-only',
  className = '',
  size = 18,
}) {
  if (!socials || socials.length === 0) return null;

  return (
    <div
      className={`social-links-wrapper ${className}`}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}
    >
      {socials.map((item, idx) => {
        if (!item.url) return null;

        return (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name || 'Social Link'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: variant === 'pill' ? '6px 14px' : '8px',
              borderRadius: variant === 'pill' ? 'var(--radius-full)' : 'var(--radius-sm)',
              background: 'var(--glass-bg-subtle)',
              border: '1px solid var(--glass-border-subtle)',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              backdropFilter: 'var(--glass-blur-sm)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--glass-border-highlight)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--glass-border-subtle)';
              e.currentTarget.style.background = 'var(--glass-bg-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {getSocialIcon(item.icon || item.name, size)}
            {variant === 'pill' && <span>{item.name}</span>}
          </a>
        );
      })}
    </div>
  );
}
