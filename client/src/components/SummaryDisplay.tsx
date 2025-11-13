/**
 * SummaryDisplay Component
 * Pure UI component - displays document summary
 * All logic is handled by parent via props
 */

import { FileText, CheckCircle2, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface SummaryDisplayProps {
  summary: string[];
  fileName: string;
  onReset: () => void;
}

export const SummaryDisplay = ({ summary, fileName, onReset }: SummaryDisplayProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-1">Document Summary</CardTitle>
              <p className="text-muted-foreground">{fileName}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Points */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Key Points ({summary.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summary.map((point, index) => (
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

      {/* Actions */}
      <div className="flex justify-center">
        <Button onClick={onReset} size="lg" className="gap-2">
          <RotateCcw className="h-5 w-5" />
          Upload New Document
        </Button>
      </div>
    </div>
  );
};
