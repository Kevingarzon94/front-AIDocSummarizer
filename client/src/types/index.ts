/**
 * TypeScript type definitions for the Document Summarizer
 */

export interface SummaryResponse {
  success: boolean;
  summary: string[];
  fileName: string;
}

export interface DocumentSummary {
  id: string;
  fileName: string;
  summary: string[];
  processingTime: number;
  processedAt: string;
  wordCount: number;
}

export interface RecentSummariesResponse {
  summaries: DocumentSummary[];
  total: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export type AllowedFileType = 'application/pdf' | 'text/plain';

export const ALLOWED_FILE_TYPES: AllowedFileType[] = [
  'application/pdf',
  'text/plain',
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
