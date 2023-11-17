import React from 'react';
import { Box } from '@mui/material';
import Dropzone, { DroppedFiles } from '../components/Dropzone';

type Props = {
    onDrop: (files: DroppedFiles) => void;
};

export default function NewFile({ onDrop }: Props) {

    const style = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '400px',
        height: '300px',
    };

    return (
        <Box sx={style}>
            <Dropzone onDrop={onDrop} sx={style} />
        </Box>
    );
}
