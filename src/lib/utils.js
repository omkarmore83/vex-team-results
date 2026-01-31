import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getRoundName(round) {
  const rounds = {
    1: 'Practice',
    2: 'Qualification',
    3: 'Quarterfinals',
    4: 'Semifinals',
    5: 'Finals',
    6: 'Round of 16',
  };
  return rounds[round] || `Round ${round}`;
}
