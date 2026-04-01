/**
 * Task 5: Review & Improve This Component
 *
 * This comment moderation panel works — you can filter, select, and moderate
 * comments. But it has issues across three areas. Find and fix as many as
 * you can:
 *
 * - Performance: this component does more work than it needs to on each render (~3 issues)
 * - Accessibility: several interactive elements aren't usable with a keyboard
 *   or screen reader (~3 issues)
 * - Error handling: the moderation actions don't handle failures well (~2 issues)
 *
 * Prioritize the fixes you think matter most. We care more about your reasoning
 * than about hitting every issue.
 */
import { useState } from 'react';
import { MOCK_COMMENTS, moderateComment } from '../data/comment-helpers';
import type { CommentStatus } from '../data/comment-helpers';

const FILTERS: Array<{ label: string; value: CommentStatus | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Spam', value: 'spam' },
];

export default function CommentModeration() {
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [activeFilter, setActiveFilter] = useState<CommentStatus | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // BUG (perf): filter + sort recalculated every render, Date parsed in comparator
  const filteredComments = comments
    .filter(c => activeFilter === 'all' || c.status === activeFilter)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const counts = {
    all: comments.length,
    pending: comments.filter(c => c.status === 'pending').length,
    approved: comments.filter(c => c.status === 'approved').length,
    spam: comments.filter(c => c.status === 'spam').length,
  };

  const allSelected = filteredComments.length > 0 &&
    filteredComments.every(c => selectedIds.has(c.id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredComments.map(c => c.id)));
    }
  };

  // BUG (error + perf): no loading indicator, buttons stay clickable during
  // API call, no error handling on failure, and captures `comments` from
  // closure instead of using functional updater.
  const handleModerate = async (commentId: string, newStatus: CommentStatus) => {
    try {
      await moderateComment(commentId, newStatus);
      const updated = comments.map(c =>
        c.id === commentId ? { ...c, status: newStatus } : c
      );
      setComments(updated);
    } catch (error) {
      console.error('Failed to moderate comment:', error);
    }
  };

  const handleBulkAction = (newStatus: CommentStatus) => {
    const ids = Array.from(selectedIds);
    setComments(prev => prev.map(c =>
      ids.includes(c.id) ? { ...c, status: newStatus } : c
    ));
    setSelectedIds(new Set());
  };

  return (
    <div>
      {/* BUG (a11y): try navigating these tabs with only the keyboard */}
      <div style={styles.tabs}>
        {FILTERS.map(f => (
          <div
            key={f.value}
            style={activeFilter === f.value ? styles.activeTab : styles.tab}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label} ({counts[f.value]})
          </div>
        ))}
      </div>

      <div style={styles.bulkBar}>
        {/* BUG (a11y): what does a screen reader announce for this checkbox? */}
        <input
          type="checkbox"
          checked={allSelected}
          onChange={handleSelectAll}
        />
        <span style={styles.bulkLabel}>Select All</span>
        {selectedIds.size > 0 && (
          <>
            <button style={styles.approveBtn} onClick={() => handleBulkAction('approved')}>
              Approve ({selectedIds.size})
            </button>
            <button style={styles.rejectBtn} onClick={() => handleBulkAction('spam')}>
              Mark Spam ({selectedIds.size})
            </button>
          </>
        )}
      </div>

      {filteredComments.map((comment, index) => (
        <div key={index} style={styles.row}>
          <div style={styles.rowHeader}>
            <input
              type="checkbox"
              checked={selectedIds.has(comment.id)}
              onChange={() => {
                const next = new Set(selectedIds);
                if (next.has(comment.id)) next.delete(comment.id);
                else next.add(comment.id);
                setSelectedIds(next);
              }}
            />
            <div style={styles.rowMeta}>
              <strong>{comment.author}</strong>
              <span style={styles.date}>{new Date(comment.createdAt).toLocaleDateString()}</span>
              <span style={statusBadge(comment.status)}>{comment.status}</span>
            </div>
          </div>
          <p style={styles.content}>{comment.content}</p>
          <div style={styles.rowFooter}>
            <span style={styles.postRef}>on: {comment.postTitle}</span>
            {/* BUG (a11y): what does a screen reader user hear when tabbing through these? */}
            <div style={styles.actions}>
              {comment.status !== 'approved' && (
                <button style={styles.approveBtn} onClick={() => handleModerate(comment.id, 'approved')}>
                  Approve
                </button>
              )}
              {comment.status !== 'spam' && (
                <button style={styles.rejectBtn} onClick={() => handleModerate(comment.id, 'spam')}>
                  Spam
                </button>
              )}
              {comment.status !== 'pending' && (
                <button style={styles.pendingBtn} onClick={() => handleModerate(comment.id, 'pending')}>
                  Pending
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {filteredComments.length === 0 && (
        <p style={styles.empty}>No comments match this filter.</p>
      )}
    </div>
  );
}

function statusBadge(status: CommentStatus): React.CSSProperties {
  return {
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '0.15rem 0.5rem',
    borderRadius: '9999px',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    backgroundColor: status === 'approved' ? '#dcfce7' : status === 'spam' ? '#fee2e2' : '#fef9c3',
    color: status === 'approved' ? '#16a34a' : status === 'spam' ? '#dc2626' : '#a16207',
  };
}

const styles: Record<string, React.CSSProperties> = {
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  tab: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    cursor: 'pointer',
  },
  activeTab: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: 700,
    backgroundColor: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
  },
  bulkBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
    padding: '0.5rem 0',
  },
  bulkLabel: {
    fontSize: '0.9rem',
    color: '#4b5563',
  },
  row: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '0.75rem',
  },
  rowHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.5rem',
  },
  rowMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    flexWrap: 'wrap' as const,
  },
  date: {
    color: '#6b7280',
    fontSize: '0.85rem',
  },
  content: {
    margin: '0 0 0.5rem',
    fontSize: '0.95rem',
    color: '#1a1a1a',
    lineHeight: 1.5,
  },
  rowFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postRef: {
    fontSize: '0.8rem',
    color: '#6b7280',
    fontStyle: 'italic',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  approveBtn: {
    padding: '0.3rem 0.75rem',
    fontSize: '0.8rem',
    border: '1px solid #16a34a',
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: '#16a34a',
    cursor: 'pointer',
  },
  rejectBtn: {
    padding: '0.3rem 0.75rem',
    fontSize: '0.8rem',
    border: '1px solid #dc2626',
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: '#dc2626',
    cursor: 'pointer',
  },
  pendingBtn: {
    padding: '0.3rem 0.75rem',
    fontSize: '0.8rem',
    border: '1px solid #a16207',
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: '#a16207',
    cursor: 'pointer',
  },
  empty: {
    color: '#6b7280',
    textAlign: 'center',
    padding: '2rem 0',
  },
};
