import React from 'react';
import WaveForm from './WaveForm';
import { useAudioPlayerStore } from './AudioPlayerStore';
import { PlayPauseButton } from './PlayPauseButton';
import { useAppStyles } from '../../styles/appStyles';

type Props = {
    url: string,
    height: any,
    options?: any
}

export default function AudioPlayer({ url, height, options }: Props) {

    const audioPlayerStore = useAudioPlayerStore();
    const styles = useAppStyles();

    const _options = {
        ...options,
        height: height,
    }

    return (
        <div>
            <PlayPauseButton />
            <WaveForm idx={0} url={url} isPlaying={audioPlayerStore.isPlaying} options={_options} />
        </div>
    );
}
