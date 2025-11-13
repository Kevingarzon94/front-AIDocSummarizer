/**
 * Summary API Service
 * Handles all API calls related to document summaries
 * Single Responsibility: API communication
 */

import type { RecentSummariesResponse } from '@/types';

const API_URL = typeof window !== 'undefined'
    ? ''
    : 'http://production-env.eba-zpdimf2m.us-east-1.elasticbeanstalk.com';

/**
 * Fetches recently processed document summaries
 * @returns Promise with recent summaries data
 * @throws Error if the API request fails
 */
export const fetchRecentSummaries = async (): Promise<RecentSummariesResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/summarizer/recent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch recent summaries');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? err.message
        : 'An unexpected error occurred while fetching recent summaries'
    );
  }
};
