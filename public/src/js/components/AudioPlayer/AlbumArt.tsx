import React from "react";
import { useAudioPlayerStore } from "./AudioPlayerStore";

type Props = {
  className?: string;
};

export default function AlbumArt({ className }: Props) {

  const audioPlayerStore = useAudioPlayerStore();
  const { albumArtUrl } = audioPlayerStore.metadata;

  return (
    <div className={className}>
      {albumArtUrl && (<img src={audioPlayerStore.metadata.albumArtUrl} className="rounded-md shadow-md" />)}
    </div>
  );
}
