import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Header from './Header';
import NewFile from './pages/NewFile';
import FileOverview from './pages/FileOverview';
import Processing from './pages/Processing';
import ProcessedAudio from './pages/ProcessedAudio';
import { useAppStore } from './stores/AppStore';
import { hot } from 'react-hot-loader/root';
import { useAudioPlayerStore } from './components/AudioPlayer/AudioPlayerStore';
import { Toaster } from 'react-hot-toast';
import { Timeline } from '@material-tailwind/react';

require('./global');

type AppState = "new" | "loaded" | "processing" | "processed";

function Main() {

    const appStore = useAppStore();

    let appState: AppState = "new";
    if (appStore.isProcessed) {
        appState = "processed";
    } else if (appStore.isProcessing) {
        appState = "processing";
    } else if (appStore.currentFile) {
        appState = "loaded";
    }

    return (
        <div className="p-8 pt-16 h-screen">
            {appState === "new" && (
                <NewFile />
            )}

            {appState === "loaded" && (
                <FileOverview />
            )}

            {appState === "processing" && (
                <Processing />
            )}

            {appState === "processed" && (
                <ProcessedAudio />
            )}
        </div>
    );
}

function App() {

    const audioPlayerStore = useAudioPlayerStore();

    window.api.handleSetMetadata((metadata) => {
        audioPlayerStore.setMetadata(metadata);
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-gray-100 text-gray-700">
                <Header />
                <Main />
                <Toaster position="bottom-right" />
            </div>
        </DndProvider>
    );
};

export default hot(App);
