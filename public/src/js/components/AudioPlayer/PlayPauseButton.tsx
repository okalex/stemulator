import React from 'react';
import { Button } from "@fluentui/react-components";
import { useAudioPlayerStore } from "./AudioPlayerStore";
import { PauseFilled, PlayFilled } from '@fluentui/react-icons';

type Props = {
  className?: any,
}

export function PlayPauseButton({ className }: Props) {

  const audioPlayerStore = useAudioPlayerStore();

  function onClick() {
    console.log("Setting play state:", !audioPlayerStore.isPlaying);
    audioPlayerStore.setPlaying(!audioPlayerStore.isPlaying)
  }

  const icon = audioPlayerStore.isPlaying ? <PauseFilled /> : <PlayFilled />;

  return (
    <Button onClick={onClick} appearance="primary" shape="circular" size="large" icon={icon} className={className} />
  );

}
