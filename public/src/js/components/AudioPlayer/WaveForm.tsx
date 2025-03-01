import React, { useEffect, useState, useCallback, useRef } from 'react';

import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';
import { useAudioPlayerStore } from './AudioPlayerStore';
import colors from 'tailwindcss/colors'
import moment from 'moment';

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

    isActive = isActive === undefined ? true : isActive;

    function log(...msgs) {
        console.log(`WaveForm[${idx}]`, ...msgs);
    }

    const ref = useRef();
    const [wavesurfer, setWavesurfer] = useState(null);
    const [duration, setDuration] = useState(0);

    const defaultOptions: object = {
        waveColor: '#ff4e00',
        progressColor: '#dd5e98',
        cursorColor: '#ddd5e9',
        normalize: false,
        cursorWidth: 2,
        barWidth: 2,
        barRadius: 10,
    };

    // Create wavesurfer
    useEffect(() => {
        log("Setting up wavesurfer...");
        if (ref.current) {

            const wavesurferOptions: WaveSurferOptions = {
                ...defaultOptions,
                ...options,
                url: url && url.startsWith('/') ? `file://${url}` : url,
                container: ref.current,
            };
            log("Creating wavesurfer...", wavesurferOptions);
            const ws = WaveSurfer.create(wavesurferOptions);
            setWavesurfer(ws);

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
                wavesurfer.on('ready', () => {
                    log("Waveform ready...");
                    setDuration(wavesurfer.getDuration());
                }),
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
        if (wavesurfer && isActive) {
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

    const theDuration = moment(duration * 1000).format("m:ss");
    const theCurrentTime = moment(audioPlayerStore.currentTime * 1000).format("m:ss");

    return (
        <div className={`relative ${className}`}>
            <div className={isActive === false && 'hidden'} ref={ref} />
            {isActive && (<span className="text-xs text-gray-500 absolute left-0">{theCurrentTime}</span>)}
            {isActive && (<span className="text-xs text-gray-500 absolute right-0">{theDuration}</span>)}
        </div>
    );

}
