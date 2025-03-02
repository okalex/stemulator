import React from 'react';
import { AudioPlayer } from '../components/AudioPlayer/AudioPlayer';
import { useAppStore } from '../stores/AppStore';
import { Model } from '../components/ModelSelector/Model';
import { getFileNameFromPath } from '../utils/files';
import { Button, Card, CardBody } from '@material-tailwind/react';
import PageTitle from '../components/Base/PageTitle';
import AudioMetadata from '../components/AudioPlayer/AudioMetadata';
import { Column, Row } from '../components/Base/Grid';
import { AudioPlayerControls } from '../components/AudioPlayer/AudioPlayer';
import AlbumArt from '../components/AudioPlayer/AlbumArt';

export default function FileOverview() {

    const appStore = useAppStore();

    function handleProcess(): void {
        console.log("handleProcess", appStore.currentFile);
        appStore.setProcessing(true);
        window.api.processAudio(appStore.currentFile, Model.mel_band_roformer);
    }

    function handleCancel(): void {
        appStore.setCurrentFile(null);
    }

    return (
        <div className="w-full">
            <PageTitle>{getFileNameFromPath(appStore.currentFile)}</PageTitle>

            <Card className="mt-8 mb-8 p-2">
                <CardBody>
                    <Row className="gap-4">
                        <Column className="grow">
                            <AudioMetadata className="w-full mb-4 text-lg" />
                            <Row className="items-center gap-4">
                                <AudioPlayerControls />
                                <AudioPlayer height={80} className="grow" url={appStore.currentFile} />
                            </Row>
                        </Column>
                        <AlbumArt className="w-36 h-36" />
                    </Row>
                </CardBody>
            </Card>

            <Row className="gap-4  justify-center">
                <Button variant="solid" onClick={handleProcess}>Process</Button>
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </Row>
        </div>
    );

};
