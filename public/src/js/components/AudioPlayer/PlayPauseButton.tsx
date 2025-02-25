import React from 'react';
import { Button } from "@fluentui/react-components";
import { useAudioPlayerStore } from "./AudioPlayerStore";

export function PlayPauseButton() {

  const audioPlayerStore = useAudioPlayerStore();

  function onClick() {
    console.log("Setting play state:", !audioPlayerStore.isPlaying);
    audioPlayerStore.setPlaying(!audioPlayerStore.isPlaying)
  }

  return (
    <Button onClick={onClick}>
      {audioPlayerStore.isPlaying ? "Pause" : "Play"}
    </Button>
  )

}
