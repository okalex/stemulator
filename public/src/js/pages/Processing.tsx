import React, { useState } from 'react';
import { useAppStore } from '../stores/AppStore';
import { Card, CardBody, Progress, Typography } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import AudioMetadata from '../components/AudioPlayer/AudioMetadata';
import { Column } from '../components/Base/Grid';
import Terminal from '../components/Base/Terminal';

export default function Processing() {

    const appStore = useAppStore();

    const [output, setOutput] = useState<string>("");

    function handleOutput(data: any): void {
        if (data.type === "progress") {
            appStore.setProgress(data.data);
        } else if (data.type === "output") {
            setOutput(output + "\n" + data.data);
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

                        <div>
                            <Typography className="text-sm font-bold" >Output:</Typography>
                            <Terminal>
                                {output}
                            </Terminal>
                        </div>
                    </Column>
                </CardBody>
            </Card>
        </div>
    );
}
