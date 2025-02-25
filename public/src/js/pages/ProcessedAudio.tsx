import React from 'react';
import { AudioMultiPlayer } from '../components/AudioPlayer';
import { DraggableBox } from '../components/DraggableBox';
import { Button, Text } from '@fluentui/react-components';
import { useAppStore } from '../stores/AppStore';
import { useAudioPlayerStore } from '../components/AudioPlayer/AudioPlayerStore';
import { TrackSelector } from '../components/AudioPlayer/TrackSelector';

export default function ProcessedAudio() {

    const appStore = useAppStore();
    const audioPlayerStore = useAudioPlayerStore();

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

        const fileUrl = appStore.processedFiles[audioPlayerStore.selectedTrack].path;
        console.log("Copying file...", fileUrl);
        window.api.copyToClipboard(fileUrl);
    }

    return (
        <div>
            <div>
                <Text>{appStore.currentFile}</Text>
            </div>

            <div>
                <TrackSelector />
            </div>

            <div>
                <AudioMultiPlayer urls={fileUrls} height={waveHeight} />
            </div>

            <div>
                <Button onClick={handleCopyFile}>
                    Copy
                </Button>

                <DraggableBox dragData={fileUrls[audioPlayerStore.selectedTrack]}>
                    <Button>
                        Drag
                    </Button>
                </DraggableBox>
            </div>
        </div>
    );
}
