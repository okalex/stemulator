import React from 'react';
import WaveForm from './WaveForm';
import { useAudioPlayerStore } from './AudioPlayerStore';
import { PlayPauseButton } from './PlayPauseButton';
import { Row } from '../Base/Grid';

type Props = {
    className?: string,
    url: string,
    height: any,
    options?: any
}

export default function AudioPlayer({ className, url, height, options }: Props) {

    const audioPlayerStore = useAudioPlayerStore();

    const _options = {
        ...options,
        height: height,
    }

    return (
        <Row className={`items-center ${className}`}>
            <PlayPauseButton size="3em" className="text-primary mr-4" />
            <WaveForm idx={0} url={url} isPlaying={audioPlayerStore.isPlaying} options={_options} className="grow" />
        </ Row>
    );
}
