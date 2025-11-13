/**
 * useDocumentSummarizer Hook
 * Single Responsibility: API calls, loading states, and error handling
 */

import { useState, useCallback } from 'react';
import type { SummaryResponse } from '@/types';

const API_URL = typeof window !== 'undefined'
    ? ''
    : 'http://production-env.eba-zpdimf2m.us-east-1.elasticbeanstalk.com';

interface UseDocumentSummarizerReturn {
  summary: SummaryResponse | null;
  isLoading: boolean;
  error: string | null;
  summarize: (file: File) => Promise<void>;
  reset: () => void;
}

export const useDocumentSummarizer = (): UseDocumentSummarizerReturn => {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summarize = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setSummary(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_URL}/api/summarizer/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to summarize document');
      }

      const data = await response.json();
      setSummary(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while summarizing the document'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setSummary(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    summary,
    isLoading,
    error,
    summarize,
    reset,
  };
};
