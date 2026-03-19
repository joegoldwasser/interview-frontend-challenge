import { useParams, Link } from 'react-router-dom';
import { getPublishedPosts } from '../data/cms-helpers';
import type { ContentBlock } from '../data/cms-helpers';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPublishedPosts().find((p) => p.slug === slug);

  if (!post) {
    return (
      <div style={styles.container}>
        <h1>Post not found</h1>
        <p>No post matches "{slug}"</p>
        <Link to="/" style={{ color: '#2563eb' }}>&larr; Back to challenge</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <article>
        <header>
          <span style={styles.category}>{post.category}</span>
          <h1 style={styles.title}>{post.title}</h1>
          <div style={styles.meta}>
            <span>By {post.author}</span>
            <span>&middot;</span>
            <span>
              {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
          </div>
        </header>

        <div style={styles.body}>
          {post.body?.map((block: ContentBlock, i: number) => {
            if (block.type === 'paragraph') return <p key={i}>{block.text}</p>;
            if (block.type === 'heading') return <h2 key={i}>{block.text}</h2>;
            if (block.type === 'link' && block.href) {
              return <p key={i}><a href={block.href} style={{ color: '#2563eb' }}>{block.text}</a></p>;
            }
            return null;
          })}
          {!post.body && <p style={{ color: '#6b7280' }}>Full article content would appear here.</p>}
        </div>

        <footer style={styles.footer}>
          <Link to="/" style={{ color: '#2563eb' }}>&larr; Back to challenge</Link>
        </footer>
      </article>
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
  category: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: '#2563eb',
    letterSpacing: '0.05em',
  },
  title: {
    fontSize: '2rem',
    margin: '0.5rem 0',
  },
  meta: {
    fontSize: '0.9rem',
    color: '#6b7280',
    display: 'flex',
    gap: '0.5rem',
  },
  body: {
    marginTop: '1.5rem',
  },
  footer: {
    marginTop: '3rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e5e7eb',
  },
};
