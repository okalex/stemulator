import React from "react";
import { useAppStore } from "../../stores/AppStore";
import { useAudioPlayerStore } from "./AudioPlayerStore";
import { Button, ButtonGroup } from "@material-tailwind/react";

export function TrackSelector() {

  const appStore = useAppStore();
  const audioPlayerStore = useAudioPlayerStore();

  function changeSelection(idx) {
    return (event) => {
      event.preventDefault();
      if (idx !== audioPlayerStore.selectedTrack) {
        console.log("Changing selection to", idx);
        audioPlayerStore.setSelectedTrack(idx);
      }
    };
  }

  function button(idx: number, name: string) {
    const variant = idx === audioPlayerStore.selectedTrack ? "solid" : "outline";
    return (
      <Button key={idx} variant={variant} onClick={changeSelection(idx)}>
        {name}
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
    <ButtonGroup>
      {buttons}
    </ButtonGroup>
  );
}
