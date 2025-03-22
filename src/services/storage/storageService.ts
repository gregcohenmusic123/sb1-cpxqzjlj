import { supabase } from '../../lib/supabase';
import { FileType, StorageFile, UploadOptions, StorageError } from './types';

export class StorageService {
  private static validateFile(file: File, type: FileType): void {
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      throw new Error('File size exceeds 50MB limit');
    }

    const allowedTypes = {
      image: ['image/jpeg', 'image/png', 'image/webp'],
      audio: ['audio/mpeg', 'audio/wav', 'audio/ogg']
    };

    if (!allowedTypes[type].includes(file.type)) {
      throw new Error(`Invalid file type. Allowed types: ${allowedTypes[type].join(', ')}`);
    }
  }

  static async uploadFile(
    file: File,
    type: FileType,
    options: UploadOptions = {}
  ): Promise<StorageFile> {
    try {
      this.validateFile(file, type);

      const bucket = type === 'image' ? 'images' : 'audio';
      const userId = (await supabase.auth.getUser()).data.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const folder = options.folder || userId;
      const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return {
        path: data.path,
        url: publicUrl,
        size: file.size,
        type: file.type
      };
    } catch (error) {
      const storageError: StorageError = new Error(
        error instanceof Error ? error.message : 'Upload failed'
      );
      if (error instanceof Error) {
        storageError.details = error.message;
      }
      throw storageError;
    }
  }

  static async deleteFile(path: string, type: FileType): Promise<void> {
    try {
      const bucket = type === 'image' ? 'images' : 'audio';
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
    } catch (error) {
      const storageError: StorageError = new Error(
        error instanceof Error ? error.message : 'Delete failed'
      );
      if (error instanceof Error) {
        storageError.details = error.message;
      }
      throw storageError;
    }
  }

  static async getFileUrl(path: string, type: FileType): Promise<string> {
    const bucket = type === 'image' ? 'images' : 'audio';
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return publicUrl;
  }
}