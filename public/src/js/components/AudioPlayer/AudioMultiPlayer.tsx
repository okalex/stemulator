import React from 'react';
import WaveForm from './WaveForm';
import { useAudioPlayerStore } from './AudioPlayerStore';
import { PlayPauseButton } from './PlayPauseButton';
import { Row } from '../Base/Grid';

type Props = {
    className?: string,
    urls: string[],
    height: any,
    options?: object,
    children?: any,
}

export default function AudioMultiPlayer({ className, urls, height, options, children }: Props) {

    const audioPlayerStore = useAudioPlayerStore();

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
        <Row className={`items-center pb-4 ${className}`}>
            <PlayPauseButton size="3em" className="text-primary mr-4" />
            <div className="grow">
                {renderWaveforms()}
            </div>
            {children ?? null}
        </Row>
    );
}
