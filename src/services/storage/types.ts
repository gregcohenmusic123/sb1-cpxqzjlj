export interface UploadOptions {
  folder?: string;
  onProgress?: (progress: number) => void;
}

export interface StorageFile {
  path: string;
  url: string;
  size: number;
  type: string;
}

export type FileType = 'image' | 'audio';

export interface StorageError extends Error {
  statusCode?: number;
  details?: string;
}