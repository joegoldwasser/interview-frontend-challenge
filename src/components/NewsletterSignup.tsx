/**
 * Task 3: Improve This Component
 *
 * This newsletter signup form works — you can type an email and click Subscribe.
 * But the code has quality issues. Fix them in order:
 *
 * 3a: The form submits even with an empty or invalid email. Add a check in
 *     handleSubmit to prevent that and show the error message.
 * 3b: Wire up the status state so the user gets feedback when they submit
 */
import { useState } from 'react';
import { submitNewsletter } from '../data/cms-helpers';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const isValid = email.includes('@');

  const handleSubmit = async () => {
    // TODO (3a): Check if the email is valid before submitting.
    //   If invalid, set status to 'error' and return early.

    // TODO (3b): Set the right status at each point in this flow.
    try {
      await submitNewsletter(email);
      // TODO (3b): What status should we set here?
    } catch {
      // TODO (3b): What status should we set here?
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Stay up to date</h3>
      <p style={styles.description}>Get retirement planning tips delivered to your inbox.</p>

      <div style={styles.form}>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          Subscribe
        </button>
      </div>

      {/* Status messages */}
      {status === 'error' && <p style={styles.error}>Please enter a valid email address.</p>}

      {/*
        TODO (3b): Add feedback for the other status states.
        When loading: disable the button, show "Subscribing..."
        When success: show "Thanks for subscribing!"
      */}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.5rem',
    backgroundColor: '#f9fafb',
  },
  heading: {
    margin: '0 0 0.25rem',
    fontSize: '1.1rem',
  },
  description: {
    color: '#6b7280',
    fontSize: '0.9rem',
    margin: '0 0 1rem',
  },
  form: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.65rem 1rem',
    fontSize: '0.95rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
  },
  button: {
    padding: '0.65rem 1.25rem',
    fontSize: '0.95rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  error: {
    color: '#dc2626',
    fontSize: '0.85rem',
    marginTop: '0.5rem',
  },
  success: {
    color: '#16a34a',
    fontSize: '0.95rem',
    fontWeight: 600,
  },
};
