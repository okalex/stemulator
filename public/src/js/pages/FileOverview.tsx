import React from 'react';
import { AudioPlayer } from '../components/AudioPlayer';
import { useAppStore } from '../stores/AppStore';
import { Model } from '../components/ModelSelector/Model';
import { getFileNameFromPath } from '../utils/files';
import { Button, Typography } from '@material-tailwind/react';

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
        <div>
            <div>
                <Typography type="h2">{getFileNameFromPath(appStore.currentFile)}</Typography>
                <AudioPlayer height={80} url={appStore.currentFile} />
            </div>

            <Button variant="solid" onClick={handleProcess}>Process</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        </div>
    );

};
