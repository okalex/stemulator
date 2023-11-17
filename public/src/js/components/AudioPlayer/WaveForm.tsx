import { Box } from '@mui/material';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { teal } from '@mui/material/colors';

import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';

type Props = {
    idx: number,
    url: string,
    isPlaying: boolean,
    isActive?: boolean,
    currentTime?: number,
    setCurrentTime?: (idx: number, time: number) => void,
    options?: object,
}

export default function WaveForm({ idx, url, isPlaying, isActive, currentTime, setCurrentTime, options }: Props) {

    function log(...msgs) {
        console.log(`WaveForm[${idx}]`, ...msgs);
    }

    const ref = useRef();
    const [wavesurfer, setWavesurfer] = useState(null);


    const defaultOptions: object = {
        waveColor: teal[300],
        progressColor: teal[800],
        url: url,
    };

    // Create wavesurfer
    useEffect(() => {
        log("Setting up wavesurfer...");
        if (ref.current) {

            const wavesurferOptions: WaveSurferOptions = {
                ...defaultOptions,
                ...options,
                container: ref.current,
            };
            log("Creating wavesurfer...", wavesurferOptions);
            const ws = WaveSurfer.create(wavesurferOptions);
            setWavesurfer(ws)

            return () => {
                ws.destroy()
            }
        }
    }, []);

    // Initialize wavesurfer
    useEffect(() => {
        if (wavesurfer) {
            log("Initializing wavesurfer...");
            const wsSubscriptions = [
                // wavesurfer.on('play', () => setIsPlaying(true)),
                // wavesurfer.on('pause', () => setIsPlaying(false)),
            ];

            return () => {
                wsSubscriptions.forEach((sub) => wavesurfer.un(sub));
            };
        }
    }, [wavesurfer]);

    // Toggle play pause
    function playPause() {
        if (wavesurfer) {
            if (isPlaying === true) {
                if (currentTime) {
                    log(`Setting time to ${currentTime} and playing...`);
                    wavesurfer.setTime(currentTime);
                }
                wavesurfer.play();
            } else {
                wavesurfer.pause();
            }
        }
    }
    useEffect(playPause, [isPlaying]);

    let timeSubscription;
    useEffect(() => {
        if (wavesurfer && isActive && setCurrentTime) {
            timeSubscription = wavesurfer.on('timeupdate', (time: number) => {
                if (isActive) {
                    setCurrentTime(idx, time);
                }
            });
        } else if (timeSubscription) {
            wavesurfer.un(timeSubscription);
            timeSubscription = null;
        }
    }, [wavesurfer, isActive]);

    const visibility = isActive === false ? { display: 'none' } : {}; // Defaults to visible
    const style = {
        ...visibility,
    }

    return (
        <Box ref={ref} sx={style} />
    );

}
