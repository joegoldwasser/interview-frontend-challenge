import PostCard from './components/PostCard';
import NewsletterSignup from './components/NewsletterSignup';
import PostList from './components/PostList';
import RelatedPosts from './components/RelatedPosts';
import { getPublishedPostSummaries } from './data/cms-helpers';

const posts = getPublishedPostSummaries();
const firstPost = posts[0];
const secondPost = posts[1];

export default function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Interview Challenge</h1>
        <p style={styles.intro}>
          See <code style={styles.code}>README.md</code> for full instructions.
          You only need to edit files in <code style={styles.code}>src/components/</code>.
        </p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Task 1: Fix the Bugs</h2>
        <p style={styles.taskFile}>File: <code style={styles.code}>src/components/PostCard.tsx</code></p>
        <PostCard
          postSlug={firstPost.slug}
          title={firstPost.title}
          excerpt={firstPost.excerpt}
          author={firstPost.author}
          publishedAt={firstPost.publishedAt}
          isNew={true}
        />
        <PostCard
          postSlug={secondPost.slug}
          title={secondPost.title}
          excerpt={secondPost.excerpt}
          author={secondPost.author}
          publishedAt={secondPost.publishedAt}
          isNew={false}
        />
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Task 2: Improve This Component</h2>
        <p style={styles.taskFile}>File: <code style={styles.code}>src/components/NewsletterSignup.tsx</code></p>
        <NewsletterSignup />
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Task 3: Extend This Component</h2>
        <p style={styles.taskFile}>File: <code style={styles.code}>src/components/PostList.tsx</code></p>
        <PostList posts={posts} />
      </section>

      <section style={{ ...styles.section, borderBottom: 'none' }}>
        <h2 style={styles.sectionTitle}>Task 4: Build This Component (stretch)</h2>
        <p style={styles.taskFile}>File: <code style={styles.code}>src/components/RelatedPosts.tsx</code></p>
        <RelatedPosts
          currentSlug={firstPost.slug}
          currentCategory={firstPost.category}
          allPosts={posts}
        />
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    fontFamily: 'system-ui, sans-serif',
    color: '#1a1a1a',
    lineHeight: 1.6,
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.75rem',
    margin: '0 0 0.5rem',
  },
  intro: {
    color: '#6b7280',
    margin: 0,
  },
  code: {
    background: '#f3f4f6',
    padding: '0.15rem 0.4rem',
    borderRadius: '3px',
    fontSize: '0.9em',
  },
  section: {
    marginBottom: '3rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    color: '#1a1a1a',
    margin: '0 0 0.25rem',
  },
  taskFile: {
    fontSize: '0.85rem',
    color: '#6b7280',
    margin: '0 0 1rem',
  },
};
