import React, { useState } from 'react';
import { Music, Upload } from 'lucide-react';
import { useStorage } from '../../../../hooks/useStorage';

interface UploadFormData {
  title: string;
  price: number;
  audioFile: File | null;
  coverArt: File | null;
}

interface TrackUploadFormProps {
  onSubmit: (data: UploadFormData) => Promise<void>;
  isUploading: boolean;
}

export default function TrackUploadForm({ onSubmit, isUploading }: TrackUploadFormProps) {
  const { uploadFile, error: uploadError } = useStorage();
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    price: 0,
    audioFile: null,
    coverArt: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { audioFile, coverArt } = formData;
    
    if (!audioFile || !coverArt) {
      alert('Please select both audio file and cover art');
      return;
    }
    
    try {
      // Upload audio file
      const audioResult = await uploadFile(audioFile, 'audio', {
        folder: 'tracks'
      });
      
      // Upload cover art
      const coverResult = await uploadFile(coverArt, 'image', {
        folder: 'covers'
      });
      
      if (!audioResult || !coverResult) {
        throw new Error('Failed to upload files');
      }
      // Submit with file URLs
      await onSubmit({
        ...formData,
        audioFile: audioResult,
        coverArt: coverResult
      });

      // Reset form
      setFormData({
        title: '',
        price: 0,
        audioFile: null,
        coverArt: null
      });
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload files. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-primary font-bold mb-1">Track Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-primary font-bold mb-1">Price (BTC)</label>
        <input
          type="number"
          step="0.001"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          className="w-full px-3 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-primary font-bold mb-1">Audio File</label>
        <div className="flex items-center justify-center w-full">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-surface rounded-lg border-2 border-accent/20 border-dashed cursor-pointer hover:border-accent/40">
            <Music className="w-8 h-8 text-primary" />
            <span className="mt-2 text-sm text-primary">
              {formData.audioFile ? formData.audioFile.name : 'Select audio file'}
            </span>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => setFormData({ ...formData, audioFile: e.target.files?.[0] || null })}
            />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm text-primary font-bold mb-1">Cover Art</label>
        <div className="flex items-center justify-center w-full">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-surface rounded-lg border-2 border-accent/20 border-dashed cursor-pointer hover:border-accent/40">
            <Upload className="w-8 h-8 text-primary" />
            <span className="mt-2 text-sm text-primary">
              {formData.coverArt ? formData.coverArt.name : 'Select cover art'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFormData({ ...formData, coverArt: e.target.files?.[0] || null })}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className="w-full px-4 py-2 bg-surface border border-accent/20 text-primary hover:text-accent rounded-lg transition-colors disabled:opacity-50 text-sm font-bold"
      >
        {isUploading ? 'Uploading...' : 'Upload Track'}
      </button>
    </form>
  );
}