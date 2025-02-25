import React from 'react';
import { ProgressBar, Text } from '@fluentui/react-components';
import { useAppStore } from '../stores/AppStore';
import { OutputObject } from '../App';

export default function Processing() {

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

    window.api.handleOutput(handleOutput);
    window.api.handleError(handleError);
    window.api.handleComplete(handleComplete);

    return (
        <div>
            <div>
                <ProgressBar value={appStore.progress / 100} />
            </div>

            <div>
                <Text>Processing audio… {appStore.progress}%</Text>
            </div>
        </div>
    );
}
