

const questions = [
  // Emotional Exhaustion
  { id: 1, category: "Emotional Exhaustion", value: "EE1", question: "I feel emotionally drained from my work" },
  { id: 2, category: "Emotional Exhaustion", value: "EE2", question: "I need extra time to relax after work" },
  { id: 3, category: "Emotional Exhaustion", value: "EE3", question: "I feel tired in the morning and dread going to work" },
  { id: 4, category: "Emotional Exhaustion", value: "EE4", question: "My job makes me feel physically exhausted" },
  { id: 5, category: "Emotional Exhaustion", value: "EE5", question: "I often feel emotionally stressed at work" },
  { id: 6, category: "Emotional Exhaustion", value: "EE6", question: "Working all day is really a stress for me" },
  { id: 7, category: "Emotional Exhaustion", value: "EE7", question: "I don't have enough energy for my personal life after work" },

  // Disengagement
  { id: 8, category: "Disengagement", value: "DE1", question: "I feel disconnected from my work" },
  { id: 9, category: "Disengagement", value: "DE2", question: "I talk about my work negatively" },
  { id: 10, category: "Disengagement", value: "DE3", question: "I've become more doubtful about my work's value" },
  { id: 11, category: "Disengagement", value: "DE4", question: "I've lost interest in my work since starting this job" },
  { id: 12, category: "Disengagement", value: "DE5", question: "Sometimes my work tasks make me feel upset" },
  { id: 13, category: "Disengagement", value: "DE6", question: "I doubt the significance of my work" },

  // Professional Efficacy
  { id: 14, category: "Professional Efficacy", value: "PE1", question: "I feel confident in solving problems at work" },
  { id: 15, category: "Professional Efficacy", value: "PE2", question: "I am making a meaningful contribution to my organization" },
  { id: 16, category: "Professional Efficacy", value: "PE3", question: "I feel excited when I accomplish something at work" },
  { id: 17, category: "Professional Efficacy", value: "PE4", question: "I see my work as a positive challenge" },
  { id: 18, category: "Professional Efficacy", value: "PE5", question: "I feel I am good at what I do" },
];

// Demographic Options
export const ageRanges = [
  { value: '18-24', label: '18-24', icon: '🎓' },
  { value: '25-34', label: '25-34', icon: '🚀' },
  { value: '35-44', label: '35-44', icon: '💼' },
  { value: '45-54', label: '45-54', icon: '👔' },
  { value: '55-64', label: '55-64', icon: '🎯' },
  { value: '65+', label: '65+', icon: '🌟' }
];

export const genderOptions = [
  { value: 'female', label: 'Female', icon: '👩' },
  { value: 'male', label: 'Male', icon: '👨' }
];

export const jobRoles = [
  { value: 'healthcare', label: 'Healthcare & Medical', icon: '🏥' },
  { value: 'education', label: 'Education & Training', icon: '📚' },
  { value: 'technology', label: 'Technology & IT', icon: '💻' },
  { value: 'finance', label: 'Finance & Banking', icon: '💰' },
  { value: 'management', label: 'Management & Leadership', icon: '👔' },
  { value: 'sales-marketing', label: 'Sales & Marketing', icon: '📈' },
  { value: 'customer-service', label: 'Customer Service', icon: '🎧' },
  { value: 'human-resources', label: 'Human Resources', icon: '👥' },
  { value: 'legal', label: 'Legal Services', icon: '⚖️' },
  { value: 'consulting', label: 'Consulting', icon: '🎯' },
  { value: 'retail', label: 'Retail & Commerce', icon: '🛍️' },
  { value: 'manufacturing', label: 'Manufacturing', icon: '🏭' },
  { value: 'construction', label: 'Construction & Engineering', icon: '🔧' },
  { value: 'government', label: 'Government & Public Service', icon: '🏛️' },
  { value: 'non-profit', label: 'Non-profit & Social Services', icon: '❤️' },
  { value: 'media', label: 'Media & Communications', icon: '📺' },
  { value: 'hospitality', label: 'Hospitality & Tourism', icon: '🏨' },
  { value: 'research', label: 'Research & Development', icon: '🔬' },
  { value: 'other', label: 'Other', icon: '💼' }
];

export const yearsExperienceOptions = [
  { value: 'less-than-1', label: '<1 year', icon: '🌱' },
  { value: '1-2', label: '1-2 years', icon: '🌿' },
  { value: '3-5', label: '3-5 years', icon: '🌳' },
  { value: '6-10', label: '6-10 years', icon: '🌲' },
  { value: '11-15', label: '11-15 years', icon: '🏆' },
  { value: '16-20', label: '16-20 years', icon: '🎖️' },
  { value: 'more-than-20', label: '20+ years', icon: '👑' }
];

export const workHoursOptions = [
  { value: 'part-time', label: '<30 hrs', icon: '⏰' },
  { value: '30-40', label: '30-40 hrs', icon: '🕘' },
  { value: '41-50', label: '41-50 hrs', icon: '🕙' },
  { value: '51-60', label: '51-60 hrs', icon: '🕚' },
  { value: '61-70', label: '61-70 hrs', icon: '🕛' },
  { value: 'more-than-70', label: '70+ hrs', icon: '🔥' }
];

export const familyStatusOptions = [
  { value: 'single', label: 'Single', icon: '🧍' },
  { value: 'married-no-children', label: 'Married - No kids', icon: '👫' },
  { value: 'married-with-children', label: 'Married - With kids', icon: '👨‍👩‍👧‍👦' },
  { value: 'single-parent', label: 'Single parent', icon: '👨‍👧‍👦' },
  { value: 'other', label: 'Other', icon: '👥' }
];

export default questions;
