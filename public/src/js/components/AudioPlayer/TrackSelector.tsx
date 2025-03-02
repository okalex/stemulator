import React from "react";
import { useAppStore } from "../../stores/AppStore";
import { useAudioPlayerStore } from "./AudioPlayerStore";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { FaAsterisk, FaDrum, FaGuitar, FaMicrophone } from "react-icons/fa6";
import { GiGuitarBassHead } from "react-icons/gi";
import { MdPiano } from "react-icons/md";

export function TrackSelector() {

  const appStore = useAppStore();
  const audioPlayerStore = useAudioPlayerStore();

  const trackNames = {
    orig: "Original",
    vocals: "Vocals",
    bass: "Bass",
    drums: "Drums",
    other: "Instruments",
  }

  const trackIcons = {
    orig: <FaAsterisk className="mr-1 text-lg" />,
    vocals: <FaMicrophone className="mr-1 text-md" />,
    bass: <GiGuitarBassHead className="mr-1 text-lg" />,
    drums: <FaDrum className="mr-1 text-lg" />,
    other: <MdPiano className="mr-1 text-xl" />,
  }

  function changeSelection(idx) {
    return (event) => {
      event.preventDefault();
      if (idx !== audioPlayerStore.selectedTrack) {
        console.log("Changing selection to", idx);
        audioPlayerStore.setSelectedTrack(idx);
      }
    };
  }

  function isSelected(idx) {
    return idx === audioPlayerStore.selectedTrack;
  }

  function button(idx: number, name: string) {
    const variant = isSelected(idx) ? "solid" : "outline";
    return (
      <Button key={idx} variant={variant} onClick={changeSelection(idx)}>
        {trackIcons[name]} {trackNames[name]}
      </Button>
    )
  }

  const buttons = [];
  ["orig", "vocals", "bass", "drums", "other"].forEach((track, idx) => {
    if (appStore.processedFiles[track]) {
      buttons.push(button(idx, track))
    }
  })

  return (
    <ButtonGroup className="shadow-md">
      {buttons}
    </ButtonGroup>
  );
}
