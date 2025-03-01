import React from 'react';
import { AudioPlayer } from '../components/AudioPlayer';
import { useAppStore } from '../stores/AppStore';
import { Model } from '../components/ModelSelector/Model';
import { getFileNameFromPath } from '../utils/files';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import PageTitle from '../components/Base/PageTitle';

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

            <Card className="mt-8 mb-8">
                <CardBody>
                    <AudioPlayer height={80} url={appStore.currentFile} />
                </CardBody>
            </Card>

            <Button variant="solid" onClick={handleProcess}>Process</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        </div>
    );

};
