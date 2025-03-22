import React from 'react';
import { Twitter, Instagram, Globe } from 'lucide-react';

interface SocialLinks {
  twitter?: string;
  instagram?: string;
  website?: string;
}

interface ArtistSocialLinksProps {
  socialLinks: SocialLinks;
}

export default function ArtistSocialLinks({ socialLinks }: ArtistSocialLinksProps) {
  return (
    <div className="mt-4 flex gap-4">
      {socialLinks.twitter && (
        <a
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/60 hover:text-accent transition-colors"
        >
          <Twitter className="w-5 h-5" />
        </a>
      )}
      {socialLinks.instagram && (
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/60 hover:text-accent transition-colors"
        >
          <Instagram className="w-5 h-5" />
        </a>
      )}
      {socialLinks.website && (
        <a
          href={socialLinks.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/60 hover:text-accent transition-colors"
        >
          <Globe className="w-5 h-5" />
        </a>
      )}
    </div>
  );
}