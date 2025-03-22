export interface MediaAsset {
  id: string;
  url: string;
  type: 'image' | 'audio';
  mimeType: string;
  size: number;
  duration?: number; // For audio files
  createdAt: string;
}

export interface UploadResponse {
  asset: MediaAsset;
  error?: string;
}