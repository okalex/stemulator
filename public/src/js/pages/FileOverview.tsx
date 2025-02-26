import React from 'react';
import { AudioPlayer } from '../components/AudioPlayer';
import { Button, Card, CardFooter, CardHeader, CardPreview, Title2 } from '@fluentui/react-components';
import { useAppStore } from '../stores/AppStore';
import { Model } from '../components/ModelSelector/Model';
import { useAppStyles } from '../styles/appStyles';
import { getFileNameFromPath } from '../utils/files';

export default function FileOverview() {

    const appStore = useAppStore();
    const styles = useAppStyles();

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
            <Card className={styles.card}>
                <Title2>{getFileNameFromPath(appStore.currentFile)}</Title2>
                <AudioPlayer height={80} url={appStore.currentFile} />
            </Card>

            <Button onClick={handleProcess} appearance="primary">Process</Button>
            <Button onClick={handleCancel} appearance="secondary">Cancel</Button>
        </div>
    );

};
