// Simple completion counter utility for localStorage
const COMPLETION_COUNT_KEY = 'pbi_completion_count';

export const getCompletionCount = () => {
  try {
    const count = localStorage.getItem(COMPLETION_COUNT_KEY);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    return 0;
  }
};

export const incrementCompletionCount = () => {
  try {
    const currentCount = getCompletionCount();
    const newCount = currentCount + 1;
    localStorage.setItem(COMPLETION_COUNT_KEY, newCount.toString());
    return newCount;
  } catch (error) {
    return getCompletionCount();
  }
};