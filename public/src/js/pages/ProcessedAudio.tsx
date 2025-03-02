import React from 'react';
import { DraggableBox } from '../components/DraggableBox';
import { useAppStore } from '../stores/AppStore';
import { useAudioPlayerStore } from '../components/AudioPlayer/AudioPlayerStore';
import { TrackSelector } from '../components/AudioPlayer/TrackSelector';
import { Column, Row } from '../components/Base/Grid';
import { Card, CardBody } from '@material-tailwind/react';
import { FaCopy } from 'react-icons/fa6';
import AudioMetadata from '../components/AudioPlayer/AudioMetadata';
import { AudioPlayer, AudioPlayerControls } from '../components/AudioPlayer/AudioPlayer';
import AlbumArt from '../components/AudioPlayer/AlbumArt';

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
        <div className="w-full">
            <Column>
                <div className="m-auto mb-2">
                    <TrackSelector />
                </div>

                <Card className="mt-4 mb-8 p-2 shadow-lg">
                    <CardBody>
                        <Row className="gap-4">
                            <Column className="grow">
                                <div className="mt-0 mb-4">
                                    <AudioMetadata className="w-full" />
                                </div>

                                <Row className="items-center gap-4">
                                    <AudioPlayerControls />
                                    <AudioPlayer height={80} className="grow" urls={fileUrls} />
                                </Row>
                            </Column>

                            <DraggableBox dragData={fileUrls[audioPlayerStore.selectedTrack]} dragIcon={audioPlayerStore.metadata?.albumArtUrl} className="relative">
                                <AlbumArt className="w-36 h-36" />
                                <FaCopy onClick={handleCopyFile} className="cursor-copy text-primary absolute top-0 right-0 bg-gray-100 pl-2 pb-2 pt-1 pr-1 h-8 w-8 rounded-tr-md rounded-bl-md opacity-80 border-l border-b border-gray-400" />
                            </DraggableBox>
                        </Row>
                    </CardBody>
                </Card>
            </Column>
        </div>
    );
}
