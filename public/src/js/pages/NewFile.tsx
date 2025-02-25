import React from 'react';
import Dropzone, { DroppedFiles } from '../components/Dropzone';
import { useAppStore } from '../stores/AppStore';

export default function NewFile() {

    const appStore = useAppStore();

    function handleDrop(dropped: DroppedFiles): void {
        const file = dropped.files[0].path;
        appStore.setCurrentFile(file);
    }

    return (
        <div>
            <Dropzone onDrop={handleDrop} />
        </div>
    );
}
