import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { AudioPlayer } from '../components/AudioPlayer';
import { ModelSelector } from '../components/ModelSelector';
import { FileObject } from '../types/FileObject';
import { Model } from '../components/ModelSelector/Model';

type Props = {
    file: FileObject,
    onProcess: () => void,
    onCancel: () => void,
    model: Model,
    setModel: (model: Model) => void
}

export default function FileOverview({ file, onProcess, onCancel, model, setModel }: Props) {

    const buttonStyle = {
        width: '120px',
        display: 'inline-block',
        marginLeft: 1,
        marginRight: 1
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ModelSelector model={model} setModel={setModel} sx={{ width: '200px' }} />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h6" align="center" component="p">
                    {file.name}
                </Typography>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2, marginBottom: 2 }}>
                <AudioPlayer
                    height={80}
                    // waveColor="rgb(200, 0, 200)"
                    // progressColor="rgb(100, 0, 100)"
                    url={file.path}
                />
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ textAlign: 'center' }}>
                    <Button variant="contained" onClick={onProcess} sx={buttonStyle}>Process</Button>
                    <Button variant="outlined" onClick={onCancel} sx={buttonStyle}>Cancel</Button>
                </Box>
            </Grid>
        </Grid >
    );

};
