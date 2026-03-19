/**
 * Task 4: Build This Component (stretch goal)
 *
 * Build a "Related Posts" widget that shows other posts in the same category
 * as the current post.
 *
 * 4a: Filter allPosts to show up to 3 posts in the same category,
 *     excluding the current post. Render them as linked cards.
 *
 * 4b: What should happen if there are no related posts?
 */
import type { BlogPostSummary } from '../data/cms-helpers';

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
  allPosts: BlogPostSummary[];
}

export default function RelatedPosts({ currentSlug, currentCategory, allPosts }: RelatedPostsProps) {
  // TODO (4a): Filter allPosts to find posts in the same category, excluding the current post.
  //   Show at most 3 results.

  // TODO (4b): What should happen if there are no related posts?

  return (
    <div style={styles.grid}>
      <p style={styles.empty}>Build the related posts component here.</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  card: {
    flex: '1 1 250px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
  },
  category: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: '#2563eb',
    letterSpacing: '0.05em',
  },
  cardTitle: {
    margin: '0.4rem 0',
    fontSize: '1rem',
  },
  cardLink: {
    color: '#1a1a1a',
    textDecoration: 'none',
  },
  cardExcerpt: {
    color: '#6b7280',
    fontSize: '0.85rem',
    margin: '0.5rem 0',
  },
  cardMeta: {
    fontSize: '0.8rem',
    color: '#9ca3af',
  },
  empty: {
    color: '#6b7280',
  },
};
