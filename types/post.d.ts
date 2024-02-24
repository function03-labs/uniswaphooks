export type BlogPost = {
  tag: string;
  slug: string;
  title: string;
  date: string;
  emoji: string;
  date: string;
};

export type BlogPreview = {
  previewId: string;
  previewTitle: string;
  previewContainer: string;
};

export type ResourcePost = {
  id: string;
  resourceUrl: string;
  emoji: string;
  title: string;
  description: string;
  section: string;
  status: string;
};
