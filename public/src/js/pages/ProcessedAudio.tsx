import React from 'react';
import { AudioMultiPlayer } from '../components/AudioPlayer';
import { DraggableBox } from '../components/DraggableBox';
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

        const fileUrl = fileUrls[audioPlayerStore.selectedTrack];
        console.log("Copying file...", fileUrl);
        window.api.copyToClipboard(fileUrl);
    }

    return (
        <div>
            <div>
                <TrackSelector />
            </div>

            <div>
                <AudioMultiPlayer urls={fileUrls} height={waveHeight} />
            </div>

            <div>
                <button onClick={handleCopyFile}>
                    Copy
                </button>

                <DraggableBox dragData={fileUrls[audioPlayerStore.selectedTrack]}>
                    <button>
                        Drag
                    </button>
                </DraggableBox>
            </div>
        </div>
    );
}
