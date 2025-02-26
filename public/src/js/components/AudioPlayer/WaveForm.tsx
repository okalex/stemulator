import React, { useEffect, useState, useCallback, useRef } from 'react';

import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';
import { useAudioPlayerStore } from './AudioPlayerStore';

type Props = {
    className?: any,
    idx: number,
    url: string,
    isPlaying: boolean,
    isActive?: boolean,
    options?: object,
}

export default function WaveForm({ className, idx, url, isPlaying, isActive, options }: Props) {

    const audioPlayerStore = useAudioPlayerStore();

    function log(...msgs) {
        console.log(`WaveForm[${idx}]`, ...msgs);
    }

    const ref = useRef();
    const [wavesurfer, setWavesurfer] = useState(null);

    const defaultOptions: object = {
        waveColor: '#000',
        progressColor: '#000',
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
                if (audioPlayerStore.currentTime) {
                    log(`Setting time to ${audioPlayerStore.currentTime} and playing...`);
                    wavesurfer.setTime(audioPlayerStore.currentTime);
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
        if (wavesurfer && isActive && audioPlayerStore.setCurrentTime) {
            timeSubscription = wavesurfer.on('timeupdate', (time: number) => {
                if (isActive) {
                    audioPlayerStore.setCurrentTime(time);
                }
            });
        } else if (timeSubscription) {
            wavesurfer.un(timeSubscription);
            timeSubscription = null;
        }
    }, [wavesurfer, isActive]);

    return (
        <div className={className} ref={ref} />
    );

}
