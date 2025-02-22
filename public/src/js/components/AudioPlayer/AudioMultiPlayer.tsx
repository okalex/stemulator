import React, { useState } from 'react';
import WaveForm from './WaveForm';
import { Button } from '@fluentui/react-components';

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
        color: '#000',
        fontSize: height,
    };
    const icon = isPlaying ?
        <Button onClick={onPlayClick}>Pause</Button> :
        <Button onClick={onPlayClick}>Play</Button>;

    function renderWaveforms() {
        return urls.map((url, idx) => {
            if (url !== null) {
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
            }
        });
    }

    return (
        <div>
            <div>{icon}</div>
            <div>
                {renderWaveforms()}
            </div>
        </div>
    );
}
