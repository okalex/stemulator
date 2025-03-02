import React from 'react';
import { useAppStore } from './stores/AppStore';
import { Typography } from '@material-tailwind/react';
import { useAudioPlayerStore } from './components/AudioPlayer/AudioPlayerStore';

export default function Header() {

    const appStore = useAppStore();
    const audioPlayerStore = useAudioPlayerStore();

    function restart() {
        appStore.reset();
        audioPlayerStore.reset();
    }

    return (
        <div className="fixed top-0 left-0 w-full h-10 pl-4 bg-gray-800 flex items-center text-secondary font-bold">
            <Typography onClick={restart} className="cursor-pointer text-lg">Stemulator</Typography>
        </div>
    );
};
