# Frontend Engineer — Interview Challenge

## How This Works

The page has five tasks, each with a React component that needs work. **You only need to edit files in `src/components/`** — everything else is already wired up. Use the Previous/Next buttons to navigate between tasks.

Each component file has a comment at the top explaining what to do, and TODO comments at the specific spots where code needs to change.

## Key Files

| File | What it does |
|---|---|
| `src/components/PostCard.tsx` | Task 1 — blog post card with bugs to fix |
| `src/components/PostList.tsx` | Task 2 — post list with tabs to wire up |
| `src/components/NewsletterSignup.tsx` | Task 3 — working form with quality issues to improve |
| `src/components/RelatedPosts.tsx` | Task 4 — empty component to build (stretch) |
| `src/components/CommentModeration.tsx` | Task 5 — working component with issues to identify and fix |
| `src/data/cms-helpers.ts` | Data helpers and types (read-only reference) |

---

## Task 1: Fix the Bugs (~5 min)

**File:** `src/components/PostCard.tsx`

This card component has 3 visible bugs. Look at the cards on the page, then find and fix each bug in the code.

- **1a:** The title link points to the wrong URL
- **1b:** Two of the fields are displaying each other's data
- **1c:** The "NEW" badge shows on every card, even when it shouldn't

## Task 2: Extend This Component (~10 min)

**File:** `src/components/PostList.tsx`

The tabs and cards render, but nothing is wired together. Connect them:

- **2a:** Make the category tabs filter posts when clicked
- **2b:** Wire up the search input to filter by title and excerpt
- **2c:** Show "No posts found" when nothing matches

## Task 3: Improve This Component (~10 min)

**File:** `src/components/NewsletterSignup.tsx`

This form works but has quality issues. Fix them in order:

- **3a:** The form submits even with invalid emails — add a validation check and show the error
- **3b:** Wire up the status state so the user gets feedback when they submit

## Task 4: Build from Scratch (~5 min, stretch)

**File:** `src/components/RelatedPosts.tsx`

Build a related posts widget. The props and types are defined — implement the logic:

- **4a:** Show up to 3 posts in the same category, excluding the current post
- **4b:** Handle the case where there are no related posts

## Task 5: Review & Improve This Component (~20 min, Principal-level)

**File:** `src/components/CommentModeration.tsx`

This comment moderation panel works in the happy path, but has issues across three categories: **performance**, **accessibility**, and **error handling**.

Review the code, identify problems, and fix as many as you can. There are no TODO comments — finding the issues is part of the task.

---

## Browser Note

**Please use Chrome.** StackBlitz has known issues with Firefox that may cause the editor or preview to not work correctly.

If the page gets stuck loading, try a hard refresh (Cmd+Shift+R).

## Local Setup (if not using StackBlitz)

```bash
git clone https://github.com/joegoldwasser/interview-frontend-challenge.git
cd interview-frontend-challenge
npm install
npm run dev
```
