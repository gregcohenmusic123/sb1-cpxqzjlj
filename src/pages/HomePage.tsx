import React, { useCallback, useRef } from "react";
import { Track } from "../types";
import { tracks } from "../data/tracks";
import TrackCard from "../components/TrackCard";
import TrendingSection from "../components/TrendingTracks/TrendingSection";
import { usePlayer } from "../contexts/PlayerContext";
import { motion } from "framer-motion";
import { useNewTracks } from "../hooks/useNewTracks";

export default function HomePage() {
  const { currentTrack, isPlaying } = usePlayer();
  const { newTracks, loading } = useNewTracks();
  const tracksContainerRef = useRef<HTMLDivElement>(null);

  // Prioritize CHUCKIE tracks in latest releases (featured grid)
  const sortedTracks = [...tracks].sort((a, b) => {
    // Put CHUCKIE tracks first
    if (a.artist === "CHUCKIE" && b.artist !== "CHUCKIE") return -1;
    if (a.artist !== "CHUCKIE" && b.artist === "CHUCKIE") return 1;
    // Then sort by ID for remaining tracks
    return Number(b.id) - Number(a.id);
  });

  const handlePurchase = (track: Track) => {
    alert(`Initiating purchase of "${track.title}" for ${track.price} BTC`);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Featured Tracks Section (3x3 grid) */}
      <section>
        <h2 className="text-3xl text-primary font-bold">Featured Releases</h2>
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {sortedTracks.map((track) => (
              <TrackCard
                key={`featured-${track.id}`}
                track={track}
                onPurchase={() => handlePurchase(track)}
                showArtist={true}
                showMobileComments={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Tracks Section (Dynamic) */}
      <section>
        <h2 className="text-3xl text-primary font-bold">New Uploads</h2>
        <div className="mt-6" ref={tracksContainerRef}>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-accent/20 h-10 w-10"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-accent/20 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-accent/20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {newTracks.map((track, index) => (
                <TrackCard
                  key={`new-${track.id}-${index}`}
                  track={track}
                  onPurchase={() => handlePurchase(track)}
                  showArtist={true}
                  showMobileComments={false}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <TrendingSection tracks={tracks} />
    </motion.div>
  );
}
