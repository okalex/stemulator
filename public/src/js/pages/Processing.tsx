import React from 'react';
import { useAppStore } from '../stores/AppStore';

export default function Processing() {

    const appStore = useAppStore();

    function handleOutput(output: any): void {
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
                {/* <Progress value={appStore.progress} /> */}
            </div>

            <div>
                Processing audio… {appStore.progress}%
            </div>
        </div>
    );
}
