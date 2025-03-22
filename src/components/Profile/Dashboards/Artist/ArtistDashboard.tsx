import React from 'react';
import { useArtistProfile } from '../../../../hooks/useArtistProfile';
import TrackUploadForm from './TrackUploadForm';
import ArtistStats from './ArtistStats';
import RecentTracks from './RecentTracks';
import PerformanceMetrics from './PerformanceMetrics';

export default function ArtistDashboard() {
  const { uploadTrack, isUploading } = useArtistProfile();

  const handleUpload = async (formData: any) => {
    try {
      await uploadTrack(
        formData.title,
        formData.price,
        formData.audioFile,
        formData.coverArt
      );
      alert('Track uploaded successfully!');
    } catch (error) {
      alert('Error uploading track. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg p-6 border border-accent/20">
        <h2 className="text-xl font-mono text-primary font-bold mb-4">Upload New Track</h2>
        <TrackUploadForm onSubmit={handleUpload} isUploading={isUploading} />
      </div>

      <ArtistStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTracks />
        <PerformanceMetrics />
      </div>
    </div>
  );
}