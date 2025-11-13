/**
 * DocumentItem Component
 * Pure UI component - displays a single document in the sidebar
 * Shows fileName, relative time, and word count
 */

import { FileText, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { DocumentSummary } from '@/types';

interface DocumentItemProps {
  document: DocumentSummary;
  isSelected: boolean;
  onClick: () => void;
}

export const DocumentItem = ({ document, isSelected, onClick }: DocumentItemProps) => {
  const relativeTime = formatDistanceToNow(new Date(document.processedAt), { addSuffix: true });

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
        isSelected
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-l-4 border-primary shadow-md'
          : 'hover:bg-accent/50 border-l-4 border-transparent hover:border-accent'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-1 p-2 rounded-md ${
          isSelected
            ? 'bg-gradient-to-br from-blue-500 to-purple-600'
            : 'bg-muted'
        }`}>
          <FileText className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium truncate mb-1 ${
            isSelected ? 'text-foreground' : 'text-foreground/90'
          }`}>
            {document.fileName}
          </h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="truncate">{relativeTime}</span>
            </div>
            <span>{document.wordCount} words</span>
          </div>
        </div>
      </div>
    </button>
  );
};
