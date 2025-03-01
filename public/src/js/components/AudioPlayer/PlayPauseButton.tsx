import React from 'react';
import { useAudioPlayerStore } from "./AudioPlayerStore";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { Button } from '@material-tailwind/react';
import IconButton from '../Base/IconButton';

type Props = {
  className?: any,
  size: string
}

export function PlayPauseButton({ className, size }: Props) {

  const audioPlayerStore = useAudioPlayerStore();

  function onClick() {
    console.log("Setting play state:", !audioPlayerStore.isPlaying);
    audioPlayerStore.setPlaying(!audioPlayerStore.isPlaying)
  }

  const icon = audioPlayerStore.isPlaying ? <FaCirclePause size={size} /> : <FaCirclePlay size={size} />;

  const hoverColor = audioPlayerStore.isPlaying ? "hover:text-red-700" : "hover:text-green-700";

  return (
    <IconButton onClick={onClick} className={`${hoverColor} transition-colors duration-300 ${className}`}>
      {icon}
    </IconButton>
  );

}
