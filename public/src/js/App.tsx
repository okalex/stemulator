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

require('./global');

function Main() {
    const appStore = useAppStore();

    function render(): JSX.Element {
        // return <Processing />;
        if (appStore.isProcessed) {
            return <ProcessedAudio />;
        } else if (appStore.isProcessing) {
            return <Processing />;
        } else {
            if (appStore.currentFile) {
                return <FileOverview />;
            } else {
                return <NewFile />;
            }
        }
    }

    return (
        <div className="p-4 pt-14 h-screen flex">
            {render()}
        </div>
    );
}

function App() {

    const audioPlayerStore = useAudioPlayerStore();

    function handleSetMetadata(metadata: object) {
        audioPlayerStore.setMetadata(metadata);
    }

    window.api.handleSetMetadata(handleSetMetadata);
    
    return (
        <DndProvider backend={HTML5Backend}>
            <Header />
            <Main />
        </DndProvider>
    );
};

export default hot(App);
