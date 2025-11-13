/**
 * useFileValidation Hook
 * Single Responsibility: File validation logic only
 */

import { useCallback } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, type ValidationResult, type AllowedFileType } from '@/types';

export const useFileValidation = () => {
  const validate = useCallback((file: File | null): ValidationResult => {
    if (!file) {
      return {
        isValid: false,
        error: 'No file selected',
      };
    }

    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type as AllowedFileType)) {
      return {
        isValid: false,
        error: 'Invalid file type. Only PDF and TXT files are allowed.',
      };
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      const maxSizeMB = MAX_FILE_SIZE / (1024 * 1024);
      return {
        isValid: false,
        error: `File size exceeds ${maxSizeMB}MB limit.`,
      };
    }

    return { isValid: true };
  }, []);

  return { validate };
};
