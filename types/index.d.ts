export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
  footerLinks: NavItem[];
};

export type CollectionData = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: string;
  tag: string;
  count?: number;
};

export type ActiveCategory = {
  category: string;
  emoji: string;
};

export type CollectionLinksProps = {
  activeCollection: string;
  activeCategory: ActiveCategory;
  componentsData: CollectionData[];
};

export type MagicLinkData = {
  action_link: string;
  email_otp: string;
  hashed_token: string;
  redirect_to: string;
  verification_type: string;
  email: string;
};
