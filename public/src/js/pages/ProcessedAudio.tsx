import React from 'react';
import { AudioMultiPlayer } from '../components/AudioPlayer';
import { DraggableBox } from '../components/DraggableBox';
import { useAppStore } from '../stores/AppStore';
import { useAudioPlayerStore } from '../components/AudioPlayer/AudioPlayerStore';
import { TrackSelector } from '../components/AudioPlayer/TrackSelector';
import { Column, Row } from '../components/Base/Grid';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { getFileNameFromPath } from '../utils/files';
import { FaCopy, FaGripVertical } from 'react-icons/fa6';
import PageTitle from '../components/Base/PageTitle';
import AudioMetadata from '../components/AudioPlayer/AudioMetadata';

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
                <PageTitle>{getFileNameFromPath(appStore.currentFile)}</PageTitle>

                <div className="mt-4 mb-8 m-auto">
                    <TrackSelector />
                </div>


                <Card className="bg-gray-50">
                    <CardBody>

                        <AudioMetadata className="w-full" />

                        <Row>
                            <AudioMultiPlayer urls={fileUrls} height={waveHeight} className="grow" />

                            <Button onClick={handleCopyFile} className="h-12 ml-4 mt-auto mb-auto">
                                <FaCopy />
                            </Button>

                            <DraggableBox dragData={fileUrls[audioPlayerStore.selectedTrack]} className="h-12 ml-4 mt-auto mb-auto">
                                <Button className="h-12">
                                    <FaGripVertical />
                                </Button>
                            </DraggableBox>
                        </Row>
                    </CardBody>
                </Card>
            </Column>
        </div>
    );
}
