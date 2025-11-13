/**
 * DocumentDetail Component
 * Pure UI component - displays full details of a selected document
 * Shows fileName, processedAt, processingTime, wordCount, and summary bullets
 */

import { FileText, CheckCircle2, Clock, BarChart3, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import type { DocumentSummary } from '@/types';

interface DocumentDetailProps {
  document: DocumentSummary;
  onBack: () => void;
}

export const DocumentDetail = ({ document, onBack }: DocumentDetailProps) => {
  const formattedDate = format(new Date(document.processedAt), 'PPpp');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button onClick={onBack} variant="ghost" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to upload
      </Button>

      {/* Header Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{document.fileName}</CardTitle>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BarChart3 className="h-4 w-4" />
                  <span>{document.wordCount} words</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Processed in {(document.processingTime / 1000).toFixed(2)}s</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Points */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Summary ({document.summary.length} key points)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {document.summary.map((point, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-foreground leading-relaxed flex-1">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
