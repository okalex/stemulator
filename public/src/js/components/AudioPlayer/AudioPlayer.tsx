import React from 'react';
import WaveForm from './WaveForm';
import { useAudioPlayerStore } from './AudioPlayerStore';
import { PlayPauseButton } from './PlayPauseButton';
import { Row } from '../Base/Grid';

type Props = {
    className?: string,
    url?: string,
    urls?: string[],
    children?: any,
    height: any,
    options?: any
}

export function AudioPlayerControls() {
    return (
        <PlayPauseButton size="3em" className="text-primary" />
    );
}

export function AudioPlayer({ className, url, urls, children, height, options }: Props) {

    const audioPlayerStore = useAudioPlayerStore();

    const _options = {
        ...options,
        height: height,
    }

    function renderWaveforms() {
        if (url) {
            return (
                <WaveForm idx={0} url={url} isPlaying={audioPlayerStore.isPlaying} options={_options} />
            );
        } else if (urls) {
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
        } else {
            return null;
        }
    }

    return (
        <Row className={`items-center ${className}`}>
            <div className="grow">
                {renderWaveforms()}
            </div>
            {children ?? null}
        </Row>
    );
}
