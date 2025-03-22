import React, { useState } from 'react';
import { Upload, Music, Info } from 'lucide-react';
import { useArtistProfile } from '../../hooks/useArtistProfile';

interface UploadFormData {
  title: string;
  price: number;
  audioFile: File | null;
  coverArt: File | null;
}

export default function ArtistDashboard() {
  const { uploadTrack, isUploading } = useArtistProfile();
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    price: 0,
    audioFile: null,
    coverArt: null
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.audioFile || !formData.coverArt) {
      alert('Please select both audio file and cover art');
      return;
    }

    try {
      await uploadTrack(
        formData.title,
        formData.price,
        formData.audioFile,
        formData.coverArt
      );
      
      // Reset form after successful upload
      setFormData({
        title: '',
        price: 0,
        audioFile: null,
        coverArt: null
      });
      
      alert('Track uploaded successfully!');
    } catch (error) {
      alert('Error uploading track. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm text-black">
        <h2 className="text-xl font-semibold mb-4 text-black">Upload New Track</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Track Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Price (BTC)
            </label>
            <input
              type="number"
              step="0.001"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Audio File
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                <Music className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-black">
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
            <label className="block text-sm font-medium text-black mb-1">
              Cover Art
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-black">
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
            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload Track'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm text-black">
        <h2 className="text-xl font-semibold mb-4 text-black">Track Analytics</h2>
        <p className="text-black">Analytics dashboard coming soon!</p>
      </div>
    </div>
  );
}