import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

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
<<<<<<< HEAD
<<<<<<< HEAD
  coverPhoto: ImagePlaceholder;
  comments: Comment[];
=======
  image: ImagePlaceholder;
  comments: Comment[]; // This will now be populated from Supabase, but we can keep the structure
>>>>>>> parent of b4e7531 (Fetch the blogs from supabase and use pagination)
=======
  image: ImagePlaceholder;
  comments: Comment[]; // This will now be populated from Supabase, but we can keep the structure
>>>>>>> parent of b4e7531 (Fetch the blogs from supabase and use pagination)
};

function findImage(id: string): ImagePlaceholder {
    const image = PlaceHolderImages.find(p => p.id === id);
    if (!image) {
        // Fallback for safety, though we expect all images to be found.
        return {
          id: 'fallback',
          description: 'A placeholder image',
          imageUrl: 'https://picsum.photos/seed/fallback/1200/800',
          imageHint: 'placeholder'
        }
    }
    return image;
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'wrestling-with-doubt',
    title: 'Wrestling with Doubt: A Pathway to Stronger Faith',
    author: 'Eleanor Vance',
    authorAvatarUrl: 'https://picsum.photos/seed/avatar1/40/40',
    date: 'October 26, 2023',
    excerpt: 'Doubt is not the opposite of faith; it is an element of faith. This article explores how engaging with our questions can lead to a more resilient and personal belief.',
    content: `<p>For many, the experience of doubt feels like a betrayal of faith. We're taught that belief should be steadfast, a rock in the swirling seas of uncertainty. But what if doubt isn't a sign of weakness? What if, instead, it's an invitation to a deeper, more authentic spiritual journey?</p>
<p>The history of faith is filled with figures who wrestled with profound questions. From Job's cries to the heavens to Thomas's need for proof, the narrative is not one of blind acceptance, but of honest struggle. This struggle is what forges a faith that is not inherited, but owned.</p>
<p>When we allow ourselves to question, we create space for God to meet us in our uncertainty. We move beyond a faith of easy answers and into a relationship that can withstand the complexities of life. This article explores practical ways to lean into doubt, not as an enemy, but as a guide on the quest for truth.</p>`,
    tags: ['doubt', 'faith', 'spirituality'],
    image: findImage('article-1'),
    comments: [] // Comments will be loaded from Supabase
  },
  {
    id: '2',
    slug: 'the-meaning-in-the-mystery',
    title: 'The Meaning in the Mystery: Finding Purpose in the Unknown',
    author: 'Dr. Alistair Finch',
    authorAvatarUrl: 'https://picsum.photos/seed/avatar2/40/40',
    date: 'October 22, 2023',
    excerpt: 'Life\'s biggest questions often have no simple answers. We explore the spiritual practice of embracing mystery and finding purpose not in certainty, but in the quest itself.',
    content: `<p>In a world that prizes data and clear-cut answers, the spiritual path often leads us into the heart of mystery. What is the meaning of life? Why is there suffering? What happens after we die? These are not puzzles to be solved but mysteries to be lived.</p>
<p>Embracing mystery is a spiritual discipline. It requires humility, a willingness to admit "I don't know," and a trust that there is a deeper wisdom at play. It's about shifting our focus from finding the "right" answer to finding meaning in the journey of seeking.</p>
<p>This article delves into how various Christian traditions have approached the concept of divine mystery and how we can cultivate a sense of wonder and trust in our own lives, even when the path ahead is unclear.</p>`,
    tags: ['meaning', 'purpose', 'christianity', 'mystery'],
    image: findImage('article-2'),
    comments: [] // Comments will be loaded from Supabase
  },
  {
    id: '3',
    slug: 'beyond-the-pews',
    title: 'Beyond the Pews: Is Community Essential for Faith?',
    author: 'Jasmine Reed',
    authorAvatarUrl: 'https://picsum.photos/seed/avatar3/40/40',
    date: 'October 18, 2023',
    excerpt: 'Many people are leaving traditional church settings, yet still long for spiritual connection. We examine the role of community in the modern faith journey.',
    content: `<p>The landscape of faith is changing. While traditional church attendance has declined in some areas, the human desire for connection and shared spiritual experience remains as strong as ever. This has led to a rise in alternative forms of community, from small home groups to online forums.</p>
<p>But is a formal community necessary for a vibrant faith? Can one be a "lone wolf" Christian? This article explores the biblical basis for community, the psychological benefits of belonging, and the various ways people are finding and creating spiritual families outside of traditional structures.</p>
<p>We'll look at the pros and cons of different models and argue that while the form may change, the function of community—for encouragement, accountability, and shared worship—is an indispensable part of a thriving spiritual life.</p>`,
    tags: ['community', 'church', 'spirituality'],
    image: findImage('article-3'),
    comments: [] // Comments will be loaded from Supabase
  }
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
}
