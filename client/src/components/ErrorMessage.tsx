/**
 * ErrorMessage Component
 * Pure UI component - displays error messages
 * No business logic
 */

import { AlertCircle, X } from 'lucide-react';
import { Card } from './ui/card';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage = ({ message, onDismiss }: ErrorMessageProps) => {
  return (
    <Card className="border-destructive/50 bg-destructive/10 animate-slide-up">
      <div className="flex items-start gap-3 p-4">
        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <p className="text-sm text-destructive flex-1">{message}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-destructive hover:text-destructive/80 transition-colors"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </Card>
  );
};
