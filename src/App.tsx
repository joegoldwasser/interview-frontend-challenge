import { useState } from 'react';
import PostCard from './components/PostCard';
import NewsletterSignup from './components/NewsletterSignup';
import PostList from './components/PostList';
import RelatedPosts from './components/RelatedPosts';
import { getPublishedPostSummaries } from './data/cms-helpers';

const posts = getPublishedPostSummaries();
const firstPost = posts[0];
const secondPost = posts[1];

const TASKS = [
  { title: 'Task 1: Fix the Bugs', file: 'src/components/PostCard.tsx' },
  { title: 'Task 2: Extend This Component', file: 'src/components/PostList.tsx' },
  { title: 'Task 3: Improve This Component', file: 'src/components/NewsletterSignup.tsx' },
  { title: 'Task 4: Build This Component (stretch)', file: 'src/components/RelatedPosts.tsx' },
];

export default function App() {
  const [currentTask, setCurrentTask] = useState(0);
  const task = TASKS[currentTask];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Interview Challenge</h1>
        <p style={styles.intro}>
          See <code style={styles.code}>README.md</code> for full instructions.
          You only need to edit files in <code style={styles.code}>src/components/</code>.
        </p>
        <p style={styles.progress}>
          Task {currentTask + 1} of {TASKS.length}
        </p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{task.title}</h2>
        <p style={styles.taskFile}>File: <code style={styles.code}>{task.file}</code></p>

        <nav style={styles.nav}>
          <button
            onClick={() => setCurrentTask(currentTask - 1)}
            disabled={currentTask === 0}
            style={{
              ...styles.navButton,
              ...(currentTask === 0 ? styles.navButtonDisabled : {}),
            }}
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentTask(currentTask + 1)}
            disabled={currentTask === TASKS.length - 1}
            style={{
              ...styles.navButton,
              ...(currentTask === TASKS.length - 1 ? styles.navButtonDisabled : {}),
            }}
          >
            Next →
          </button>
        </nav>

        {currentTask === 0 && (
          <>
            <PostCard
              postSlug={firstPost.slug}
              title={firstPost.title}
              excerpt={firstPost.excerpt}
              author={firstPost.author}
              category={firstPost.category}
              publishedAt={firstPost.publishedAt}
              isNew={true}
            />
            <PostCard
              postSlug={secondPost.slug}
              title={secondPost.title}
              excerpt={secondPost.excerpt}
              author={secondPost.author}
              category={secondPost.category}
              publishedAt={secondPost.publishedAt}
              isNew={false}
            />
          </>
        )}

        {currentTask === 1 && <PostList posts={posts} />}

        {currentTask === 2 && <NewsletterSignup />}

        {currentTask === 3 && (
          <RelatedPosts
            currentSlug={firstPost.slug}
            currentCategory={firstPost.category}
            allPosts={posts}
          />
        )}
      </section>

      <nav style={styles.nav}>
        <button
          onClick={() => setCurrentTask(currentTask - 1)}
          disabled={currentTask === 0}
          style={{
            ...styles.navButton,
            ...(currentTask === 0 ? styles.navButtonDisabled : {}),
          }}
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentTask(currentTask + 1)}
          disabled={currentTask === TASKS.length - 1}
          style={{
            ...styles.navButton,
            ...(currentTask === TASKS.length - 1 ? styles.navButtonDisabled : {}),
          }}
        >
          Next →
        </button>
      </nav>
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
  progress: {
    color: '#6b7280',
    fontSize: '0.85rem',
    marginTop: '0.5rem',
  },
  code: {
    background: '#f3f4f6',
    padding: '0.15rem 0.4rem',
    borderRadius: '3px',
    fontSize: '0.9em',
  },
  section: {
    marginBottom: '2rem',
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
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  navButton: {
    padding: '0.5rem 1.25rem',
    fontSize: '0.9rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    background: '#fff',
    color: '#1a1a1a',
    cursor: 'pointer',
  },
  navButtonDisabled: {
    opacity: 0.4,
    cursor: 'default',
  },
};
