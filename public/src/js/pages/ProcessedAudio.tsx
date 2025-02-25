import React from 'react';
import { AudioMultiPlayer } from '../components/AudioPlayer';
import { DraggableBox } from '../components/DraggableBox';
import { Button, Text } from '@fluentui/react-components';
import { useAppStore } from '../stores/AppStore';

export default function ProcessedAudio() {

    const appStore = useAppStore()

    const [selectedTrack, setSelectedTrack] = React.useState(0) as [number, (track: number) => void];

    const waveHeight = 80;

    const fileUrls = [
        appStore.processedFiles.orig,
        appStore.processedFiles.vocals,
        appStore.processedFiles.bass,
        appStore.processedFiles.drums,
        appStore.processedFiles.other,
    ];

    function handleCopyFile(event) {
        event.preventDefault();

        const fileUrl = appStore.processedFiles[selectedTrack].path;
        console.log("Copying file...", fileUrl);
        window.api.copyToClipboard(fileUrl);
    }

    function changeSelection(idx) {
        return (event) => {
            event.preventDefault();
            if (idx !== selectedTrack) {
                console.log("Changing selection to", idx);
                setSelectedTrack(idx);
            }
        };
    }

    function button(idx: number, name: string) {
        const variant = idx === selectedTrack ? "contained" : "outlined";
        return (
            <Button key={idx} onClick={changeSelection(idx)}>
                {name}
            </Button>
        )
    }

    function selectButtons() {
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

    return (
        <div>
            <div>
                <Text>{appStore.currentFile}</Text>
            </div>

            <div>
                {selectButtons()}
            </div>

            <div>
                <AudioMultiPlayer urls={fileUrls} selectedTrack={selectedTrack} height={waveHeight} />
            </div>

            <div>
                <Button onClick={handleCopyFile}>
                    Copy
                </Button>

                <DraggableBox dragData={fileUrls[selectedTrack]}>
                    <Button>
                        Drag
                    </Button>
                </DraggableBox>
            </div>
        </div>
    );
}
