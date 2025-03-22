import { supabase } from '../../lib/supabase';
import { MediaAsset } from '../../types/media';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export class MediaService {
  static async uploadFile(
    file: File,
    type: 'image' | 'audio',
    folder: string
  ): Promise<MediaAsset> {
    // Validate file
    if (!this.validateFile(file, type)) {
      throw new Error('Invalid file type or size');
    }

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const filePath = `${folder}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(type === 'image' ? 'images' : 'audio')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(type === 'image' ? 'images' : 'audio')
      .getPublicUrl(filePath);

    return {
      id: data.path,
      url: publicUrl,
      type,
      mimeType: file.type,
      size: file.size,
      createdAt: new Date().toISOString()
    };
  }

  static async deleteFile(path: string, type: 'image' | 'audio'): Promise<void> {
    const { error } = await supabase.storage
      .from(type === 'image' ? 'images' : 'audio')
      .remove([path]);

    if (error) throw error;
  }

  private static validateFile(file: File, type: 'image' | 'audio'): boolean {
    if (file.size > MAX_FILE_SIZE) return false;

    const allowedTypes = type === 'image' ? ALLOWED_IMAGE_TYPES : ALLOWED_AUDIO_TYPES;
    return allowedTypes.includes(file.type);
  }
}