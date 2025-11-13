/**
 * FileUploadZone Component
 * Pure UI component - displays file upload interface
 * All logic is handled by parent via props
 */

import { Upload, FileText } from 'lucide-react';
import { Card } from './ui/card';
import { DragEvent, ChangeEvent, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FileUploadZoneProps {
  isDragging: boolean;
  selectedFile: File | null;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: DragEvent<HTMLDivElement>) => void;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const FileUploadZone = ({
  isDragging,
  selectedFile,
  onDrop,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onFileSelect,
  disabled = false,
}: FileUploadZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <Card
      className={cn(
        "transition-all duration-200 cursor-pointer border-2 border-dashed",
        isDragging && "border-primary bg-primary/5 scale-105",
        !isDragging && "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={handleClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt"
        onChange={onFileSelect}
        className="hidden"
        disabled={disabled}
      />

      <div className="flex flex-col items-center gap-4 p-12">
        {selectedFile ? (
          <>
            <FileText className="h-16 w-16 text-primary" />
            <div className="text-center">
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </>
        ) : (
          <>
            <Upload className="h-16 w-16 text-muted-foreground" />
            <div className="text-center">
              <p className="text-lg font-medium text-foreground mb-1">
                {isDragging ? 'Drop your file here' : 'Drop your file here or click to browse'}
              </p>
              <p className="text-sm text-muted-foreground">
                Supports PDF and TXT files (max 10MB)
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
