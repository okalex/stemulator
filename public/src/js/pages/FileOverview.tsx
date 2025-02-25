import React from 'react';
import { AudioPlayer } from '../components/AudioPlayer';
import { Button } from '@fluentui/react-components';
import { useAppStore } from '../stores/AppStore';
import { Model } from '../components/ModelSelector/Model';

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
                <AudioPlayer height={80} url={appStore.currentFile} />
            </div>

            <div>
                <Button onClick={handleProcess}>Process</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    );

};
