/**
 * useRecentSummaries Hook
 * Single Responsibility: Fetch and manage recent summaries state
 * Includes auto-refresh functionality
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchRecentSummaries } from '@/services/summaryService';
import type { DocumentSummary } from '@/types';

interface UseRecentSummariesReturn {
  summaries: DocumentSummary[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRecentSummaries = (autoRefreshInterval = 30000): UseRecentSummariesReturn => {
  const [summaries, setSummaries] = useState<DocumentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchRecentSummaries();
      setSummaries(data.summaries);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load recent summaries'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh
  useEffect(() => {
    if (autoRefreshInterval > 0) {
      const interval = setInterval(() => {
        fetchData();
      }, autoRefreshInterval);

      return () => clearInterval(interval);
    }
  }, [autoRefreshInterval, fetchData]);

  const refetch = useCallback(async () => {
    setLoading(true);
    await fetchData();
  }, [fetchData]);

  return {
    summaries,
    loading,
    error,
    refetch,
  };
};
