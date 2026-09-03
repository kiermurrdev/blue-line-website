/** Shared TypeScript types for the Blue Line website. */

export interface SiteConfig {
  name: string;
  phone: string;
  email: string;
  address?: string;
  hours?: string;
  socials?: SocialLink[];
  dotNumber?: string;
  insuranceStatement?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}
