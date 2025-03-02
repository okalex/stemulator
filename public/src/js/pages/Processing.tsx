import React from 'react';
import { useAppStore } from '../stores/AppStore';
import { Card, CardBody, Progress, Typography } from '@material-tailwind/react';
import { getFileNameFromPath } from '../utils/files';
import PageTitle from '../components/Base/PageTitle';
import toast from 'react-hot-toast';
import AudioMetadata from '../components/AudioPlayer/AudioMetadata';
import { Column } from '../components/Base/Grid';

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
        appStore.setProcessing(false);
        window.api.removeListeners();

        if (code === 0) {
            appStore.setProcessedFiles(files);
            appStore.setProcessed(true);
            toast.success("Processing complete");
        } else {
            toast.error("Processing failed");
        }
    }

    window.api.removeListeners();
    window.api.handleOutput(handleOutput);
    window.api.handleError(handleError);
    window.api.handleComplete(handleComplete);

    return (
        <div className="w-full">
            <Card className="mt-8 mb-8 p-2 shadow-lg">
                <CardBody>
                    <Column className="gap-4 pb-4">
                        <AudioMetadata className="w-full text-lg" />

                        <Typography>Processing audio… {appStore.progress}%</Typography>

                        <Progress size="sm" value={appStore.progress}>
                            <Progress.Bar className="transition-all" />
                        </Progress>
                    </Column>
                </CardBody>
            </Card>
        </div>
    );
}
