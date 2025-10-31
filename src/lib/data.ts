import type { ImagePlaceholder } from './placeholder-images';

/**
 * Type definitions for blog articles and comments
 * These types are used for displaying blog data in the UI
 */

/**
 * Comment display type - formatted for UI rendering
 */
export type Comment = {
  id: number;
  author: string;
  avatarUrl: string;
  date: string;
  text: string;
};

/**
 * Article display type - formatted for UI rendering
 * Maps Supabase blog data to UI-friendly format
 */
export type Article = {
  id: string;
  title: string;
  author: string;
  authorAvatarUrl: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverPhoto: ImagePlaceholder;
  comments: Comment[];
};
