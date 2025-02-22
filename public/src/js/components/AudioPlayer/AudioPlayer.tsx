import React, { useState } from 'react';
import WaveForm from './WaveForm';
import { Button } from '@fluentui/react-components';

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
        color: '#000',
        fontSize: height,
    };
    const icon = isPlaying ?
        <Button onClick={onPlayClick}>Pause</Button> :
        <Button onClick={onPlayClick}>Play</Button>;

    const _options = {
        ...options,
        height: height,
    }

    return (
        <div>
            <div>{icon}</div>
            <div>
                <WaveForm idx={0} url={url} isPlaying={isPlaying} options={_options} />
            </div>
        </div>
    );
}
