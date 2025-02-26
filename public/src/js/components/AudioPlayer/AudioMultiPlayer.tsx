import React from 'react';
import WaveForm from './WaveForm';
import { useAudioPlayerStore } from './AudioPlayerStore';
import { PlayPauseButton } from './PlayPauseButton';
import { useAppStyles } from '../../styles/appStyles';

type Props = {
    urls: string[],
    height: any,
    options?: object,
}

export default function AudioMultiPlayer({ urls, height, options }: Props) {

    const audioPlayerStore = useAudioPlayerStore();
    const styles = useAppStyles();

    function renderWaveforms() {
        return urls.map((url, idx) => {
            if (url !== null) {
                const isActive = idx === audioPlayerStore.selectedTrack;
                const _isPlaying = isActive && audioPlayerStore.isPlaying;
                const _options = { ...options, height: height };
                return (
                    <WaveForm
                        key={idx}
                        idx={idx}
                        url={url}
                        isPlaying={_isPlaying}
                        isActive={isActive}
                        options={_options}
                    />
                );
            }
        });
    }

    return (
        <div>
            <PlayPauseButton />
            <div>
                {renderWaveforms()}
            </div>
        </div>
    );
}
