import React from 'react';
import { AudioPlayer } from '../components/AudioPlayer';
import { Button, Text } from '@fluentui/react-components';
import { useAppStore } from '../stores/AppStore';
import { Model } from '../components/ModelSelector/Model';
import { OutputObject } from '../App';

export default function FileOverview() {

    const appStore = useAppStore();

    function handleOutput(output: OutputObject): void {
        if (output.type === "progress") {
            appStore.setProgress(output.data);
        }
    }

    function handleError(data: string): void {
    }

    function handleComplete(code: number, files: ProcessedFileObject): void {
        console.log("Processing complete", code, files);
        if (code === 0) {
            appStore.setProcessedFiles(files);
            appStore.setProcessed(true);
        }
        window.api.removeListeners();
        appStore.setProcessing(false);
    }

    function handleProcess(): void {
        console.log("handleProcess", appStore.currentFile);
        appStore.setProcessing(true);
        window.api.handleOutput(handleOutput);
        window.api.handleError(handleError);
        window.api.handleComplete(handleComplete);
        window.api.processAudio(appStore.currentFile, Model.mel_band_roformer);
    }

    function handleCancel(): void {
        appStore.setCurrentFile(null);
    }

    return (
        <div>
            <div>
                <Text>
                    {appStore.currentFile}
                </Text>
            </div>

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
