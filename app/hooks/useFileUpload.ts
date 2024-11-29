'use client';

import { useState, useCallback } from 'react';

interface UseFileUploadProps {
  maxSize?: number; // in bytes
  accept?: string[];
}

export function useFileUpload({ maxSize = 500 * 1024 * 1024, accept = ['video/*'] }: UseFileUploadProps = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);

    if (!accept.some(type => file.type.match(type))) {
      setError('Please upload a video file');
      return;
    }

    if (file.size > maxSize) {
      setError('File is too large (max 500MB)');
      return;
    }

    setFile(file);
  }, [maxSize, accept]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, [handleFile]);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  }, [handleFile]);

  return {
    file,
    error,
    setFile,
    setError,
    onDrop,
    onFileSelect
  };
} 