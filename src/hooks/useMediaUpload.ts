import { useState } from 'react';
import { MediaService } from '../services/media/mediaService';
import { MediaAsset } from '../types/media';

export function useMediaUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadMedia = async (
    file: File,
    type: 'image' | 'audio',
    folder: string
  ): Promise<MediaAsset | null> => {
    try {
      setUploading(true);
      setError(null);
      setProgress(0);

      const asset = await MediaService.uploadFile(file, type, folder);
      setProgress(100);
      return asset;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (path: string, type: 'image' | 'audio'): Promise<void> => {
    try {
      await MediaService.deleteFile(path, type);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return {
    uploadMedia,
    deleteMedia,
    uploading,
    progress,
    error
  };
}