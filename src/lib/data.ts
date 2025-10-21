import type { ImagePlaceholder } from './placeholder-images';

export type Comment = {
  id: number;
  author: string;
  avatarUrl: string;
  date: string;
  text: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorAvatarUrl: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  image: ImagePlaceholder;
  comments: Comment[];
};
