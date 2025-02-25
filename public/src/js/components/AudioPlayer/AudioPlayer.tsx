import React from 'react';
import WaveForm from './WaveForm';
import { useAudioPlayerStore } from './AudioPlayerStore';
import { PlayPauseButton } from './PlayPauseButton';

type Props = {
    url: string,
    height: any,
    options?: any
}

export default function AudioPlayer({ url, height, options }: Props) {

    const audioPlayerStore = useAudioPlayerStore();

    const _options = {
        ...options,
        height: height,
    }

    return (
        <div>
            <PlayPauseButton />
            <div>
                <WaveForm idx={0} url={url} isPlaying={audioPlayerStore.isPlaying} options={_options} />
            </div>
        </div>
    );
}
