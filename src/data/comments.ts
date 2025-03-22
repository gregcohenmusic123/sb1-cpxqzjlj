import { Comment } from '../types';

export const comments: Comment[] = [
  // CHUCKIE - Kaws (track_id: 3)
  {
    id: 'kaws-1',
    trackId: '3',
    author: 'BeatMaster',
    content: 'The way CHUCKIE flips these samples is absolutely insane! 🔥',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
    likes: 45
  },
  {
    id: 'kaws-2',
    trackId: '3',
    author: 'CryptoCollector',
    content: 'This track is going to be legendary in the Ordinals space! 🚀',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    likes: 38
  },
  {
    id: 'kaws-3',
    trackId: '3',
    author: 'Web3Producer',
    content: 'That bass drop at 1:45 is pure fire! Been waiting for this one 🎵',
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    likes: 29
  },

  // CHUCKIE - Bandana (track_id: 6)
  {
    id: 'bandana-1',
    trackId: '6',
    author: 'RhythmRider',
    content: 'CHUCKIE never misses! This track is going straight into my collection 💎',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3,
    likes: 52
  },
  {
    id: 'bandana-2',
    trackId: '6',
    author: 'BTCBeats',
    content: 'The production quality is next level. Those synths are incredible! 🎹',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
    likes: 41
  },
  {
    id: 'bandana-3',
    trackId: '6',
    author: 'OrdinalsFan',
    content: 'This is what the future of music ownership sounds like 🌟',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    likes: 33
  },

  // CHUCKIE - 8BIT (track_id: 9)
  {
    id: '8bit-1',
    trackId: '9',
    author: 'PixelPioneer',
    content: 'Love how CHUCKIE blends retro gaming vibes with modern production! 🎮',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 4,
    likes: 48
  },
  {
    id: '8bit-2',
    trackId: '9',
    author: 'SoundExplorer',
    content: 'The 8-bit sounds mixed with that heavy bass is genius 🕹️',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
    likes: 39
  },
  {
    id: '8bit-3',
    trackId: '9',
    author: 'RetroRaver',
    content: 'This track brings back memories while feeling completely fresh! 🌟',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    likes: 31
  },
  {
    id: '1',
    trackId: '1',
    author: 'CryptoBeats',
    content: 'This track is absolutely incredible! The sound design is next level.',
    timestamp: 1709654400000,
    likes: 12
  },
  {
    id: '2',
    trackId: '1',
    author: 'BTCMusicLover',
    content: 'Love how the bass hits in the breakdown. Pure fire! 🔥',
    timestamp: 1709740800000,
    likes: 8
  },
  {
    id: '3',
    trackId: '2',
    author: 'Web3Artist',
    content: 'This is what the future of music sounds like. DJ Cassidy never disappoints! 🚀',
    timestamp: 1709827200000,
    likes: 15
  },
  {
    id: '15',
    content: 'Been following CHUCKIE since day one, and this might be his best work yet! 🏆',
    author: 'MetaCollector',
    timestamp: 1709913600000,
    likes: 28
  },
  // DJ Cassidy - Could It Be (track_id: 2)
  {
    id: '16',
    trackId: '2',
    author: 'VinylVirtuoso',
    content: 'The way DJ Cassidy blends classic disco with modern production is pure genius! 🕺',
    timestamp: 1709913600000,
    likes: 42
  },
  {
    id: '17',
    trackId: '2',
    author: 'GrooveExplorer',
    content: 'That bassline at 2:30 is absolutely infectious. Can\'t stop dancing! 🎵',
    timestamp: 1709827200000,
    likes: 35
  },
  // DJ Cassidy - You Ain't Seen Nothing Yet (track_id: 5)
  {
    id: '18',
    trackId: '5',
    author: 'DiscoKing',
    content: 'DJ Cassidy keeps pushing boundaries! This track is a perfect blend of past and future 🚀',
    timestamp: 1709740800000,
    likes: 38
  },
  {
    id: '19',
    trackId: '5',
    author: 'BeatMaster',
    content: 'The production quality is insane. Every element sits perfectly in the mix! 🎧',
    timestamp: 1709654400000,
    likes: 31
  },
  // DJ Cassidy - Paradise (track_id: 8)
  {
    id: '20',
    trackId: '8',
    author: 'SoulfulVibes',
    content: 'This is what modern disco should sound like. DJ Cassidy never disappoints! ✨',
    timestamp: 1709568000000,
    likes: 45
  },
  {
    id: '21',
    trackId: '8',
    author: 'RhythmRider',
    content: 'The horn arrangements in this are absolutely beautiful. Pure class! 🎻',
    timestamp: 1709481600000,
    likes: 39
  },

  // Daytona Starsky - Gasoline (track_id: 1)
  {
    id: '22',
    trackId: '1',
    author: 'SynthWave',
    content: 'The production on this track is absolutely insane! That synth work is next level 🚀',
    timestamp: 1709913600000,
    likes: 47
  },
  {
    id: '23',
    trackId: '1',
    author: 'FutureBeats',
    content: 'Been waiting for this drop! Daytona never disappoints with these genre-bending vibes 🔥',
    timestamp: 1709827200000,
    likes: 38
  },
  {
    id: '24',
    trackId: '1',
    author: 'WaveRider',
    content: 'That bassline at 2:15 is absolutely hypnotic! On repeat all day 🎵',
    timestamp: 1709740800000,
    likes: 31
  },

  // Daytona Starsky - Better Views, Views Better (track_id: 4)
  {
    id: '25',
    trackId: '4',
    author: 'BassHead',
    content: 'The way this track builds up is pure genius. Those layered vocals are everything! 🎤',
    timestamp: 1709913600000,
    likes: 42
  },
  {
    id: '26',
    trackId: '4',
    author: 'MelodyMaster',
    content: 'This is what modern electronic music should sound like. Pushing boundaries! 🌟',
    timestamp: 1709827200000,
    likes: 35
  },
  {
    id: '27',
    trackId: '4',
    author: 'GrooveExplorer',
    content: 'The sound design here is incredible. Each element sits perfectly in the mix 🎧',
    timestamp: 1709740800000,
    likes: 29
  },

  // Daytona Starsky - Speed Chaser (track_id: 7)
  {
    id: '28',
    trackId: '7',
    author: 'ElectronicDreams',
    content: 'This track is pure energy! Perfect blend of retro and future sounds 🚗💨',
    timestamp: 1709913600000,
    likes: 44
  },
  {
    id: '29',
    trackId: '7',
    author: 'SynthMaster',
    content: 'Those arpeggios in the breakdown are absolutely mind-blowing! 🎹✨',
    timestamp: 1709827200000,
    likes: 37
  },
  {
    id: '30',
    trackId: '7',
    author: 'BeatCrafter',
    content: 'The percussion work on this is next level. Every hit hits just right! 🥁',
    timestamp: 1709740800000,
    likes: 32
  }
];