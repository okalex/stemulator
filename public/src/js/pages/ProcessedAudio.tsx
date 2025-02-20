import React from 'react';
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { AudioMultiPlayer, AudioPlayer } from '../components/AudioPlayer';
import { DraggableBox } from '../components/DraggableBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import { indigo, teal } from '@mui/material/colors';

type Props = {
    fileName: string,
    filePaths: ProcessedFileObject,
};

export default function ProcessedAudio({ fileName, filePaths }: Props) {

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

    const fileUrls = [
        filePaths.orig,
        filePaths.vocals,
        filePaths.bass,
        filePaths.drums,
        filePaths.other,
    ];

    function handleCopyFile(event) {
        event.preventDefault();

        const fileUrl = filePaths[selectedTrack].path;
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

    function button(idx: number, name: string) {
        const variant = idx === selectedTrack ? "contained" : "outlined";
        return (
            <Button key={idx} variant={variant} onClick={changeSelection(idx)}>
                {name}
            </Button>
        )
    }

    function selectButtons() {
        const buttons = [];
        ["orig", "vocals", "bass", "drums", "other"].forEach((track, idx) => {
            if (filePaths[track]) {
                buttons.push(button(idx, track))
            }
        })

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
                    {fileName}
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
