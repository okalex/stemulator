import React from 'react';
import { useAudioPlayerStore } from "./AudioPlayerStore";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { Button } from '@material-tailwind/react';

type Props = {
  className?: any,
}

export function PlayPauseButton({ className }: Props) {

  const audioPlayerStore = useAudioPlayerStore();

  function onClick() {
    console.log("Setting play state:", !audioPlayerStore.isPlaying);
    audioPlayerStore.setPlaying(!audioPlayerStore.isPlaying)
  }

  const icon = audioPlayerStore.isPlaying ? <FaCirclePause size="4em" /> : <FaCirclePlay size="4em" />;

  return (
    <Button variant="ghost" onClick={onClick} size="xl">{icon}</Button>
  );

}
