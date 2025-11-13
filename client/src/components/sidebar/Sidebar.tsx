/**
 * Sidebar Component
 * Container component for recent documents sidebar
 * Handles collapse/expand state and integrates with useRecentSummaries hook
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DocumentList } from './DocumentList';
import { useRecentSummaries } from '@/hooks/useRecentSummaries';
import { ErrorMessage } from '../ErrorMessage';
import type { DocumentSummary } from '@/types';

interface SidebarProps {
  onDocumentSelect: (document: DocumentSummary) => void;
  selectedDocumentId: string | null;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar = ({
  onDocumentSelect,
  selectedDocumentId,
  isCollapsed,
  onToggleCollapse
}: SidebarProps) => {
  const { summaries, loading, error, refetch } = useRecentSummaries(30000);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (isCollapsed) {
    return (
      <div className="fixed left-0 top-0 h-screen z-40 flex items-center">
        <Button
          onClick={onToggleCollapse}
          size="icon"
          variant="outline"
          className="ml-2 rounded-full shadow-lg bg-background hover:bg-accent"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <aside className="w-[300px] h-screen border-r bg-background flex-shrink-0 flex flex-col">
      <Card className="h-full rounded-none border-0 border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recent Documents
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {summaries.length} {summaries.length === 1 ? 'document' : 'documents'}
            </p>
          </div>
          <div className="flex gap-1">
            <Button
              onClick={handleRefresh}
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              onClick={onToggleCollapse}
              size="icon"
              variant="ghost"
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 flex-shrink-0">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Document List */}
        <div className="flex-1 overflow-hidden">
          <DocumentList
            documents={summaries}
            loading={loading}
            selectedDocumentId={selectedDocumentId}
            onDocumentClick={onDocumentSelect}
          />
        </div>
      </Card>
    </aside>
  );
};
