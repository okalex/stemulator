import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Header from './Header';
import NewFile from './pages/NewFile';
import FileOverview from './pages/FileOverview';
import Processing from './pages/Processing';
import ProcessedAudio from './pages/ProcessedAudio';

import { FileObject } from './types/FileObject';
import { DroppedFiles } from './components/Dropzone';
import { Model } from './components/ModelSelector/Model';

require('./global');

export type OutputObject = {
    type: string,
    data: any
};

function Main() {

    const [currentFile, setCurrentFile] = useState(null) as [FileObject, (file: FileObject) => void];
    const [isProcessing, setProcessing] = useState(false) as [boolean, (processing: boolean) => void];
    const [isProcessed, setProcessed] = useState(false) as [boolean, (processed: boolean) => void];
    const [progress, setProgress] = useState(0) as [number, (progress: number) => void];
    const [model, setModel] = useState(Model.htdemucs) as [Model, (model: Model) => void];
    const [rootPath, setRootPath] = useState(null) as [string, (rootPath: string) => void];

    useEffect(() => {
        console.log("Getting root path...");
        window.api.getRootPath().then((path) => {
            console.log("Root path:", path);
            setRootPath(path);
        });
    }, []);

    function handleDrop(dropped: DroppedFiles): void {
        const file = dropped.files[0] as FileObject;
        setCurrentFile(file);
        // setProcessed(true);
    }

    function handleOutput(output: OutputObject): void {
        if (output.type === "progress") {
            setProgress(output.data);
        }
    }

    function handleError(data: string): void {
    }

    function handleComplete(code: number): void {
        if (code === 0) {
            setProcessed(true);
        }
        window.api.removeListeners();
        setProcessing(false);
    }

    function handleProcess(): void {
        console.log("handleProcess", currentFile);
        setProcessing(true);
        window.api.handleOutput(handleOutput);
        window.api.handleError(handleError);
        window.api.handleComplete(handleComplete);
        window.api.processAudio(currentFile.path, model);
    }

    function handleCancel(): void {
        setCurrentFile(null);
    }

    const style = {
        p: 2
    };

    function render(): JSX.Element {
        if (isProcessed) {
            return <ProcessedAudio origFile={currentFile} rootPath={rootPath} folder="separated/htdemucs/" />;
        } else if (isProcessing) {
            return <Processing file={currentFile} progress={progress} />;
        } else {
            if (currentFile) {
                return <FileOverview file={currentFile} onProcess={handleProcess} onCancel={handleCancel} model={model} setModel={setModel} />;
            } else {
                return <NewFile onDrop={handleDrop} />;
            }
        }
    }

    return (
        <Box sx={style}>
            {render()}
        </Box>
    );
}

export default function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Header />
            <Main />
        </DndProvider>
    );
};
