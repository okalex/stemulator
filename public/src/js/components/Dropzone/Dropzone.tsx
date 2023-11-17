import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { DroppedFiles } from './DroppedFiles';

type Props = {
    onDrop: (onDrop: DroppedFiles) => void,
    sx: object,
}

export default function Dropzone({ onDrop, sx }: Props) {

    const style = {
        p: 2,
        border: '3px dashed',
        borderColor: 'grey.500',
        borderRadius: 2,
        color: 'grey.500',
        fontSize: '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
    };

    const [, drop] = useDrop(
        () => ({
            accept: [NativeTypes.FILE],
            drop(item) {
                if (onDrop) {
                    onDrop(item as DroppedFiles);
                }
            }
        }),
        [onDrop]
    );

    return (
        <Box component="section" ref={drop} sx={style}>
            <Typography variant="h6" align="center" component="div">
                <Box><FileUploadRoundedIcon /></Box>
                <Box>Drop file here</Box>
            </Typography>
        </Box>
    );
}