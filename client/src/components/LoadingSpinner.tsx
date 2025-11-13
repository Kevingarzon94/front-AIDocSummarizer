/**
 * LoadingSpinner Component
 * Pure UI component - displays loading animation
 * No business logic
 */

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = 'Processing...' }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-lg text-muted-foreground">{message}</p>
    </div>
  );
};
