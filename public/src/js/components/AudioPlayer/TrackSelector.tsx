import React from "react";
import { Button } from "@fluentui/react-components";
import { useAppStore } from "../../stores/AppStore";
import { useAudioPlayerStore } from "./AudioPlayerStore";

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
    const variant = idx === audioPlayerStore.selectedTrack ? "contained" : "outlined";
    return (
      <Button key={idx} onClick={changeSelection(idx)}>
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
    <div>
      {buttons}
    </div>
  );
}
