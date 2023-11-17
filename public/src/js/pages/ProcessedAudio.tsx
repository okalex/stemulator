import { Box, Button, ButtonGroup, Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React from 'react';
import { AudioMultiPlayer, AudioPlayer } from '../components/AudioPlayer';
import { FileObject } from '../types/FileObject';
import { DraggableBox } from '../components/DraggableBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import { indigo, teal } from '@mui/material/colors';

type Props = {
    origFile: FileObject,
    rootPath: string,
    folder: string
};

export default function ProcessedAudio({ origFile, rootPath, folder }: Props) {

    const [selectedTrack, setSelectedTrack] = React.useState(0) as [number, (track: number) => void];

    const waveHeight = 80;

    const style = {
        width: '100%',
        bgcolor: 'background.paper',
    };

    const iconStyle = {
        color: teal[500],
        fontSize: waveHeight / 2,
    };

    function getFileNameFromPath(path: string) {
        const regex = /^(.*[\\\/])([^\\\/]+)(\.[^\\\/.]+)$/;
        const match = path.match(regex);
        if (match) {
            const fileName = match[2];
            return fileName;
        }
    }

    const origFileName = getFileNameFromPath(origFile.path);

    function getStemPath(stem: string): string {
        return `${rootPath}/${folder}/${origFileName}/${stem}.wav`;
    }

    function fileInfo(name: string, path: string) {
        return {
            name: name,
            path: path,
        };
    }

    const files = [
        fileInfo("Original", origFile.path),
        fileInfo("Vocals", getStemPath("vocals")),
        fileInfo("Bass", getStemPath("bass")),
        fileInfo("Drums", getStemPath("drums")),
        fileInfo("Other", getStemPath("other")),
    ];

    const fileUrls = files.map((file) => file.path);

    function handleCopyFile(event) {
        event.preventDefault();

        const fileUrl = files[selectedTrack].path;
        console.log("Copying file...", fileUrl);
        window.api.copyToClipboard(fileUrl);
    }

    function changeSelection(idx) {
        return (event) => {
            event.preventDefault();
            if (idx !== selectedTrack) {
                console.log("Changing selection to", idx);
                setSelectedTrack(idx);
            }
        };
    }

    function selectButtons() {
        const buttons = files.map((file, idx) => {
            const variant = idx === selectedTrack ? "contained" : "outlined";
            return (
                <Button key={idx} variant={variant} onClick={changeSelection(idx)}>
                    {file.name}
                </Button>
            )
        });

        return (
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                {buttons}
            </ButtonGroup>
        );
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" align="center" component="p">
                    {origFile.name}
                </Typography>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: 8, marginTop: 2 }}>
                {selectButtons()}
            </Grid>

            <Grid item xs={9} sx={{ textAlign: 'center' }}>
                <AudioMultiPlayer urls={fileUrls} selectedTrack={selectedTrack} height={waveHeight} />
            </Grid>

            <Grid item xs={3} sx={{ marginTop: '18px' }}>
                <Button onClick={handleCopyFile} variant="outlined">
                    <ContentCopyIcon sx={iconStyle} />
                </Button>

                <DraggableBox dragData={fileUrls[selectedTrack]} sx={{ display: 'inline-block', marginLeft: 2 }}>
                    <Button variant="outlined">
                        <DragIndicatorRoundedIcon sx={iconStyle} />
                    </Button>
                </DraggableBox>
            </Grid>
        </Grid>
    );
}
