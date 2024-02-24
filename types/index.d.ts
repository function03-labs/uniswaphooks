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
