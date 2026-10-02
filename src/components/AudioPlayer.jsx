import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch (error) {
      console.error("Audio playback failed:", error);
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div className="flex items-center gap-4 rounded-full border border-amber-300/20 bg-black/30 px-3 py-2 backdrop-blur-xl">
      <audio
        ref={audioRef}
        src="/audio/yada-yada.mp3"
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "ऑडियो रोकें" : "श्लोक सुनें"}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-400 text-black transition hover:scale-105 hover:bg-amber-300"
      >
        {playing ? (
          <Pause size={19} fill="currentColor" />
        ) : (
          <Play size={19} fill="currentColor" />
        )}
      </button>

      <div className="hidden sm:block">
        <p className="text-xs text-amber-200">भगवद्गीता • अध्याय 4 • श्लोक 7</p>

        <p className="text-sm text-white/80">यदा यदा हि धर्मस्य...</p>
      </div>

      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "आवाज़ चालू करें" : "आवाज़ बंद करें"}
        className="shrink-0 text-white/70 transition hover:text-amber-300"
      >
        {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
      </button>
    </div>
  );
}
