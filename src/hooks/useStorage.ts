import { useState } from 'react';
import { StorageService } from '../services/storage/storageService';
import { FileType, StorageFile, UploadOptions } from '../services/storage/types';

export function useStorage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadFile = async (
    file: File,
    type: FileType,
    options?: UploadOptions
  ): Promise<StorageFile | null> => {
    try {
      setUploading(true);
      setError(null);
      return await StorageService.uploadFile(file, type, options);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Upload failed');
      setError(error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (path: string, type: FileType): Promise<void> => {
    try {
      setError(null);
      await StorageService.deleteFile(path, type);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Delete failed');
      setError(error);
    }
  };

  return {
    uploadFile,
    deleteFile,
    uploading,
    error
  };
}