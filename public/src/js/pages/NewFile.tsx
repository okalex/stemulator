import React from 'react';
import Dropzone, { DroppedFiles } from '../components/Dropzone';

type Props = {
    onDrop: (files: DroppedFiles) => void;
};

export default function NewFile({ onDrop }: Props) {

    return (
        <div>
            <Dropzone onDrop={onDrop} />
        </div>
    );
}
