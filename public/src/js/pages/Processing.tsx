import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { FileObject } from '../types/FileObject';

type Props = {
    file: FileObject,
    progress: number
};

export default function Processing({ file, progress }: Props) {
    const style = {
        width: '100%',
        height: '100%',
        verticalAlign: 'middle',
    };

    const centerStyle = {
        textAlign: 'center'
    };

    return (
        <Grid container spacing={2} sx={style}>
            <Grid item xs={12} sx={centerStyle}>
                <Typography variant="h5" align="center" component="div">{file.name}</Typography>
            </Grid>

            <Grid item xs={12} sx={centerStyle}>
                <CircularProgress />
            </Grid>

            <Grid item xs={12} sx={centerStyle}>
                <Typography variant="h6" align="center" component="p">Processing audio… {progress}%</Typography>
            </Grid>
        </Grid>
    );
}