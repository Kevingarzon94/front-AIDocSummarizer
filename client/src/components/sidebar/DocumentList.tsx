/**
 * DocumentList Component
 * Pure UI component - displays a scrollable list of documents
 * Handles loading and empty states
 */

import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { DocumentItem } from './DocumentItem';
import type { DocumentSummary } from '@/types';

interface DocumentListProps {
  documents: DocumentSummary[];
  loading: boolean;
  selectedDocumentId: string | null;
  onDocumentClick: (document: DocumentSummary) => void;
}

const LoadingSkeleton = () => (
  <div className="space-y-3 p-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-start gap-3">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
    <div className="p-4 rounded-full bg-muted mb-4">
      <svg
        className="h-8 w-8 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <p className="text-sm font-medium text-muted-foreground mb-1">No documents yet</p>
    <p className="text-xs text-muted-foreground">Upload a document to get started</p>
  </div>
);

export const DocumentList = ({
  documents,
  loading,
  selectedDocumentId,
  onDocumentClick
}: DocumentListProps) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (documents.length === 0) {
    return <EmptyState />;
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 p-4">
        {documents.map((doc) => (
          <DocumentItem
            key={doc.id}
            document={doc}
            isSelected={doc.id === selectedDocumentId}
            onClick={() => onDocumentClick(doc)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
