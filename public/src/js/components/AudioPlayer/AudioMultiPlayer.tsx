import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import { amber, cyan, deepPurple, green, indigo, orange, pink, teal } from '@mui/material/colors';
import WaveForm from './WaveForm';

type Props = {
    urls: string[],
    selectedTrack: number,
    height: any,
    options?: object,
}

export default function AudioMultiPlayer({ urls, selectedTrack, height, options }: Props) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const log = (...msgs) => {
        console.log("AudioMultiPlayer", ...msgs);
    }

    function onPlayClick() {
        log("Setting play state:", !isPlaying);
        setIsPlaying(!isPlaying);
    }

    function updateCurrentTime(idx: number, time: number) {
        setCurrentTime(time);
    }

    const playIconStyle = {
        color: teal[500],
        fontSize: height,
    };
    const icon = isPlaying ?
        <PauseCircleOutlineRoundedIcon onClick={onPlayClick} sx={playIconStyle} /> :
        <PlayCircleOutlineRoundedIcon onClick={onPlayClick} sx={playIconStyle} />;

    function renderWaveforms() {
        return urls.map((url, idx) => {
            const isActive = idx === selectedTrack;
            const _isPlaying = isActive && isPlaying;
            const _options = { ...options, height: height };
            return (
                <WaveForm
                    key={idx}
                    idx={idx}
                    url={url}
                    isPlaying={_isPlaying}
                    isActive={isActive}
                    currentTime={currentTime}
                    setCurrentTime={updateCurrentTime}
                    options={_options}
                />
            );
        });
    }

    return (
        <Grid container>
            <Grid item xs={2}>{icon}</Grid>
            <Grid item xs={9}>
                {renderWaveforms()}
            </Grid>
        </Grid>
    );
}
