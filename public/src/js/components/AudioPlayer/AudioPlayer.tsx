import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import { amber, cyan, deepPurple, green, indigo, orange, pink, teal } from '@mui/material/colors';
import WaveForm from './WaveForm';

type Props = {
    url: string,
    height: any,
    options?: any
}

export default function AudioPlayer({ url, height, options }: Props) {

    const [isPlaying, setIsPlaying] = useState(false);

    function log(...msgs) {
        console.log("AudioPlayer", ...msgs);
    }

    function onPlayClick() {
        log("Setting play state:", !isPlaying);
        setIsPlaying(!isPlaying);
    }

    const iconStyle = {
        color: teal[500],
        fontSize: height,
    };
    const icon = isPlaying ?
        <PauseCircleOutlineRoundedIcon onClick={onPlayClick} sx={iconStyle} /> :
        <PlayCircleOutlineRoundedIcon onClick={onPlayClick} sx={iconStyle} />;

    const _options = {
        ...options,
        height: height,
    }

    return (
        <Grid container>
            <Grid item xs={2}>{icon}</Grid>
            <Grid item xs={9}>
                <WaveForm idx={0} url={url} isPlaying={isPlaying} options={_options} />
            </Grid>
        </Grid>
    );
}
