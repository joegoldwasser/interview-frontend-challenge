export type CommentStatus = 'pending' | 'approved' | 'spam';

export interface Comment {
  id: string;
  postTitle: string;
  author: string;
  content: string;
  createdAt: string;
  status: CommentStatus;
}

export const MOCK_COMMENTS: Comment[] = [
  { id: 'comment-001', postTitle: 'How to Maximize Your Social Security Benefits', author: 'Margaret Liu', content: 'This was incredibly helpful. I had no idea waiting until 70 could make such a big difference.', createdAt: '2026-01-18', status: 'approved' },
  { id: 'comment-002', postTitle: 'How to Maximize Your Social Security Benefits', author: 'Dave Kowalski', content: 'What about spousal benefits? My wife never worked — does she still qualify?', createdAt: '2026-01-20', status: 'approved' },
  { id: 'comment-003', postTitle: 'How to Build a Retirement Budget That Actually Works', author: 'spambot_9000', content: 'AMAZING DEAL! Click here for FREE money!!! 💰💰💰 www.totally-legit.biz', createdAt: '2026-02-05', status: 'spam' },
  { id: 'comment-004', postTitle: 'How to Build a Retirement Budget That Actually Works', author: 'Rachel Simmons', content: 'The three phases breakdown really resonated with me. We spent way more in our first few years of retirement than expected.', createdAt: '2026-02-07', status: 'approved' },
  { id: 'comment-005', postTitle: 'Roth Conversions: The Complete Guide for 2026', author: 'Tom Nakamura', content: 'I converted $50k last year and wish I had done more. Great explanation of the tax brackets.', createdAt: '2026-02-22', status: 'approved' },
  { id: 'comment-006', postTitle: 'Roth Conversions: The Complete Guide for 2026', author: 'Linda Park', content: 'Can you do a Roth conversion if you are already taking RMDs?', createdAt: '2026-02-25', status: 'pending' },
  { id: 'comment-007', postTitle: 'Spousal Social Security Benefits Explained', author: 'James Harding', content: "My wife and I are trying to figure out the best claiming strategy. This helped a lot but I still have questions about the GPO.", createdAt: '2026-03-02', status: 'pending' },
  { id: 'comment-008', postTitle: 'Will You Pay Taxes on Social Security?', author: 'Sandra Mitchell', content: "I had no idea up to 85% of Social Security could be taxed. That's outrageous.", createdAt: '2026-03-05', status: 'approved' },
  { id: 'comment-009', postTitle: 'Will You Pay Taxes on Social Security?', author: 'crypto_guru_42', content: 'Forget Social Security, invest in crypto and retire in 2 years! DM me for my course.', createdAt: '2026-03-06', status: 'spam' },
  { id: 'comment-010', postTitle: 'Should You Take Social Security at 62?', author: 'Frank Delgado', content: 'I claimed at 62 because of health issues. Not everyone has the luxury of waiting. Good that the article mentions that.', createdAt: '2026-03-10', status: 'approved' },
  { id: 'comment-011', postTitle: 'Tax-Loss Harvesting: A Beginner\'s Guide', author: 'Priya Sharma', content: 'How does the wash sale rule work with ETFs that track the same index? Can I sell VTI and buy ITOT?', createdAt: '2026-03-12', status: 'pending' },
  { id: 'comment-012', postTitle: 'Beyond the 4% Rule: Smarter Retirement Spending', author: 'Robert Chen', content: 'The guardrails approach seems much more practical than a fixed percentage. Has anyone actually used this strategy long-term?', createdAt: '2026-03-14', status: 'pending' },
  { id: 'comment-013', postTitle: 'Beyond the 4% Rule: Smarter Retirement Spending', author: 'sell_now_bot', content: 'I made $10,000 in one week using this ONE TRICK! Click my profile for details!!!', createdAt: '2026-03-15', status: 'spam' },
  { id: 'comment-014', postTitle: 'Estate Planning 101: What Every Retiree Needs', author: 'Karen Okonkwo', content: 'We just updated our trust after reading this. The beneficiary designation section was eye-opening.', createdAt: '2026-03-18', status: 'approved' },
  { id: 'comment-015', postTitle: 'Estate Planning 101: What Every Retiree Needs', author: 'Michael Torres', content: "Does a living trust really avoid probate in all states? Our attorney in Texas said it depends.", createdAt: '2026-03-20', status: 'pending' },
  { id: 'comment-016', postTitle: 'Social Security Survivor Benefits: What Your Spouse Needs to Know', author: 'Ann Bergstrom', content: 'I lost my husband last year and had no idea I could switch to his benefit. Thank you for this article.', createdAt: '2026-03-22', status: 'pending' },
];

/**
 * Simulates a moderation API call.
 * Comments "comment-003" and "comment-011" always fail to simulate server errors.
 * All others succeed after a short delay.
 */
export function moderateComment(
  commentId: string,
  newStatus: CommentStatus
): Promise<{ success: boolean }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (commentId === 'comment-003' || commentId === 'comment-011') {
        reject(new Error('Server error: moderation service unavailable'));
      } else {
        resolve({ success: true });
      }
    }, 600 + Math.random() * 400);
  });
}
